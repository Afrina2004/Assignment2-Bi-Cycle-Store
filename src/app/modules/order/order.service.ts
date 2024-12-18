import Order from './order.model'; 
import { ProductServices } from '../product/product.service'; 

const createOrder = async (email: string, id: string, quantity: number, totalPrice: number) => {
const updatedProduct = await ProductServices.updateProductInventory(id, quantity);

 const order = new Order({
    email,
    product: id,
    quantity,
    totalPrice,
  });

  await order.save();

  return order;
};

export const OrderServices = {
  createOrder,

 
};
