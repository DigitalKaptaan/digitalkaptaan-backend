"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
exports.AuthService = {
    async login(email, password) {
        const user = await models_1.User.findOne({ email }).select('+password');
        if (!user || !(await (0, utils_1.comparePassword)(password, user.password))) {
            throw { message: 'Invalid credentials', status: 401, code: 'Invalid_Credentials' };
        }
        const token = (0, utils_1.signToken)({ id: user._id, role: user.role });
        return {
            token,
            user: { id: user._id, email: user.email, role: user.role }
        };
    },
    async register(email, password) {
        const existingUser = await models_1.User.findOne({ email });
        if (existingUser) {
            throw {
                message: 'Email is already registered',
                status: 409,
                code: 'EmailIsAlreadyRegistered'
            };
        }
        const newUser = new models_1.User({ email, password });
        await newUser.save();
        const token = (0, utils_1.signToken)({ id: newUser._id, role: newUser.role });
        return {
            token,
            user: { id: newUser._id, email: newUser.email, role: newUser.role }
        };
    }
};
