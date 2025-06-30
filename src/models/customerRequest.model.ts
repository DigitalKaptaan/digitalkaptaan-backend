import mongoose, { Document, Schema } from 'mongoose'

export interface ICustomerRequest extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

const customerRequestSchema = new Schema<ICustomerRequest>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
)

const CustomerRequest = mongoose.model<ICustomerRequest>('CustomerRequest', customerRequestSchema)

export default CustomerRequest
