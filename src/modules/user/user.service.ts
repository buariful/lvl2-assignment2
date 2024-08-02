import { TOrder, TUser } from './user.interface';
import { UserModel } from './user.model';
import {
  orderDataValidationSchema,
  userDataValidationSchema,
} from './user.validation';

const createUser = async (userData: TUser) => {
  const { password, ...userWithoutPassword } = userData;
  const payload = { password, ...userWithoutPassword };
  await userDataValidationSchema.parse(payload);

  if (await UserModel.isUserExists(payload?.userId)) {
    throw new Error('User already exists!');
  }
  if (await UserModel.findByUsername(payload?.username)) {
    throw new Error('Username already exists!');
  }

  await UserModel.create(payload);
  return userWithoutPassword;
};

const getAllUsers = async () => {
  const userList = await UserModel.find({}).select([
    'username',
    'fullName',
    'age',
    'email',
    'address',
  ]);
  return userList;
};

const getSingleUser = async (userId: number) => {
  if (!(await await UserModel.isUserExists(userId))) {
    throw new Error('User not found');
  }

  const result = await UserModel.findOne({ userId });
  return result;
};

const updateUser = async (userId: number, userData: TUser) => {
  const { password, ...userWithoutPassword } = userData;
  const payload = { password, ...userWithoutPassword };
  await userDataValidationSchema.parse(payload);

  const userFindById = await UserModel.isUserExists(userId);
  const userFindByUsername = await UserModel.findByUsername(payload?.username);

  if (!userFindById?.userId) {
    throw new Error('User not found!');
  }
  if (
    userId !== userData?.userId &&
    (await UserModel.isUserExists(userData?.userId))
  ) {
    throw new Error('UserId exists, use another one!');
  }
  // if another user exist with the same username
  if (userId !== userFindByUsername?.userId && userFindByUsername) {
    throw new Error('Username exists, use another one!');
  }

  await UserModel.findOneAndUpdate({ userId }, userData);
  return userWithoutPassword;
};

const updateOrders = async (userId: number, orderData: TOrder) => {
  const user = await UserModel.isUserExists(userId);
  if (!user) {
    throw new Error('User not found');
  }

  orderDataValidationSchema.parse(orderData);
  const userOrders = user?.orders ?? [];
  userOrders.push(orderData);

  return await UserModel.updateOne({ userId }, { orders: userOrders });
};

const getUserOrders = async (userId: number) => {
  const user = await UserModel.isUserExists(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return user?.orders;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  updateOrders,
  getUserOrders,
};
