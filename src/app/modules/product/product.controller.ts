import { Request, Response, NextFunction,RequestHandler } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';
import updateProductSchema from './updateProduct.validation'; 
import { Product } from './product.model';
import {z} from 'zod';


const createABicycle: RequestHandler= async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
  try {
    const { name, brand, price, type, description, quantity, inStock } = req.body;  
    const validatedData = productValidationSchema.parse({
      name,
      brand,
      price,
      type,
      description,
      quantity,
      inStock,
    });

    const newProduct = new Product(validatedData);
     const result = await newProduct.save();

     res.status(200).json({
      message: 'Bicycle is created successfully',
      success: true,
      data: result,
    });
  }catch (error: any) {
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
    }};
  

const getAllBicycles = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllBicyclesFromDB();
    const { searchTerm } = req.query;
 const filter: any = {};
    if (searchTerm) {
      const regex = new RegExp(searchTerm as string, 'i'); 
      filter.$or = [
        { name: regex },
        { brand: regex },
        { type: regex },
      ];
    }

    const bicycles = await Product.find(filter);

    res.status(200).json({
      message: 'Bicycle retrieved successfully',
      status: true,
      data: bicycles,
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

const getASpecificBicycle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await ProductServices.getASpecificBicycleFromDB(id);

    res.status(200).json({
      message: 'Bicycle retrieved successfully',
      status: true,
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

const deleteABicycle = async (req: Request, res: Response) => {
  try {
    const { id  } = req.params;
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
