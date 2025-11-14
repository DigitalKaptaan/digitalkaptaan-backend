import multer, { StorageEngine, FileFilterCallback } from 'multer'
import path from 'path'
import { Request } from 'express'

// Allowed file types
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm']

// File filter
const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Unsupported file type'))
  }
}

// Storage configuration
const storage: StorageEngine = multer.diskStorage({
  destination: (_req: Request, _file, cb) => {
    cb(null, '/tmp')
  },
  // cb(null,  './public/temp')
  filename: (_req: Request, file, cb) => {
    const ext = path.extname(file.originalname)
    const filename = `${Date.now()}${ext}`
    cb(null, filename)
  }
})

// Upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20 MB limit
  }
})

export default upload

export const uploadSingle = upload.single('file')
export const uploadMultiple = upload.array('files', 10)
