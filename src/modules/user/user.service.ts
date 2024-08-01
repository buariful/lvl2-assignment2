import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { userDataValidationSchema } from './user.validation';

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

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
};
