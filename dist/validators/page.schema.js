"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPageSchema = exports.sectionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.sectionSchema = joi_1.default.object({
    type: joi_1.default.string().required(), // "hero", "stats", etc.
    content: joi_1.default.object().required(),
    order: joi_1.default.number().optional()
});
exports.createPageSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    slug: joi_1.default.string().required(),
    sections: joi_1.default.array().items(exports.sectionSchema).optional()
});
