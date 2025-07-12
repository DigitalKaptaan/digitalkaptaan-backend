"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const models_1 = require("../models");
exports.MenuService = {
    createMenu: (data) => models_1.Menu.create(data),
    getAllMenus: () => models_1.Menu.find().sort({ createdAt: -1 }),
    getMenuBySlug: (slug) => models_1.Menu.findOne({ slug }),
    updateMenu: (id, data) => models_1.Menu.findByIdAndUpdate(id, data, { new: true }),
    deleteMenu: (id) => models_1.Menu.findByIdAndDelete(id)
};
