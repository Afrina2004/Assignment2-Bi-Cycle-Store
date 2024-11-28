import { Schema, model } from 'mongoose';
import { ProductModel,TProduct,} from './product.interface';

  const productSchema = new Schema<TProduct>({
    id: { type: String, required: [true, 'ID is required'], unique: true },
  name: { type: String, required: [true, 'Name is required'] },
  brand: { type: String, required: [true, 'Brand is required'] },
  price: { 
    type: Number, 
    required: true, 
    min: [0, 'Price must be a positive number'] 
  },
    type: {
      type: String,
      enum:  ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: [true, 'Bicycle type is required'],
    },
    description: { type: String, required: [true, 'Description is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'], min: [0, 'Quantity must be a positive number'] },
  inStock: { type: Boolean, default: true },
  quantitySold: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

  export interface Product extends Document {
  name: string;
  brand: string;
  price: number;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric',
  description: string;
  quantity: number;
  inStock: boolean;
  quantitySold: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  isProductExists(id: string): Promise<boolean>;
}

productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

  productSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
  });

  
   productSchema.methods.isProductExists = async function (id: string) {
    const product = await this.model('Product').findById(id);
    return !!product;
  };

  export const Product= model<TProduct,ProductModel>('Product', productSchema);
