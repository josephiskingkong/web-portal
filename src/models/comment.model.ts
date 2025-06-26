import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
	_id: mongoose.Types.ObjectId;
	user: mongoose.Types.ObjectId;
	lesson: mongoose.Types.ObjectId;
	text: string;
	createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	lesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
	text: { type: String, required: true, maxlength: 255 },
	createdAt: { type: Date, default: Date.now },
});

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
