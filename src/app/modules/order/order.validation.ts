import { z } from 'zod';

export const createOrderSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  product: z.string().min(24, { message: 'Invalid product ID' }), 
  quantity: z.number().int().positive({ message: 'Quantity must be a positive integer' }),
  totalPrice: z.number().positive({ message: 'Total price must be a positive number' }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
