import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});
/* 
age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], default: [] },
  address: { type: addressSchema, required: true },
  orders: {
    type: [orderSchema],
  },
*/
export const userDataValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string().max(20, { message: 'Maximum 20' }),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email({ message: 'Email is not valid' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
});
