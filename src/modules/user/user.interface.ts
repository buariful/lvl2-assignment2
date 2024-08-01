import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
};

export interface TUserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number): Promise<TUser | null>;
}

// export type TUserMethods = {
//   // eslint-disable-next-line no-unused-vars
//   isUserExists(id: number): Promise<TUser | null>;
//   // eslint-disable-next-line no-unused-vars
//   findByUserId(id: number): Promise<TUser | null>;
// };

// export type TUserModel = Model<TUser, Record<string, never>, TUserMethods>;
