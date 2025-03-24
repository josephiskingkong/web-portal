import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
	_id: mongoose.Types.ObjectId;
	title: string;
	slug: string;
	description?: string;
	createdAt: Date;
}

const CategorySchema = new Schema<ICategory>({
	title: { type: String, required: true },
	slug: { type: String, required: true, unique: true },
	description: { type: String },
	createdAt: { type: Date, default: Date.now },
});

export const Category = mongoose.model<ICategory>('Course', CategorySchema);
