import { Router } from 'express';
import { markLessonCompleted, unmarkLessonCompleted, getUserProgress } from '../controllers/progress.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/complete', authMiddleware, markLessonCompleted);
router.post('/uncomplete', authMiddleware, unmarkLessonCompleted);
router.get('/course/:courseId', authMiddleware, getUserProgress);

export default router;