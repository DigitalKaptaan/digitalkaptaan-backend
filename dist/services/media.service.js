"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const fs_1 = __importDefault(require("fs"));
const image_model_1 = __importDefault(require("../models/image.model"));
const video_model_1 = __importDefault(require("../models/video.model"));
const utils_1 = require("../utils");
exports.MediaService = {
    uploadAndSave: async (localFilePath, mimetype) => {
        if (!fs_1.default.existsSync(localFilePath))
            throw new Error('File not found');
        const uploadResult = await (0, utils_1.uploadOnCloudinary)(localFilePath, mimetype);
        if (!uploadResult || !uploadResult.secure_url || !uploadResult.resource_type) {
            throw new Error('Upload failed or unsupported media type');
        }
        if (uploadResult.resource_type === 'image') {
            const image = await image_model_1.default.create({
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
                width: uploadResult.width,
                height: uploadResult.height,
                format: uploadResult.format,
                resource_type: uploadResult.resource_type
            });
            return { type: 'image', data: image };
        }
        if (uploadResult.resource_type === 'video') {
            const video = await video_model_1.default.create({
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
                width: uploadResult.width,
                height: uploadResult.height,
                format: uploadResult.format,
                duration: uploadResult.duration,
                resource_type: uploadResult.resource_type
            });
            return { type: 'video', data: video };
        }
        throw new Error('Unsupported media type');
    },
    uploadMultipleAndSave: async (files) => {
        const results = [];
        for (const file of files) {
            const result = await exports.MediaService.uploadAndSave(file.path, file.mimetype);
            if (result)
                results.push(result);
        }
        return results;
    },
    getAllMediaPaginated: async (page = 1, limit = 10) => {
        const skip = (page - 1) * limit;
        const [totalImages, totalVideos] = await Promise.all([
            image_model_1.default.countDocuments(),
            video_model_1.default.countDocuments()
        ]);
        const [images, videos] = await Promise.all([
            image_model_1.default.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
            video_model_1.default.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
        ]);
        return {
            images,
            videos,
            pagination: {
                page,
                limit,
                totalImages,
                totalVideos
            }
        };
    },
    getImageMediaPaginated: async (page = 1, limit = 10) => {
        const skip = (page - 1) * limit;
        const totalImages = await image_model_1.default.countDocuments();
        const images = await image_model_1.default.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        return {
            images,
            pagination: {
                page,
                limit,
                totalImages
            }
        };
    },
    getVideoMediaPaginated: async (page = 1, limit = 10) => {
        const skip = (page - 1) * limit;
        const totalVideos = await video_model_1.default.countDocuments();
        const videos = await video_model_1.default.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        return {
            videos,
            pagination: {
                page,
                limit,
                totalVideos
            }
        };
    }
};
