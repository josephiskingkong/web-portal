import { Comment, IComment } from '../models/comment.model';

export class CommentService {
	static async createComment(data: Partial<IComment>) {
		const comment = new Comment(data);
		return await comment.save();
	}

	static async findCommentById(id: string) {
		return await Comment.findById(id)
			.populate('user', 'firstName lastName')
			.populate('lesson', 'title');
	}

	static async findCommentsByLesson(lessonId: string) {
		return await Comment.find({ lesson: lessonId })
			.populate('user', 'firstName lastName')
			.sort({ createdAt: -1 });
	}

	static async updateComment(id: string, text: string) {
		return await Comment.findByIdAndUpdate(id, { text }, { new: true, runValidators: true });
	}

	static async deleteComment(id: string) {
		return await Comment.findByIdAndDelete(id);
	}
}
