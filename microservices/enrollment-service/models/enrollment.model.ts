import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  enrolledAt: Date;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  completedLessons: mongoose.Types.ObjectId[];
  progressPercentage: number;
}

const EnrollmentSchema = new Schema<IEnrollment>({
  userId: { type: Schema.Types.ObjectId, required: true },
  courseId: { type: Schema.Types.ObjectId, required: true },
  enrolledAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'active', 'completed', 'cancelled'], default: 'pending' },
  completedLessons: [{ type: Schema.Types.ObjectId }],
  progressPercentage: { type: Number, default: 0 }
});

export const Enrollment = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);