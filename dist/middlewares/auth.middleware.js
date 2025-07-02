"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const utils_1 = require("../utils");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        (0, utils_1.errorResponse)(res, 'No token provided', 401, 'AUTH_INVALID');
        return;
    }
    try {
        const token = authHeader.split(' ')[1];
        const decoded = (0, utils_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        (0, utils_1.errorResponse)(res, 'No token provided', 401, 'AUTH_INVALID');
        return;
    }
};
exports.authenticate = authenticate;
