import { Request, Response } from 'express';
import { TagService } from '../services/tag.service';

export const createTag = async (req: Request, res: Response) => {
	try {
		const tag = await TagService.createTag(req.body);
		res.status(201).json({ message: 'Tag created', tag });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
};
