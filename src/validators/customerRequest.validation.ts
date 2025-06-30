import Joi from 'joi'

export const createCustomerRequestSchema = Joi.object({
  firstName: Joi.string().required().label('First Name'),
  lastName: Joi.string().required().label('Last Name'),
  email: Joi.string().required().label('Email'),
  phone: Joi.string().required().label('Phone'),
  subject: Joi.string().required().label('Subject'),
  message: Joi.string().required().label('Message')
})
