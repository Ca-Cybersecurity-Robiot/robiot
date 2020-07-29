import { Router } from 'express';
import UserRoute from './user.route';
import RobiotRoute from './robiot.route';

const router = Router();

router.use(UserRoute);
router.use(RobiotRoute);

export default router;
