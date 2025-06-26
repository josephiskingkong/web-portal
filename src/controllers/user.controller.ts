import { User } from '../models/user.model';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import RequestWithUser from '../types/user.request.type';

export const getMe = async (req: Request, res: Response) => {
	const user = await User.findById((req as any).user.id).select('-password');
	if (!user) {
		res.status(404).json({ error: 'User not found' });
		return;
	}

	res.json(user);
};

export const deleteUser = async (req: RequestWithUser, res: Response) => {
	try {
		const { id } = req.params;

		if (!req.user) {
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}

		if (req.user.id !== id && req.user.role !== 'admin') {
			res.status(403).json({
				error: 'You can only delete your own account, unless you are an admin',
			});
			return;
		}

		const deleted = await UserService.deleteUser(id);
		if (!deleted) {
			res.status(404).json({ error: 'User not found' });
			return;
		}

		res.status(204).json({ message: 'User deleted' });
	} catch (error) {
		res.status(500).json({ error: 'Server error' });
	}
};
