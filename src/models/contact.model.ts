import mongoose, { Document, Schema } from 'mongoose'

export interface IContact extends Document {
  address: string
  addressHeader: string
  addressIcon: string
  countryCode: string
  phoneNumber: string
  email: string
  phoneHeader: string
  phoneIcon: string
  emailHeader: string
  emailIcon: string
}

const contactSchema: Schema = new Schema(
  {
    address: { type: String, required: true },
    addressHeader: { type: String, required: true },
    addressIcon: { type: String, required: true },

    countryCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    phoneHeader: { type: String, required: true },
    phoneIcon: { type: String, required: true },

    email: { type: String, required: true },
    emailHeader: { type: String, required: true },
    emailIcon: { type: String, required: true }
  },
  { timestamps: true }
)

const Contact = mongoose.model<IContact>('Contact', contactSchema)
export default Contact
