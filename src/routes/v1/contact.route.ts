import { Router } from "express";
import { createContact } from "../../controllers/contact.controller";

export const contactRouter: Router = Router();

contactRouter.post("/", createContact);
contactRouter.get("/", createContact);

