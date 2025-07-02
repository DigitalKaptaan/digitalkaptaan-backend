"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const constants_1 = require("../constants");
const validators_1 = require("../validators");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
// Admin-only routes
router.post('/', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), (0, middlewares_1.validate)(validators_1.createPageSchema), controllers_1.createPage);
router.put('/:id', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), controllers_1.updatePage);
router.delete('/:id', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), controllers_1.deletePage);
// Public
router.get('/:slug', controllers_1.getPageBySlug);
exports.default = router;
