import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    message: err.message || 'Something went wrong',
    success: false,
    error: {
      name: err.name || 'InternalServerError',
      ...err, },
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, 
  };

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
