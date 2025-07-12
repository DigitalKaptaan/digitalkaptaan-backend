"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    slug: { type: String, unique: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    meta: {
        title: String,
        description: String,
        keywords: [String]
    }
}, { timestamps: true });
// Generate slug before save
blogSchema.pre('save', function (next) {
    if (!this.slug && this.title) {
        this.slug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
    }
    next();
});
const Blog = (0, mongoose_1.model)('Blog', blogSchema);
exports.default = Blog;
