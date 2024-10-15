import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  description: string;
}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<ICourse>('Course', CourseSchema);