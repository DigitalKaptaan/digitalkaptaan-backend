"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const utils_1 = require("../utils");
const errorHandler = (err, _req, res, _next) => {
    console.error('❌ Error:', err);
    if (err instanceof utils_1.ApiError) {
        (0, utils_1.errorResponse)(res, err.message, err.statusCode, err.errorCode, err.errors);
    }
    else {
        (0, utils_1.errorResponse)(res, 'Internal Server Error', 500, 'INTERNAL_SERVER_ERROR');
    }
};
exports.errorHandler = errorHandler;
