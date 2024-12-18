import { Model } from 'mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';


  export interface TProduct extends Document {
    name: string;
    brand: string;
    price: number;
    type: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric" ;
    description: string;
    quantity: number;
    inStock: boolean;
  }

  export interface ProductModel extends Model<TProduct> {
    calculateTotalPrice(productId: Types.ObjectId, quantity: number): Promise<number>; 
    isUserExists(id: string): Promise<TProduct | null>;  
  }

  