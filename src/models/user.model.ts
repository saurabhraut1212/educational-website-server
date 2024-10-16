import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = model<IUser>("User", userSchema);

export { UserModel, IUser };
