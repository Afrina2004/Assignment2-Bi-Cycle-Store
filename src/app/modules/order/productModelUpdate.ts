import { Product } from '../product/product.model'; 

const updateProductInventory = async (id: string, quantity: number) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.quantity < quantity) {
    throw new Error('Insufficient stock available');
  }

  product.quantity -= quantity;

  if (product.quantity === 0) {
    product.inStock = false;
  }

  await product.save();

  return product;
};

export const ProductServices = {
  updateProductInventory,
};
