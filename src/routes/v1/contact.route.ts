import { Router } from "express";
import {
  createContact,
  getAllContacts,
  getContact,
} from "../../controllers/contact.controller";
import authMiddleware from "../../middleware/auth.middleware";

export const contactRouter: Router = Router();

contactRouter.post("/createContact",  createContact);
contactRouter.get("/", authMiddleware(), getAllContacts);
contactRouter.get("/:id", authMiddleware(), getContact);
