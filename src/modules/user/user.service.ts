import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { userDataValidationSchema } from './user.validation';

const createUser = async (userData: TUser) => {
  const { password, ...userWithoutPassword } = userData;
  const payload = { password, ...userWithoutPassword };
  await userDataValidationSchema.parse(payload);
  const user = new UserModel(payload);

  if (await user.isUserExists(payload?.userId)) {
    throw new Error('User already exists!');
  }

  await user.save();
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

export const UserServices = {
  createUser,
  getAllUsers,
};
