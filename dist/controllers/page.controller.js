"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePage = exports.updatePage = exports.getPageBySlug = exports.createPage = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
const createPage = async (req, res, next) => {
    try {
        const page = await services_1.PageService.createPage(req.body);
        (0, utils_1.successResponse)(res, page, 'Page created', 201);
    }
    catch (err) {
        next(err);
    }
};
exports.createPage = createPage;
const getPageBySlug = async (req, res, next) => {
    try {
        const page = await services_1.PageService.getPageBySlug(req.params.slug);
        if (!page) {
            (0, utils_1.errorResponse)(res, 'Page not found', 404, 'PageNotFound');
            return;
        }
        (0, utils_1.successResponse)(res, page, 'Page fetched');
    }
    catch (err) {
        next(err);
    }
};
exports.getPageBySlug = getPageBySlug;
const updatePage = async (req, res, next) => {
    try {
        const page = await services_1.PageService.updatePage(req.params.id, req.body);
        if (!page) {
            (0, utils_1.errorResponse)(res, 'Page not found', 404, 'PageNotFound');
            return;
        }
        (0, utils_1.successResponse)(res, page, 'Page updated');
    }
    catch (err) {
        next(err);
    }
};
exports.updatePage = updatePage;
const deletePage = async (req, res, next) => {
    try {
        const result = await services_1.PageService.deletePage(req.params.id);
        if (!result) {
            (0, utils_1.errorResponse)(res, 'Page not found', 404, 'PageNotFound');
            return;
        }
        (0, utils_1.successResponse)(res, null, 'Page deleted');
    }
    catch (err) {
        next(err);
    }
};
exports.deletePage = deletePage;
