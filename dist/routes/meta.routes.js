"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const constants_1 = require("../constants");
const validators_1 = require("../validators");
const router = (0, express_1.Router)();
// Admin-only routes
router.post('/', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), (0, middlewares_1.validate)(validators_1.createMetaSchema), controllers_1.createMeta);
router.get('/', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), controllers_1.listAllMeta);
router.put('/:page', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), controllers_1.updateMeta);
router.delete('/:page', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), controllers_1.deleteMeta);
// Public read access
router.get('/:page', controllers_1.getMeta);
exports.default = router;
