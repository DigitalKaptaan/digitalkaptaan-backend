import { CustomerRequest, ICustomerRequest } from '../models'

export const CustomerRequestService = {
  async create(data: Partial<ICustomerRequest>) {
    return await CustomerRequest.create(data)
  },

  async getAll() {
    return await CustomerRequest.find().sort({ createdAt: -1 })
  }
}
