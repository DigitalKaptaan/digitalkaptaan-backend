"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const utils_1 = require("../utils");
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            (0, utils_1.errorResponse)(res, 'Forbidden: insufficient privileges', 403, 'ROLE_DENIED');
            return;
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
