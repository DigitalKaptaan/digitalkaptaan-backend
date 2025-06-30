import Joi from 'joi'

export const contactUpsertSchema = Joi.object({
  address: Joi.string().required(),
  addressHeader: Joi.string().required(),
  addressIcon: Joi.string().required(),
  countryCode: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  phoneHeader: Joi.string().required(),
  phoneIcon: Joi.string().required(),
  email: Joi.string().email().required(),
  emailHeader: Joi.string().required(),
  emailIcon: Joi.string().required()
})
