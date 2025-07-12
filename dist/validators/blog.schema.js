"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createBlogSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    coverImage: joi_1.default.string().uri().required(),
    status: joi_1.default.string().valid('draft', 'published'),
    meta: joi_1.default.object({
        title: joi_1.default.string().optional(),
        description: joi_1.default.string().optional(),
        keywords: joi_1.default.array().items(joi_1.default.string()).optional()
    }).optional()
});
