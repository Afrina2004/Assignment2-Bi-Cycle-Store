import mongoose, { Schema, Document } from 'mongoose';

interface TOrder extends Document {
  email: string;
  product: mongoose.Schema.Types.ObjectId; 
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<TOrder>({
  email: { type: String, required: [true, 'Email is required'] },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: [true, 'Product is required']},
  quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'Quantity must be a positive number'] },
  totalPrice: { type: Number, required: true, min: [1, 'Total Price must be a positive number'] },
}, { timestamps: true });

const OrderModel = mongoose.model<TOrder>('Order', orderSchema);

export default OrderModel;
