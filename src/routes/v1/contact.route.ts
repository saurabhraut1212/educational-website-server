import { Router } from "express";
import { createContact } from "../controllers/createController";

export const contactRouter: Router = Router();

contactRouter.post("/", createContact);

