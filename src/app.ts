//node dist/server.js
// npm run start:dev

import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.route';
import OrderRoutes from './app/modules/order/order.route';
import errorHandler from './app/modules/middlewares/errorHandler';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

const getAController = (req: Request, res: Response) => {
  const x = 30;
  res.status(200).send({ value: x });
};

app.use((req, res, next) => {
 res.status(404).json({ success: false, message: 'Resource not found' });
});

app.use(errorHandler);

app.get('/', getAController);

export default app;

