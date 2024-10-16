"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});
const ContactModel = (0, mongoose_1.model)('Contact', contactSchema);
exports.ContactModel = ContactModel;
