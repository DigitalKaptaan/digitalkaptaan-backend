"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const constants_1 = require("../constants");
const router = (0, express_1.Router)();
// Admin-only routes
router.post('/upload', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), middlewares_1.uploadSingle, controllers_1.uploadMedia);
router.get('/all', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), controllers_1.getAllMedia);
router.get('/images', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), controllers_1.getImageMedia);
router.get('/videos', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), controllers_1.getVideoMedia);
// Public Routes
router.post('/upload-multiple', middlewares_1.uploadMultiple, controllers_1.uploadMultipleMedia);
exports.default = router;
