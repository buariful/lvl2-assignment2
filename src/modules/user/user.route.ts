import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/test', (req: Request, res: Response) => {
  res.status(200).json({ test: 'route is working' });
});

export const UserRoutes = router;
