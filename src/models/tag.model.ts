import mongoose, { Schema, Document } from 'mongoose';

export interface ITag extends Document {
	_id: mongoose.Types.ObjectId;
	title: string;
	slug: string;
	description?: string;
	createdAt: Date;
}

const TagSchema = new Schema<ITag>({
	title: { type: String, required: true },
	slug: { type: String, required: true, unique: true },
	description: { type: String },
	createdAt: { type: Date, default: Date.now },
});

export const Tag = mongoose.model<ITag>('Course', TagSchema);
