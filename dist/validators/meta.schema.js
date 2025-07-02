"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetaSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createMetaSchema = joi_1.default.object({
    page: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    description: joi_1.default.string().allow('', null),
    keywords: joi_1.default.array().items(joi_1.default.string()).optional(),
    ogTitle: joi_1.default.string().allow('', null),
    ogDescription: joi_1.default.string().allow('', null),
    ogImage: joi_1.default.string().uri().allow('', null)
});
