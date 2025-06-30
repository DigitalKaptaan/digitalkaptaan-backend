import { Schema, model, Document } from 'mongoose'
import slugify from 'slugify'

export interface IBlog extends Document {
  title: string
  content: string
  coverImage: string
  slug: string
  status: 'draft' | 'published'
  meta: {
    title?: string
    description?: string
    keywords?: string[]
  }
  createdAt: Date
  updatedAt: Date
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    slug: { type: String, unique: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    meta: {
      title: String,
      description: String,
      keywords: [String]
    }
  },
  { timestamps: true }
)

// Generate slug before save
blogSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

const Blog = model<IBlog>('Blog', blogSchema)

export default Blog
