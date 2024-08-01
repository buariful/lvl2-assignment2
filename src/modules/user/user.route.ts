import express, { Request, Response } from 'express';
// import { UserModel } from './user.model';
import { userDataValidationSchema } from './user.validation';
import { returnErrorResponse, returnSuccessResponse } from '../../utils/utils';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const validationParsedData = await userDataValidationSchema.parse(payload);
    returnSuccessResponse(
      res,
      201,
      'User created successfully!',
      validationParsedData,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let errorMssge = error?.message;
    if (error.name === 'ZodError') {
      errorMssge = 'Please provide valid data.';
    }
    return returnErrorResponse(res, 400, errorMssge);
  }
});

export const UserRoutes = router;
