import mongoose, { Schema, Document } from 'mongoose';

export interface ILesson extends Document {
	_id: mongoose.Types.ObjectId;
	title: string;
	content?: string;
	videoUrl?: string;
	course: mongoose.Types.ObjectId;
	order?: number;
	createdAt: Date;
}

const LessonSchema = new Schema<ILesson>({
	title: { type: String, required: true },
	content: { type: String },
	videoUrl: { type: String },
	course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
	order: { type: Number },
	createdAt: { type: Date, default: Date.now },
});

export const Lesson = mongoose.model<ILesson>('Lesson', LessonSchema);
