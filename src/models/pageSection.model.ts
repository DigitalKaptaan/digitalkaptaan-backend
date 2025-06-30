import mongoose, { Schema, Document } from 'mongoose'

// Define TypeScript interface
export interface IPageSection extends Document {
  type: string
  content: Record<string, any> // Flexible type for dynamic content
  order?: number
}

// Mongoose Schema
const pageSectionSchema: Schema<IPageSection> = new Schema(
  {
    type: { type: String, required: true }, // e.g., "hero", "stats", "feature", etc.
    content: { type: Schema.Types.Mixed },
    order: { type: Number }
  },
  { timestamps: true }
)

const PageSection = mongoose.model<IPageSection>('PageSection', pageSectionSchema)
export default PageSection
