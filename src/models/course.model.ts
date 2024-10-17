import { Schema, model, Document } from "mongoose";

interface ICourse extends Document {
  name: string;
  description: string;
  duration: number;
  instructor: string;
  createdBy: Schema.Types.ObjectId; // Add this line
}

const courseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  instructor: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
});

const CourseModel = model<ICourse>("Course", courseSchema);

export { CourseModel, ICourse };
