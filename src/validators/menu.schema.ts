import Joi from 'joi'

const menuItemSchema = Joi.object({
  label: Joi.string().required(),
  url: Joi.string().required(),
  external: Joi.boolean().optional(),
  order: Joi.number().optional(),

  children: Joi.array()
    .items(
      Joi.object({
        label: Joi.string().required(),
        url: Joi.string().required(),
        external: Joi.boolean().optional(),
        order: Joi.number().optional()
      })
    )
    .optional()
})

export const createMenuSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  items: Joi.array().items(menuItemSchema).optional()
})

export const updateMenuSchema = Joi.object({
  name: Joi.string().optional(),
  slug: Joi.string().optional(),
  items: Joi.array().items(menuItemSchema).optional()
})
