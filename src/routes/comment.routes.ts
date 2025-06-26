import { Router } from 'express';
import {
	createComment,
	getCommentById,
	getCommentsByLesson,
	updateComment,
	deleteComment,
} from '../controllers/comment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, createComment);
router.get('/:id', getCommentById);
router.get('/lesson/:lessonId', getCommentsByLesson);
router.put('/:id', authMiddleware, updateComment);
router.delete('/:id', authMiddleware, deleteComment);

export default router;
