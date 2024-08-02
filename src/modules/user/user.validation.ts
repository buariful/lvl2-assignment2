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

export const orderDataValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});
