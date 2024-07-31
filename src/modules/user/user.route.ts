import express, { Request, Response } from 'express';
import { UserModel } from './user.model';
const router = express.Router();

router.get('/test', async (req: Request, res: Response) => {
  try {
    const result = await UserModel.find();
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error });
  }
});

export const UserRoutes = router;
