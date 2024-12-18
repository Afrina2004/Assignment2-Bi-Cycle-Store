import { Request, Response, RequestHandler } from 'express';
import { z } from 'zod';
import { createOrderSchema } from './order.validation'; 
import OrderModel from './order.model';
import { ProductServices } from '../product/product.service';

const createOrder: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = createOrderSchema.parse(req.body);

    const { product, quantity, email, totalPrice } = validatedData;

    const updatedProduct = await ProductServices.updateProductInventory(product, quantity);

    
   const Order = new OrderModel({
      email,
      product: product,
      quantity,
      totalPrice,
    });

    const savedOrder = await Order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: savedOrder,
    });
} catch (error: any) {
      if (error instanceof z.ZodError) {
        const formattedError = {
          message: 'Validation failed',
          success: false,
          error: {
            name: 'Validation error',
            errors: error.errors.reduce((acc: any, curr: any) => {
              const field = curr.path?.[0]; 
              const errorType = curr.code === 'too_small' ? 'min' : curr.code === 'too_large' ? 'max' : curr.code;
              const value = req.body[field] || null;
    
              acc[field || 'unknown'] = {
                message: curr.message,
                name: 'Validation error',
                properties: {
                  message: curr.message,
                  type: errorType,
                  min: curr.code === 'too_small' ? 0 : undefined,
                  max: curr.code === 'too_large' ? 100 : undefined,
                },
                kind: errorType,
                path: curr.path,
                value: value,
              };
    
              return acc;
            }, {}),
          },
          stack: error.stack || 'Something went wrong',
        };
    
      res.status(400).json(formattedError); 
      }
       else{
     res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: error.message || 'Internal server error',
      stack: error.stack,
    });
   }
}
}

const calculateRevenue: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await OrderModel.aggregate([
      {
        $project: {
          totalPrice: { $multiply: ['$totalPrice', '$quantity'] }, 
        },
      },
      {
        $group: {
          _id: null, 
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0; 

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error: any) {
      if (error instanceof z.ZodError) {
        const formattedError = {
          message: 'Validation failed',
          success: false,
          error: {
            name: 'Validation error',
            errors: error.errors.reduce((acc: any, curr: any) => {
              const field = curr.path?.[0]; 
              const errorType = curr.code === 'too_small' ? 'min' : curr.code === 'too_large' ? 'max' : curr.code;
              const value = req.body[field] || null;
    
              acc[field || 'unknown'] = {
                message: curr.message,
                name: 'Validation error',
                properties: {
                  message: curr.message,
                  type: errorType,
                  min: curr.code === 'too_small' ? 0 : undefined,
                  max: curr.code === 'too_large' ? 100 : undefined,
                },
                kind: errorType,
                path: curr.path,
                value: value,
              };
    
              return acc;
            }, {}),
          },
          stack: error.stack || 'Something went wrong',
        };
    
      res.status(400).json(formattedError); 
      }
       else{
     res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: error.message || 'Internal server error',
      stack: error.stack,
    });
   }
  }
};


export const OrderController = {
  createOrder,
  calculateRevenue,
  
};
