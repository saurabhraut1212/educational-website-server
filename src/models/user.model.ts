import { Schema, model, Document, PopulatedDoc } from "mongoose";
import { ICourse } from "./course.model";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  courses: PopulatedDoc<Schema.Types.ObjectId & ICourse>[];
}

const userSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const UserModel = model<IUser>("User", userSchema);

export { UserModel, IUser };
