"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactUpsertSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.contactUpsertSchema = joi_1.default.object({
    address: joi_1.default.string().required(),
    addressHeader: joi_1.default.string().required(),
    addressIcon: joi_1.default.string().required(),
    countryCode: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().required(),
    phoneHeader: joi_1.default.string().required(),
    phoneIcon: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    emailHeader: joi_1.default.string().required(),
    emailIcon: joi_1.default.string().required()
});
