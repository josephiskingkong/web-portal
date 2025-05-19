import { Request, Response } from 'express';
import { CommentService } from '../services/comment.service';

export const createComment = async (req: Request, res: Response) => {
	try {
		const comment = await CommentService.createComment(req.body);
		res.status(201).json({ message: 'Comment created', comment });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const getCommentById = async (req: Request, res: Response) => {
	try {
		const comment = await CommentService.findCommentById(req.params.id);
		if (!comment) {
			res.status(404).json({ error: 'Comment not found' });
			return;
		}
		res.json(comment);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const getCommentsByLesson = async (req: Request, res: Response) => {
	try {
		const comments = await CommentService.findCommentsByLesson(req.params.lessonId);
		res.json(comments);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const updateComment = async (req: Request, res: Response) => {
	try {
		const updatedComment = await CommentService.updateComment(req.params.id, req.body.text);
		if (!updatedComment) {
			res.status(404).json({ error: 'Comment not found' });
			return;
		}
		res.json({ message: 'Comment updated', comment: updatedComment });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

export const deleteComment = async (req: Request, res: Response) => {
	try {
		const deletedComment = await CommentService.deleteComment(req.params.id);
		if (!deletedComment) {
			res.status(404).json({ error: 'Comment not found' });
			return;
		}
		res.json({ message: 'Comment deleted', comment: deletedComment });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
