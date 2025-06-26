import { Request, Response } from 'express';
import { EnrollmentService } from '../services/enrollment.service';

export const markLessonCompleted = async (req: Request, res: Response) => {
  try {
    const { lessonId, courseId } = req.body;
    const userId = (req as any).user.id;

    const progress = await EnrollmentService.markLessonCompleted(userId, lessonId, courseId);
    res.json({ message: 'Lesson marked as completed', progress });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const unmarkLessonCompleted = async (req: Request, res: Response) => {
  try {
    const { lessonId, courseId } = req.body;
    const userId = (req as any).user.id;

    const progress = await EnrollmentService.unmarkLessonCompleted(userId, lessonId, courseId);
    res.json({ message: 'Lesson unmarked as completed', progress });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserProgress = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const userId = (req as any).user.id;

    const progress = await EnrollmentService.getUserProgress(userId, courseId);
    if (!progress) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json(progress);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};