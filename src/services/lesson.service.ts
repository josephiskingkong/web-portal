import { Lesson, ILesson } from '../models/lesson.model';

export class LessonService {
	static async createLesson(data: Partial<ILesson>) {
		const lesson = new Lesson(data);
		return await lesson.save();
	}

	static async findLessonById(id: string) {
		return await Lesson.findById(id).populate('course', 'title');
	}

	static async findLessonsByCourse(courseId: string) {
		return await Lesson.find({ course: courseId }).sort({ order: 1 });
	}

	static async updateLesson(id: string, updateData: Partial<ILesson>) {
		return await Lesson.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
	}

	static async deleteLesson(id: string) {
		return await Lesson.findByIdAndDelete(id);
	}

	static async findAllLessons() {
		return await Lesson.find().populate('course', 'title');
	}
}
