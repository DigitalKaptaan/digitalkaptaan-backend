"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoMedia = exports.getImageMedia = exports.getAllMedia = exports.uploadMultipleMedia = exports.uploadMedia = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
const uploadMedia = async (req, res, next) => {
    try {
        if (!req.file || !req.file.path || !req.file.mimetype) {
            (0, utils_1.errorResponse)(res, 'No file provided', 400, 'FileMissing');
            return;
        }
        const result = await services_1.MediaService.uploadAndSave(req.file.path, req.file.mimetype);
        (0, utils_1.successResponse)(res, result?.data, `${result?.type} uploaded successfully`, 201);
    }
    catch (err) {
        next(err);
    }
};
exports.uploadMedia = uploadMedia;
const uploadMultipleMedia = async (req, res, next) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            (0, utils_1.errorResponse)(res, 'No files uploaded', 400, 'FilesMissing');
            return;
        }
        const uploadedMedia = await services_1.MediaService.uploadMultipleAndSave(files);
        (0, utils_1.successResponse)(res, uploadedMedia, 'Media uploaded successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.uploadMultipleMedia = uploadMultipleMedia;
const getAllMedia = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const media = await services_1.MediaService.getAllMediaPaginated(page, limit);
        (0, utils_1.successResponse)(res, media, 'Fetched media with pagination');
    }
    catch (error) {
        next(error);
    }
};
exports.getAllMedia = getAllMedia;
const getImageMedia = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const media = await services_1.MediaService.getImageMediaPaginated(page, limit);
        (0, utils_1.successResponse)(res, media, 'Fetched media with pagination');
    }
    catch (error) {
        next(error);
    }
};
exports.getImageMedia = getImageMedia;
const getVideoMedia = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const media = await services_1.MediaService.getVideoMediaPaginated(page, limit);
        (0, utils_1.successResponse)(res, media, 'Fetched media with pagination');
    }
    catch (error) {
        next(error);
    }
};
exports.getVideoMedia = getVideoMedia;
