import Joi from 'joi';

const productValidationSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(20)
    .pattern(/^[A-Z]/)
    .message('Name must start with a capital letter')
    .required(),
  brand: Joi.string().min(1).max(50).required(),
  price: Joi.number()
    .positive()
    .greater(0)
    .required()
    .messages({ 'number.base': 'Price must be a positive number' }),
  type: Joi.string()
    .valid('Mountain', 'Road', 'Hybrid', 'BMX', 'Electric')
    .required(),
  description: Joi.string().min(1).max(500).required(),
  quantity: Joi.number().integer().positive().required(),
  inStock: Joi.boolean().required(),
});

export default productValidationSchema;
