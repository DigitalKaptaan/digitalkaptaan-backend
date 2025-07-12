"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogBySlug = exports.getAllBlogs = exports.createBlog = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
const createBlog = async (req, res, next) => {
    try {
        if (!req.file || !req.file.path || !req.file.mimetype) {
            (0, utils_1.errorResponse)(res, 'No file provided', 400, 'FileMissing');
            return;
        }
        const blog = await services_1.BlogService.create(req.body, req.file.path, req.file.mimetype);
        (0, utils_1.successResponse)(res, blog, 'Blog created successfully', 201);
    }
    catch (err) {
        next(err);
    }
};
exports.createBlog = createBlog;
const getAllBlogs = async (_req, res, next) => {
    try {
        const blogs = await services_1.BlogService.findAllPublished();
        (0, utils_1.successResponse)(res, blogs, 'Fetched published blogs');
    }
    catch (err) {
        next(err);
    }
};
exports.getAllBlogs = getAllBlogs;
const getBlogBySlug = async (req, res, next) => {
    try {
        const blog = await services_1.BlogService.findBySlug(req.params.slug);
        if (!blog) {
            (0, utils_1.errorResponse)(res, 'Blog not found', 404, 'BlogNotFound');
            return;
        }
        (0, utils_1.successResponse)(res, blog, 'Fetched blog');
    }
    catch (err) {
        next(err);
    }
};
exports.getBlogBySlug = getBlogBySlug;
const updateBlog = async (req, res, next) => {
    try {
        const blog = await services_1.BlogService.updateById(req.params.id, req.body);
        if (!blog) {
            (0, utils_1.errorResponse)(res, 'Blog not found', 404, 'BlogNotFound');
            return;
        }
        (0, utils_1.successResponse)(res, blog, 'Blog updated');
    }
    catch (err) {
        next(err);
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res, next) => {
    try {
        const blog = await services_1.BlogService.deleteById(req.params.id);
        if (!blog) {
            (0, utils_1.errorResponse)(res, 'Blog not found', 404, 'BlogNotFound');
            return;
        }
        (0, utils_1.successResponse)(res, null, 'Blog deleted');
    }
    catch (err) {
        next(err);
    }
};
exports.deleteBlog = deleteBlog;
