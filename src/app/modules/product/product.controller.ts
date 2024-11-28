import { Request, Response, NextFunction,RequestHandler } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';
import { Product } from './product.model';
import { z } from 'zod';


const createABicycle: RequestHandler= async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
  try {
    const { product: productData } = req.body;  
   
    const zodParsedData = productValidationSchema.parse(productData);
    const newProduct = new Product(zodParsedData);

    const result = await newProduct.save();

  res.status(200).json({
      success: true,
      message: 'Bicycle is created successfully',
      data: result,
    });
  } 
  catch (error: any) {
    if (error instanceof z.ZodError) {
      const formattedError = {
        message: 'Validation failed',
        success: false,
        error: {
          name: 'Validation error',
          errors: error.errors.reduce((acc: any, curr: any) => {
            const field = curr.path[0];
            const errorType = curr.code === 'too_small' ? 'min' : curr.code;
            acc[field] = {
              message: curr.message,
              name: 'Validation error',
              properties: {
                message: curr.message,
                type: errorType,
                min: curr.code === 'too_small' ? 0 : undefined,
              },
              kind: errorType,
              path: curr.path,
              value: req.body.product[curr.path[0]],
            };
            return acc;
          }, {}),
        },
        stack: error.stack || 'Something went wrong',};
 res.status(400).json(formattedError); }
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
const getAllBicycles = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllBicyclesFromDB();

    res.status(200).json({
      success: true,
      message: 'Bicycle retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const formattedError = {
        message: 'Validation failed',
        success: false,
        error: {
          name: 'Validation error',
          errors: error.errors.reduce((acc: any, curr: any) => {
            const field = curr.path[0];
            const errorType = curr.code === 'too_small' ? 'min' : curr.code;
            acc[field] = {
              message: curr.message,
              name: 'Validation error',
              properties: {
                message: curr.message,
                type: errorType,
                min: curr.code === 'too_small' ? 0 : undefined,
              },
              kind: errorType,
              path: curr.path,
              value: req.body.product[curr.path[0]],
            };
            return acc;
          }, {}),
        },
        stack: error.stack || 'Something went wrong',};
 res.status(400).json(formattedError); }
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

const getASpecificBicycle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await ProductServices.getASpecificBicycleFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Bicycle retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const formattedError = {
        message: 'Validation failed',
        success: false,
        error: {
          name: 'Validation error',
          errors: error.errors.reduce((acc: any, curr: any) => {
            const field = curr.path[0];
            const errorType = curr.code === 'too_small' ? 'min' : curr.code;
            acc[field] = {
              message: curr.message,
              name: 'Validation error',
              properties: {
                message: curr.message,
                type: errorType,
                min: curr.code === 'too_small' ? 0 : undefined,
              },
              kind: errorType,
              path: curr.path,
              value: req.body.product[curr.path[0]],
            };
            return acc;
          }, {}),
        },
        stack: error.stack || 'Something went wrong',};
 res.status(400).json(formattedError); }
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

const updateProductSchema = z.object({
  body: z.object({
    price: z.number().positive().optional(),
    quantity: z.number().int().positive().optional(),
  }),
  params: z.object({
    id: z.string().min(24).max(24), 
  }),
});
const updateABicycle = async (req: Request, res: Response) => {
  try {
  
    const validated = updateProductSchema.parse(req); 
    const { id } = validated.params;
    const { price, quantity } = validated.body;

    const updatedProduct = await ProductServices.updateABicycleFromDB(id, { price, quantity });
   
 res.status(200).json({
      message: 'Bicycle updated successfully',
      status: true,
      data: updatedProduct,
    });
  } 
  catch (error: any) {
    if (error instanceof z.ZodError) {
      const formattedError = {
        message: 'Validation failed',
        success: false,
        error: {
          name: 'Validation error',
          errors: error.errors.reduce((acc: any, curr: any) => {
            const field = curr.path[0];
            const errorType = curr.code === 'too_small' ? 'min' : curr.code;
            acc[field] = {
              message: curr.message,
              name: 'Validation error',
              properties: {
                message: curr.message,
                type: errorType,
                min: curr.code === 'too_small' ? 0 : undefined,
              },
              kind: errorType,
              path: curr.path,
              value: req.body.product,
            };
            return acc;
          }, {}),
        },
        stack: error.stack || 'Something went wrong',};
 res.status(400).json(formattedError); }
       
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


const deleteABicycle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await ProductServices.deleteABicycleFromDB(id); 

   res.status(200).json({
    message: 'Bicycle deleted successfully',
    status: true,
    data: {},
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const formattedError = {
        message: 'Validation failed',
        success: false,
        error: {
          name: 'Validation error',
          errors: error.errors.reduce((acc: any, curr: any) => {
            const field = curr.path[0];
            const errorType = curr.code === 'too_small' ? 'min' : curr.code;
            acc[field] = {
              message: curr.message,
              name: 'Validation error',
              properties: {
                message: curr.message,
                type: errorType,
                min: curr.code === 'too_small' ? 0 : undefined,
              },
              kind: errorType,
              path: curr.path,
              value: req.body.product[curr.path[0]],
            };
            return acc;
          }, {}),
        },
        stack: error.stack || 'Something went wrong',};
 res.status(400).json(formattedError); }
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


export const ProductControllers = {
  createABicycle,
    getAllBicycles,
    getASpecificBicycle,
    updateABicycle,
    deleteABicycle,
  
};
