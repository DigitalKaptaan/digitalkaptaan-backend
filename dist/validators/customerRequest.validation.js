"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerRequestSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCustomerRequestSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().label('First Name'),
    lastName: joi_1.default.string().required().label('Last Name'),
    email: joi_1.default.string().required().label('Email'),
    phone: joi_1.default.string().required().label('Phone'),
    subject: joi_1.default.string().required().label('Subject'),
    message: joi_1.default.string().required().label('Message')
});
