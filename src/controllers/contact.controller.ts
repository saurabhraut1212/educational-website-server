import { Request, Response, NextFunction } from 'express';
import { ContactModel } from '../models/contact.model';
import catchAsync from '../utils/catchAsync';

// Get all contacts
export const getAllContacts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const itemsPerPage = Number(req.query.itemsPerPage) || 10;
  const pageCount = Number(req.query.pageCount) || 1;
  const skip = itemsPerPage * (pageCount - 1);
  const totalContacts = await ContactModel.countDocuments().exec();
  const contacts = await ContactModel.find()
    .skip(skip)
    .limit(itemsPerPage)
    .lean()
    .exec();

  if (!!contacts && contacts.length === 0) {
    return res.status(404).json({ message: 'No contacts found' });
  }

  return res.status(200).json({
    message: 'Contacts retrieved successfully',
    data: {
      contacts,
      currentPage: pageCount,
      totalContacts,
    },
  });
});

// Create a new contact
export const createContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, message } = req.body;
    const contact = await ContactModel.create({
      name,
      email,
      message,
    });
    return res.status(201).json({
      message: 'Contact created successfully',
      data: contact,
    });
  }
);