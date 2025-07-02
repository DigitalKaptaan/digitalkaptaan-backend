"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const validators_1 = require("../validators");
const constants_1 = require("../constants");
const router = (0, express_1.Router)();
// Public Routes
router.post('/customer-request', (0, middlewares_1.validate)(validators_1.createCustomerRequestSchema), controllers_1.submitCustomerRequest);
router.get('/', controllers_1.getContact);
// Admin-only routes
router.get('/customer-request', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), controllers_1.getCustomerRequests);
router.post('/', middlewares_1.authenticate, (0, middlewares_1.authorizeRoles)(constants_1.ROLES.ADMIN), (0, middlewares_1.validate)(validators_1.contactUpsertSchema), controllers_1.upsertContact);
exports.default = router;
