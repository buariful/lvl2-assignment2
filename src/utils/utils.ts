import { Response } from 'express';

export const returnSuccessResponse = (
  res: Response,
  status: number = 200,
  message: string = 'Successfull',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any = {},
) => {
  res.status(status).json({
    success: true,
    message: message,
    data,
  });
};

export const returnErrorResponse = (
  res: Response,
  status: number = 400,
  message: string = 'Something went wrong',
) => {
  res.status(status).json({
    success: false,
    message: message,
    error: {
      code: status,
      description: message,
    },
  });
};
