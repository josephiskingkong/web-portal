import { Router } from 'express';
import {
	createLesson,
	getLessonById,
	getLessonsByCourse,
	getAllLessons,
	updateLesson,
	deleteLesson,
} from '../controllers/lesson.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createLesson);
router.get('/', getAllLessons);
router.get('/course/:courseId', getLessonsByCourse);
router.get('/:id', getLessonById);
router.put('/:id', authMiddleware, updateLesson);
router.delete('/:id', authMiddleware, deleteLesson);

export default router;
