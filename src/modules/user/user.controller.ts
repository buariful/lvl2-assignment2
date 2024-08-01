import { Request, Response } from 'express';
import { returnErrorResponse, returnSuccessResponse } from '../../utils/utils';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await UserServices.createUser(payload);

    returnSuccessResponse(res, 201, 'User created successfully!', result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let errorMssge = error?.message;
    if (error.name === 'ZodError') {
      errorMssge = 'Please provide valid data.';
    }
    return returnErrorResponse(res, 400, errorMssge);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsers();
    returnSuccessResponse(res, 200, 'Users fetched successfully!', result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return returnErrorResponse(res, 400, error?.message);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUser(Number(userId));

    returnSuccessResponse(res, 200, 'User fetched successfully!', result);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return returnErrorResponse(res, 400, error?.message);
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
