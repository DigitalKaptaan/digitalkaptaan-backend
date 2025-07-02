"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const utils_1 = require("../utils");
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            (0, utils_1.errorResponse)(res, error.details[0].message, 400, 'BAD_REQUEST');
            return;
        }
        next();
    };
};
exports.validate = validate;
