import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(10).max(15).required(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().default(false).optional(),
  contactType: Joi.string()
    .valid('work', 'personal', 'home')
    .default('personal')
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  phoneNumber: Joi.string().min(10).max(15).optional(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().default(false).optional(),
  contactType: Joi.string()
    .valid('work', 'personal', 'home')
    .default('personal')
    .optional(),
});
