import { Schema, model, Document } from 'mongoose';

interface IContact extends Document {
  name: string;
  email: string;
  message: string;
}

const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const ContactModel = model<IContact>('Contact', contactSchema);

export { ContactModel, IContact };