"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const constants_1 = require("../constants");
const validators_1 = require("../validators");
const router = (0, express_1.Router)();
// Public Routes
router.get('/', controllers_1.getAllMenus);
router.get('/:slug', controllers_1.getMenuBySlug);
// Admin-only routes
router.post('/', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), (0, middlewares_1.validate)(validators_1.createMenuSchema), controllers_1.createMenu);
router.put('/:id', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), (0, middlewares_1.validate)(validators_1.updateMenuSchema), controllers_1.updateMenu);
router.delete('/:id', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), controllers_1.deleteMenu);
exports.default = router;
