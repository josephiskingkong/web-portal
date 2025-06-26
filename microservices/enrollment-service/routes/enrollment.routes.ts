import { Router } from 'express';
import { enrollInCourse, getMyEnrollments, getCourseEnrollments, getCourseStudentCount, cancelEnrollment } from '../controllers/enrollment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/enroll', authMiddleware, enrollInCourse);
router.get('/my', authMiddleware, getMyEnrollments);
router.get('/course/:courseId', getCourseEnrollments);
router.get('/course/:courseId/count', getCourseStudentCount);
router.post('/cancel', authMiddleware, cancelEnrollment);

export default router;