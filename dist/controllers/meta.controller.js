"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeta = exports.listAllMeta = exports.updateMeta = exports.getMeta = exports.createMeta = void 0;
const meta_service_1 = require("../services/meta.service");
const utils_1 = require("../utils");
const createMeta = async (req, res, next) => {
    try {
        const meta = await meta_service_1.MetaService.create(req.body);
        (0, utils_1.successResponse)(res, meta, 'Meta created successfully', 201);
    }
    catch (err) {
        next(err);
    }
};
exports.createMeta = createMeta;
const getMeta = async (req, res, next) => {
    try {
        const meta = await meta_service_1.MetaService.getByPage(req.params.page);
        if (!meta) {
            (0, utils_1.errorResponse)(res, 'Meta not found', 404, 'MetaNotFound');
            return;
        }
        (0, utils_1.successResponse)(res, meta);
    }
    catch (err) {
        next(err);
    }
};
exports.getMeta = getMeta;
const updateMeta = async (req, res, next) => {
    try {
        const meta = await meta_service_1.MetaService.updateByPage(req.params.page, req.body);
        (0, utils_1.successResponse)(res, meta, 'Meta updated');
    }
    catch (err) {
        next(err);
    }
};
exports.updateMeta = updateMeta;
const listAllMeta = async (_req, res, next) => {
    try {
        const metas = await meta_service_1.MetaService.getAll();
        (0, utils_1.successResponse)(res, metas, 'Meta list fetched');
    }
    catch (err) {
        next(err);
    }
};
exports.listAllMeta = listAllMeta;
const deleteMeta = async (req, res, next) => {
    try {
        const result = await meta_service_1.MetaService.deleteByPage(req.params.page);
        if (!result) {
            (0, utils_1.errorResponse)(res, 'Meta not found', 404, 'MetaNotFound');
            return;
        }
        (0, utils_1.successResponse)(res, null, 'Meta deleted');
    }
    catch (err) {
        next(err);
    }
};
exports.deleteMeta = deleteMeta;
