import { z } from 'zod';

const productValidationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().positive("Price must be a positive number"),  // Enforce positive price
  type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric']),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  inStock: z.boolean(),
  quantitySold: z.number().int().min(0, 'Quantity sold must be a non-negative integer'),
  isDeleted: z.boolean().optional().default(false),
 
});


export default productValidationSchema;