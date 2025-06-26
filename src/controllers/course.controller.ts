import { Request, Response } from 'express';
import { CourseService } from '../services/course.service';
import mongoose from 'mongoose';

export const createCourse = async (req: Request, res: Response) => {
	try {
		const course = await CourseService.createCourse(req.body);
		res.status(201).json({ message: 'Course created', course });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const getCourseBySlug = async (req: Request, res: Response) => {
	try {
		const course = await CourseService.findCourseBySlug(req.params.slug);
		if (!course) {
			return res.status(404).json({ error: 'Course not found' });
		}
		res.json(course);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const getCourseById = async (req: Request, res: Response) => {
	try {
		const course = await CourseService.findCourseById(req.params.id);
		if (!course) {
			return res.status(404).json({ error: 'Course not found' });
		}
		res.json(course);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const getAllCourses = async (req: Request, res: Response) => {
	try {
		const courses = await CourseService.findAllCourses();
		res.json(courses);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const getFilteredCourses = async (req: Request, res: Response) => {
	try {
		const page = req.query.page ? parseInt(req.query.page as string) : 1;
		const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
		const sortBy = (req.query.sortBy as string) || 'createdAt';
		const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';

		const filters: any = {};

		if (req.query.title) filters.title = req.query.title;
		if (req.query.level) filters.level = req.query.level;
		if (req.query.isPublished !== undefined)
			filters.isPublished = req.query.isPublished === 'true';

		if (req.query.authorId) {
			filters.authorId = new mongoose.Types.ObjectId(req.query.authorId as string);
		}

		if (req.query.categoryId) {
			filters.categoryId = new mongoose.Types.ObjectId(req.query.categoryId as string);
		}

		if (req.query.minPrice) {
			filters.minPrice = parseFloat(req.query.minPrice as string);
		}

		if (req.query.maxPrice) {
			filters.maxPrice = parseFloat(req.query.maxPrice as string);
		}

		if (req.query.startDate) {
			filters.startDate = new Date(req.query.startDate as string);
		}

		if (req.query.endDate) {
			filters.endDate = new Date(req.query.endDate as string);
		}

		const result = await CourseService.findCourses(filters, { page, limit, sortBy, sortOrder });
		res.json(result);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const updateCourse = async (req: Request, res: Response) => {
	try {
		const updatedCourse = await CourseService.updateCourse(req.params.id, req.body);
		if (!updatedCourse) {
			return res.status(404).json({ error: 'Course not found' });
		}
		res.json({ message: 'Course updated', course: updatedCourse });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const deleteCourse = async (req: Request, res: Response) => {
	try {
		const deletedCourse = await CourseService.deleteCourse(req.params.id);
		if (!deletedCourse) {
			return res.status(404).json({ error: 'Course not found' });
		}
		res.json({ message: 'Course deleted', course: deletedCourse });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
