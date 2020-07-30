import { Router } from 'express';
import * as robiotController from '../controllers/robiot.controller';

const router = Router();
const API_URL = '/api/v1/robiot/';

router.route(`${API_URL}`).get(robiotController.getConfigListFromRobiot);
router.route(`${API_URL}:configId`).get(robiotController.getConfigByIdFromRobiot);
router.route(`${API_URL}:configId`).put(robiotController.putConfigByIdToRobiot);

export default router;
