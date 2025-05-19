import { Request, Response } from 'express';
import { LessonService } from '../services/lesson.service';

export const createLesson = async (req: Request, res: Response) => {
	try {
		const lesson = await LessonService.createLesson(req.body);
		res.status(201).json({ message: 'Lesson created', lesson });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const getLessonById = async (req: Request, res: Response) => {
	try {
		const lesson = await LessonService.findLessonById(req.params.id);
		if (!lesson) {
			res.status(404).json({ error: 'Lesson not found' });
			return;
		}
		res.json(lesson);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const getLessonsByCourse = async (req: Request, res: Response) => {
	try {
		const lessons = await LessonService.findLessonsByCourse(req.params.courseId);
		res.json(lessons);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const getAllLessons = async (req: Request, res: Response) => {
	try {
		const lessons = await LessonService.findAllLessons();
		res.json(lessons);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const updateLesson = async (req: Request, res: Response) => {
	try {
		const updatedLesson = await LessonService.updateLesson(req.params.id, req.body);
		if (!updatedLesson) {
			res.status(404).json({ error: 'Lesson not found' });
			return;
		}
		res.json({ message: 'Lesson updated', lesson: updatedLesson });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const deleteLesson = async (req: Request, res: Response) => {
	try {
		const deletedLesson = await LessonService.deleteLesson(req.params.id);
		if (!deletedLesson) {
			res.status(404).json({ error: 'Lesson not found' });
			return;
		}
		res.json({ message: 'Lesson deleted', lesson: deletedLesson });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
