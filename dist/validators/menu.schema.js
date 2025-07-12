"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMenuSchema = exports.createMenuSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const menuItemSchema = joi_1.default.object({
    label: joi_1.default.string().required(),
    url: joi_1.default.string().required(),
    external: joi_1.default.boolean().optional(),
    order: joi_1.default.number().optional(),
    children: joi_1.default.array()
        .items(joi_1.default.object({
        label: joi_1.default.string().required(),
        url: joi_1.default.string().required(),
        external: joi_1.default.boolean().optional(),
        order: joi_1.default.number().optional()
    }))
        .optional()
});
exports.createMenuSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    slug: joi_1.default.string().required(),
    items: joi_1.default.array().items(menuItemSchema).optional()
});
exports.updateMenuSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    slug: joi_1.default.string().optional(),
    items: joi_1.default.array().items(menuItemSchema).optional()
});
