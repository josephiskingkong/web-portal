import { Enrollment, IEnrollment } from '../models/enrollment.model';
import { LessonProgress } from '../models/lesson-progress.model';
import { getChannel } from '../config/rabbitmq';
import axios from 'axios';

export class EnrollmentService {
  static async createEnrollmentRequest(userId: string, courseId: string) {
    const channel = getChannel();

    const enrollmentRequest = {
      userId,
      courseId,
      requestId: Date.now().toString(),
      timestamp: new Date()
    };

    await channel.sendToQueue('enrollment_requests', Buffer.from(JSON.stringify(enrollmentRequest)), {
      persistent: true
    });

    return { requestId: enrollmentRequest.requestId };
  }

  static async processEnrollment(data: any) {
    try {
      const existingEnrollment = await Enrollment.findOne({
        userId: data.userId,
        courseId: data.courseId
      });

      if (existingEnrollment) {
        throw new Error('Already enrolled');
      }

      const enrollment = new Enrollment({
        userId: data.userId,
        courseId: data.courseId,
        status: 'active'
      });

      await enrollment.save();

      const channel = getChannel();
      await channel.sendToQueue('enrollment_status', Buffer.from(JSON.stringify({
        requestId: data.requestId,
        status: 'success',
        enrollmentId: enrollment._id
      })));

    } catch (error: any) {
      const channel = getChannel();
      await channel.sendToQueue('enrollment_status', Buffer.from(JSON.stringify({
        requestId: data.requestId,
        status: 'failed',
        error: error.message
      })));
    }
  }

  static async getEnrollmentsByUser(userId: string) {
    return await Enrollment.find({ userId });
  }

  static async getEnrollmentsByCourse(courseId: string) {
    return await Enrollment.find({ courseId });
  }

  static async getStudentCount(courseId: string) {
    return await Enrollment.countDocuments({ courseId, status: 'active' });
  }

  static async calculateProgress(userId: string, courseId: string) {
    try {
      const courseResponse = await axios.get(`http://course-service:3002/api/lessons/course/${courseId}`);
      const totalLessons = courseResponse.data.length;

      if (totalLessons === 0) return 0;

      const completedLessons = await LessonProgress.countDocuments({
        userId,
        courseId,
        completed: true
      });

      const progress = Math.round((completedLessons / totalLessons) * 100);

      await Enrollment.findOneAndUpdate(
        { userId, courseId },
        { progressPercentage: progress }
      );

      return progress;
    } catch (error) {
      console.error('Error calculating progress:', error);
      return 0;
    }
  }

  static async markLessonCompleted(userId: string, lessonId: string, courseId: string) {
    await LessonProgress.findOneAndUpdate(
      { userId, lessonId, courseId },
      { completed: true, completedAt: new Date() },
      { upsert: true }
    );

    return await this.calculateProgress(userId, courseId);
  }

  static async unmarkLessonCompleted(userId: string, lessonId: string, courseId: string) {
    await LessonProgress.findOneAndUpdate(
      { userId, lessonId, courseId },
      { completed: false, completedAt: null }
    );

    return await this.calculateProgress(userId, courseId);
  }

  static async cancelEnrollment(userId: string, courseId: string) {
    const enrollment = await Enrollment.findOneAndUpdate(
      { userId, courseId },
      { status: 'cancelled' },
      { new: true }
    );

    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    return enrollment;
  }

  static async getUserProgress(userId: string, courseId: string) {
    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) return null;

    const lessonsProgress = await LessonProgress.find({ userId, courseId });

    return {
      enrollment,
      lessonsProgress,
      progressPercentage: enrollment.progressPercentage
    };
  }
}