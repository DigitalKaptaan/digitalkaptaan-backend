"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
exports.BlogService = {
    create: async (data, localFilePath, mimetype) => {
        const uploadResult = await (0, utils_1.uploadOnCloudinary)(localFilePath, mimetype);
        if (!uploadResult || !uploadResult.secure_url || !uploadResult.resource_type) {
            throw new Error('Upload failed or unsupported media type');
        }
        const blog = new models_1.Blog({
            ...data,
            ...(typeof data.meta === 'string' && { meta: JSON.parse(data.meta) }),
            coverImage: uploadResult.secure_url
        });
        return await blog.save();
    },
    findAllPublished: async () => {
        return await models_1.Blog.find({ status: 'published' }).sort({ createdAt: -1 });
    },
    findBySlug: async (slug) => {
        return await models_1.Blog.findOne({ slug, status: 'published' });
    },
    updateById: async (id, data) => {
        return await models_1.Blog.findByIdAndUpdate(id, data, { new: true });
    },
    deleteById: async (id) => {
        return await models_1.Blog.findByIdAndDelete(id);
    },
    getLatestBlogs: async (limit = 3) => {
        return models_1.Blog.find().sort({ createdAt: -1 }).limit(limit).lean();
    }
};
