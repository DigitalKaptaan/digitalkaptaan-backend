import fs from 'fs'
import { UploadApiResponse } from 'cloudinary'
import { cloudinary } from '../config'

export const uploadOnCloudinary = async (
  localFilePath: string,
  mimetype: string
): Promise<UploadApiResponse | null> => {
  try {
    if (!localFilePath || !fs.existsSync(localFilePath)) {
      console.error('File does not exist:', localFilePath)
      return null
    }

    const resourceType = mimetype.startsWith('image') ? 'image' : 'video'

    const response = await cloudinary.uploader.upload(localFilePath, {
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
    })

    fs.unlinkSync(localFilePath)
    return response
  } catch (error: any) {
    console.error('Cloudinary upload error:', error)
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath)
    return null
  }
}
