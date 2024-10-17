"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = require("express");
const contact_controller_1 = require("../../controllers/contact.controller");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
exports.contactRouter = (0, express_1.Router)();
exports.contactRouter.post("/createContact", contact_controller_1.createContact);
exports.contactRouter.get("/", (0, auth_middleware_1.default)(), contact_controller_1.getAllContacts);
exports.contactRouter.get("/:id", (0, auth_middleware_1.default)(), contact_controller_1.getContact);
