"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaService = void 0;
const models_1 = require("../models");
exports.MetaService = {
    create: async (data) => {
        return await new models_1.Meta(data).save();
    },
    getByPage: async (page) => {
        return await models_1.Meta.findOne({ page });
    },
    updateByPage: async (page, data) => {
        return await models_1.Meta.findOneAndUpdate({ page }, data, { new: true, upsert: true });
    },
    deleteByPage: async (page) => {
        return await models_1.Meta.findOneAndDelete({ page });
    },
    getAll: async () => {
        return await models_1.Meta.find();
    }
};
