import mongoose, { Document, Schema } from 'mongoose'

export interface IVideo extends Document {
  url: string
  public_id: string
  duration: number
  format: string
  width: number
  height: number
  resource_type: 'video'
  createdAt: Date
}

const VideoSchema: Schema<IVideo> = new Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true, unique: true },
    duration: { type: Number },
    format: { type: String },
    width: { type: Number },
    height: { type: Number },
    resource_type: { type: String, enum: ['video'], default: 'video' }
  },
  { timestamps: true }
)

const Video = mongoose.model<IVideo>('Video', VideoSchema)
export default Video
