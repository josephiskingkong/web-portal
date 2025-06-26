import mongoose, { Schema, Document } from 'mongoose';

export interface ILessonProgress extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  lessonId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  completed: boolean;
  completedAt?: Date;
}

const LessonProgressSchema = new Schema<ILessonProgress>({
  userId: { type: Schema.Types.ObjectId, required: true },
  lessonId: { type: Schema.Types.ObjectId, required: true },
  courseId: { type: Schema.Types.ObjectId, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date }
});

export const LessonProgress = mongoose.model<ILessonProgress>('LessonProgress', LessonProgressSchema);