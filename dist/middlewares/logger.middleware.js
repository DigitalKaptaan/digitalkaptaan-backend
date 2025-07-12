"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const utils_1 = require("../utils");
const requestLogger = (req, _res, next) => {
    utils_1.logger.info(`${req.method} ${req.originalUrl}`);
    next();
};
exports.requestLogger = requestLogger;
