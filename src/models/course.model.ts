import { Schema, model, Document } from 'mongoose';

interface ICourse extends Document {
  name: string;
  description: string;
  duration?: number;
  instructor?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const courseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number },
  instructor: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CourseModel = model<ICourse>('Course', courseSchema);

export { CourseModel, ICourse };