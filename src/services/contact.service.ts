import { Contact, IContact } from '../models'

export const ContactService = {
  upsertContact: async (data: IContact) => {
    await Contact.deleteMany({})
    const contact = await Contact.create(data)
    return contact
  },

  getContact: async () => {
    const contact = await Contact.findOne()
    return contact
  }
}
