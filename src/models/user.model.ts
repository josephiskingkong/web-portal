import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
	_id: mongoose.Types.ObjectId;
	firstName: string;
	lastName: string;
	login: string;
	password: string;
	role: 'student' | 'teacher';
}

const UserSchema = new Schema<IUser>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	login: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['student', 'teacher'], required: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);
