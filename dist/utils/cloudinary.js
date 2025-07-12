"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOnCloudinary = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../config");
const uploadOnCloudinary = async (localFilePath, mimetype) => {
    try {
        if (!localFilePath || !fs_1.default.existsSync(localFilePath)) {
            console.error('File does not exist:', localFilePath);
            return null;
        }
        const resourceType = mimetype.startsWith('image') ? 'image' : 'video';
        const response = await config_1.cloudinary.uploader.upload(localFilePath, {
            resource_type: resourceType,
            folder: resourceType === 'video' ? 'videos/' : 'images/',
            eager: [
                { width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
                {
                    width: 160,
                    height: 100,
                    crop: 'crop',
                    gravity: 'south',
                    audio_codec: 'none'
                }
            ],
            eager_async: true
        });
        fs_1.default.unlinkSync(localFilePath);
        return response;
    }
    catch (error) {
        console.error('Cloudinary upload error:', error);
        if (fs_1.default.existsSync(localFilePath))
            fs_1.default.unlinkSync(localFilePath);
        return null;
    }
};
exports.uploadOnCloudinary = uploadOnCloudinary;
