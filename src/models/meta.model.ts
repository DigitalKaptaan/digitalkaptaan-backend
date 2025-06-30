import mongoose, { Schema, Document } from 'mongoose'

export interface IMeta extends Document {
  page: string // e.g., "home", "about", "blog"
  title: string
  description?: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}

const MetaSchema: Schema = new Schema(
  {
    page: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    keywords: [{ type: String }],
    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String }
  },
  { timestamps: true }
)

const Meta = mongoose.model<IMeta>('Meta', MetaSchema)
export default Meta
