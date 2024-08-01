import { model, Schema } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser } from './user.interface';

/* 
 userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders: TOrder[];
*/

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<TAddress>({
  city: { type: String, required: true },
  country: { type: String, required: true },
  street: { type: String, required: true },
});

const orderSchema = new Schema<TOrder>({
  price: { type: Number, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], default: [] },
  address: { type: addressSchema, required: true },
  orders: {
    type: [orderSchema],
  },
});

export const UserModel = model<TUser>('User', userSchema);
