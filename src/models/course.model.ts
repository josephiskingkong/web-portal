import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
	_id: mongoose.Types.ObjectId;
	title: string;
	slug: string;
	description?: string;
	price: number;
	imageUrl: string;
	categoryId: mongoose.Types.ObjectId;
	tags: mongoose.Types.ObjectId[];
	level: string;
	isPublished: boolean;
	authorId: mongoose.Types.ObjectId;
	createdAt: Date;
}

const CourseSchema = new Schema<ICourse>({
	title: { type: String, required: true },
	slug: { type: String, required: true, unique: true },
	description: { type: String },
	price: { type: Number, required: true },
	imageUrl: { type: String, required: true },
	categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
	tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
	level: { type: String, default: 'beginner' },
	isPublished: { type: Boolean, default: false },
	authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	createdAt: { type: Date, default: Date.now },
});

export const Course = mongoose.model<ICourse>('Course', CourseSchema);
