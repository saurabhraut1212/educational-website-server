"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = require("express");
const contact_controller_1 = require("../../controllers/contact.controller");
exports.contactRouter = (0, express_1.Router)();
exports.contactRouter.post("/", contact_controller_1.createContact);
exports.contactRouter.get("/", contact_controller_1.createContact);
