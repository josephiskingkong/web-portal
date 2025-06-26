import mongoose from 'mongoose';
import { Course, ICourse } from '../models/course.model';
import slugify from 'slugify';

interface CourseFilterParams {
	title?: string;
	authorId?: mongoose.Types.ObjectId;
	categoryId?: mongoose.Types.ObjectId;
	level?: string;
	minPrice?: number;
	maxPrice?: number;
	startDate?: Date;
	endDate?: Date;
	isPublished?: boolean;
}

interface PaginationParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}

export class CourseService {
	static async createCourse(data: Partial<ICourse>) {
		const existingCourse = await Course.findOne({ title: data.title });
		if (existingCourse) throw new Error('Course already exists');

		const slug = slugify(data.title!, { lower: true });

		const course = new Course({ ...data, slug });
		return await course.save();
	}

	static async findCourseById(id: string) {
		return await Course.findById(id)
			.populate('categoryId', 'name')
			.populate('authorId', 'firstName lastName')
			.populate('tags', 'name');
	}

	static async findCourseBySlug(slug: string) {
		return await Course.findOne({ slug })
			.populate('categoryId', 'name')
			.populate('authorId', 'firstName lastName')
			.populate('tags', 'name');
	}

	static async findCourseByTitle(title: string) {
		return await Course.findOne({ title })
			.populate('categoryId', 'name')
			.populate('authorId', 'firstName lastName')
			.populate('tags', 'name');
	}

	static async deleteCourse(id: string) {
		return await Course.findByIdAndDelete(id);
	}

	static async updateCourse(id: string, updateData: Partial<ICourse>) {
		if (updateData.title) {
			updateData.slug = slugify(updateData.title, { lower: true });
		}

		return await Course.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
			.populate('categoryId', 'name')
			.populate('authorId', 'firstName lastName')
			.populate('tags', 'name');
	}

	static async findAllCourses() {
		return await Course.find()
			.populate('categoryId', 'name')
			.populate('authorId', 'firstName lastName');
	}

	static async findCourses(filters: CourseFilterParams = {}, pagination: PaginationParams = {}) {
		const page = pagination.page || 1;
		const limit = pagination.limit || 10;
		const skip = (page - 1) * limit;
		const sortBy = pagination.sortBy || 'createdAt';
		const sortOrder = pagination.sortOrder || 'desc';

		const sort: Record<string, 1 | -1> = {};
		sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

		const query: any = {};

		if (filters.title) {
			query.title = { $regex: filters.title, $options: 'i' };
		}

		if (filters.authorId) {
			query.authorId = filters.authorId;
		}

		if (filters.categoryId) {
			query.categoryId = filters.categoryId;
		}

		if (filters.level) {
			query.level = filters.level;
		}

		if (filters.isPublished !== undefined) {
			query.isPublished = filters.isPublished;
		}

		if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
			query.price = {};
			if (filters.minPrice !== undefined) {
				query.price.$gte = filters.minPrice;
			}
			if (filters.maxPrice !== undefined) {
				query.price.$lte = filters.maxPrice;
			}
		}

		if (filters.startDate || filters.endDate) {
			query.createdAt = {};
			if (filters.startDate) {
				query.createdAt.$gte = filters.startDate;
			}
			if (filters.endDate) {
				query.createdAt.$lte = filters.endDate;
			}
		}

		const courses = await Course.find(query)
			.sort(sort)
			.skip(skip)
			.limit(limit)
			.populate('categoryId', 'name')
			.populate('authorId', 'firstName lastName')
			.populate('tags', 'name');

		const total = await Course.countDocuments(query);
		const pages = Math.ceil(total / limit);

		return { courses, total, pages };
	}
}
