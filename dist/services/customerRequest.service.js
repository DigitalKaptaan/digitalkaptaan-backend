"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRequestService = void 0;
const models_1 = require("../models");
exports.CustomerRequestService = {
    async create(data) {
        return await models_1.CustomerRequest.create(data);
    },
    async getAll() {
        return await models_1.CustomerRequest.find().sort({ createdAt: -1 });
    }
};
