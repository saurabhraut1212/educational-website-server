"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContact = exports.getContact = exports.getAllContacts = void 0;
const contact_model_1 = require("../models/contact.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
// Get all contacts
exports.getAllContacts = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const itemsPerPage = Number(req.query.itemsPerPage) || 10;
    const pageCount = Number(req.query.pageCount) || 1;
    const skip = itemsPerPage * (pageCount - 1);
    const totalContacts = yield contact_model_1.ContactModel.countDocuments().exec();
    const contacts = yield contact_model_1.ContactModel.find()
        .skip(skip)
        .limit(itemsPerPage)
        .lean()
        .exec();
    if (!!contacts && contacts.length === 0) {
        return res.status(404).json({ message: "No contacts found" });
    }
    return res.status(200).json({
        message: "Contacts retrieved successfully",
        data: {
            contacts,
            currentPage: pageCount,
            totalContacts,
        },
    });
}));
// Get a single contact
exports.getContact = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const contact = yield contact_model_1.ContactModel.findById(id).lean().exec();
    if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json({
        message: "Contact retrieved successfully",
        data: contact,
    });
}));
// Create a new contact
exports.createContact = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    const contact = yield contact_model_1.ContactModel.create({
        name,
        email,
        message,
    });
    return res.status(201).json({
        message: "Contact created successfully",
        data: contact,
    });
}));
