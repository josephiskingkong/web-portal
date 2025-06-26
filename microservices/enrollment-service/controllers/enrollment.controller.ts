import { Request, Response } from 'express';
import { EnrollmentService } from '../services/enrollment.service';

export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    const userId = (req as any).user.id;

    const result = await EnrollmentService.createEnrollmentRequest(userId, courseId);
    res.json({ message: 'Enrollment request sent', requestId: result.requestId });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMyEnrollments = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const enrollments = await EnrollmentService.getEnrollmentsByUser(userId);
    res.json(enrollments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseEnrollments = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const enrollments = await EnrollmentService.getEnrollmentsByCourse(courseId);
    res.json(enrollments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseStudentCount = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const count = await EnrollmentService.getStudentCount(courseId);
    res.json({ count });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelEnrollment = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    const userId = (req as any).user.id;

    const enrollment = await EnrollmentService.cancelEnrollment(userId, courseId);
    res.json({ message: 'Enrollment cancelled', enrollment });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};