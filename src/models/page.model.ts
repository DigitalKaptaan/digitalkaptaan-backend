import mongoose, { Schema, Document, Types } from 'mongoose'

// Define TypeScript interface
export interface IPage extends Document {
  name: string
  slug: string
  sections: Types.ObjectId[] // References to PageSection
}

// Mongoose Schema
const pageSchema: Schema<IPage> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sections: [{ type: Schema.Types.ObjectId, ref: 'PageSection' }]
  },
  { timestamps: true }
)

const Page = mongoose.model<IPage>('Page', pageSchema)
export default Page
