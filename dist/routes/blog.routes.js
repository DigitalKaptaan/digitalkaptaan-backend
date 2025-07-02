"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const validators_1 = require("../validators");
const constants_1 = require("../constants");
const router = (0, express_1.Router)();
// Public routes
router.get('/', controllers_1.getAllBlogs);
router.get('/:slug', controllers_1.getBlogBySlug);
// Admin-only routes
router.post('/', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), (0, middlewares_1.validate)(validators_1.createBlogSchema), middlewares_1.uploadSingle, controllers_1.createBlog);
router.put('/:id', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), (0, middlewares_1.validate)(validators_1.createBlogSchema), controllers_1.updateBlog);
router.delete('/:id', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), controllers_1.deleteBlog);
exports.default = router;
