"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await services_1.AuthService.login(email, password);
        (0, utils_1.successResponse)(res, result, 'Login successful', 200);
    }
    catch (err) {
        (0, utils_1.errorResponse)(res, err.message, err.status || 500, err.code || 'LoginError');
    }
};
exports.login = login;
const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await services_1.AuthService.register(email, password);
        (0, utils_1.successResponse)(res, result, 'Registration successful', 201);
    }
    catch (err) {
        (0, utils_1.errorResponse)(res, err.message, err.status || 500, err.code || 'RegistrationError');
    }
};
exports.register = register;
