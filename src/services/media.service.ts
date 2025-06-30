import fs from 'fs'
import Image from '../models/image.model'
import Video from '../models/video.model'
import { uploadOnCloudinary } from '../utils'

interface PaginatedMedia {
  images: any[]
  videos: any[]
  pagination: {
    page: number
    limit: number
    totalImages: number
    totalVideos: number
  }
}
interface ImagePaginatedMedia {
  images: any[]
  pagination: {
    page: number
    limit: number
    totalImages: number
  }
}
interface VideoPaginatedMedia {
  videos: any[]
  pagination: {
    page: number
    limit: number
    totalVideos: number
  }
}

export const MediaService = {
  uploadAndSave: async (localFilePath: string, mimetype: string) => {
    if (!fs.existsSync(localFilePath)) throw new Error('File not found')

    const uploadResult = await uploadOnCloudinary(localFilePath, mimetype)

    if (!uploadResult || !uploadResult.secure_url || !uploadResult.resource_type) {
      throw new Error('Upload failed or unsupported media type')
    }

    if (uploadResult.resource_type === 'image') {
      const image = await Image.create({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        resource_type: uploadResult.resource_type
      })
      return { type: 'image', data: image }
    }

    if (uploadResult.resource_type === 'video') {
      const video = await Video.create({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        duration: uploadResult.duration,
        resource_type: uploadResult.resource_type
      })
      return { type: 'video', data: video }
    }

    throw new Error('Unsupported media type')
  },
  uploadMultipleAndSave: async (files: Express.Multer.File[]) => {
    const results = []

    for (const file of files) {
      const result = await MediaService.uploadAndSave(file.path, file.mimetype)
      if (result) results.push(result)
    }

    return results
  },
  getAllMediaPaginated: async (page = 1, limit = 10): Promise<PaginatedMedia> => {
    const skip = (page - 1) * limit

    const [totalImages, totalVideos] = await Promise.all([
      Image.countDocuments(),
      Video.countDocuments()
    ])

    const [images, videos] = await Promise.all([
      Image.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Video.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
    ])

    return {
      images,
      videos,
      pagination: {
        page,
        limit,
        totalImages,
        totalVideos
      }
    }
  },

  getImageMediaPaginated: async (page = 1, limit = 10): Promise<ImagePaginatedMedia> => {
    const skip = (page - 1) * limit

    const totalImages = await Image.countDocuments()

    const images = await Image.find().sort({ createdAt: -1 }).skip(skip).limit(limit)

    return {
      images,
      pagination: {
        page,
        limit,
        totalImages
      }
    }
  },

  getVideoMediaPaginated: async (page = 1, limit = 10): Promise<VideoPaginatedMedia> => {
    const skip = (page - 1) * limit

    const totalVideos = await Video.countDocuments()

    const videos = await Video.find().sort({ createdAt: -1 }).skip(skip).limit(limit)

    return {
      videos,
      pagination: {
        page,
        limit,
        totalVideos
      }
    }
  }
}
