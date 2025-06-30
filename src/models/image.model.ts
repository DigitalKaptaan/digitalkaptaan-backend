import mongoose, { Document, Schema } from 'mongoose'

export interface IImage extends Document {
  url: string
  public_id: string
  width: number
  height: number
  format: string
  resource_type: 'image'
  createdAt: Date
}

const ImageSchema: Schema<IImage> = new Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true, unique: true },
    width: { type: Number },
    height: { type: Number },
    format: { type: String },
    resource_type: { type: String, enum: ['image'], default: 'image' }
  },
  { timestamps: true }
)

const Image = mongoose.model<IImage>('Image', ImageSchema)
export default Image
