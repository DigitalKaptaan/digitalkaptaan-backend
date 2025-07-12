"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenu = exports.updateMenu = exports.getMenuBySlug = exports.getAllMenus = exports.createMenu = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
const createMenu = async (req, res, next) => {
    try {
        const menu = await services_1.MenuService.createMenu(req.body);
        (0, utils_1.successResponse)(res, menu, 'Menu created successfully', 201);
    }
    catch (err) {
        next(err);
    }
};
exports.createMenu = createMenu;
const getAllMenus = async (_req, res, next) => {
    try {
        const menus = await services_1.MenuService.getAllMenus();
        (0, utils_1.successResponse)(res, menus, 'Fetched all menus');
    }
    catch (err) {
        next(err);
    }
};
exports.getAllMenus = getAllMenus;
const getMenuBySlug = async (req, res, next) => {
    try {
        const menu = await services_1.MenuService.getMenuBySlug(req.params.slug);
        if (!menu) {
            (0, utils_1.errorResponse)(res, 'Menu not found', 404, 'MenuNotFound');
            return;
        }
        (0, utils_1.successResponse)(res, menu, 'Fetched menu');
    }
    catch (err) {
        next(err);
    }
};
exports.getMenuBySlug = getMenuBySlug;
const updateMenu = async (req, res, next) => {
    try {
        const menu = await services_1.MenuService.updateMenu(req.params.id, req.body);
        if (!menu) {
            (0, utils_1.errorResponse)(res, 'Menu not found', 404, 'MenuNotFound');
            return;
        }
        (0, utils_1.successResponse)(res, menu, 'Menu updated');
    }
    catch (err) {
        next(err);
    }
};
exports.updateMenu = updateMenu;
const deleteMenu = async (req, res, next) => {
    try {
        const menu = await services_1.MenuService.deleteMenu(req.params.id);
        if (!menu) {
            (0, utils_1.errorResponse)(res, 'Menu not found', 404, 'MenuNotFound');
            return;
        }
        (0, utils_1.successResponse)(res, null, 'Menu deleted');
    }
    catch (err) {
        next(err);
    }
};
exports.deleteMenu = deleteMenu;
