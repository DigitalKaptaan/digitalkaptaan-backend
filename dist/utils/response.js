"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, message = 'Something went wrong', statusCode = 500, errorCode = 'INTERNAL_SERVER_ERROR', errors = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errorCode,
        errors
    });
};
exports.errorResponse = errorResponse;
