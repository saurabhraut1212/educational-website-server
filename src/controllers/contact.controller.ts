import { Request, Response } from 'express';
import Contact, { IContact } from '../models/contact.model';

export const createContact = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    const contact = await newContact.save();
    return res.json(contact);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An unknown error occurred');
    }
    return res.status(500).send('Server error');
  }
};