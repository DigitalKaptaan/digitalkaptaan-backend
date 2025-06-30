import { IMeta, Meta } from '../models'

export const MetaService = {
  create: async (data: Partial<IMeta>) => {
    return await new Meta(data).save()
  },

  getByPage: async (page: string) => {
    return await Meta.findOne({ page })
  },

  updateByPage: async (page: string, data: Partial<IMeta>) => {
    return await Meta.findOneAndUpdate({ page }, data, { new: true, upsert: true })
  },

  deleteByPage: async (page: string) => {
    return await Meta.findOneAndDelete({ page })
  },

  getAll: async () => {
    return await Meta.find()
  }
}
