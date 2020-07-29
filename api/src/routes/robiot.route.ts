import { Router } from 'express';
import * as robiotController from '../controllers/robiot.controller';
import * as passportConfig from '../config/passport';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const API_URL = '/api/v1/robiot/';
const authController: AuthController = new AuthController();

router.route(`${API_URL}`).get(authController.authenticateJWT, robiotController.getConfigListFromRobiot);
router.route(`${API_URL}:configId`).get(authController.authenticateJWT, robiotController.getConfigByIdFromRobiot);
router.route(`${API_URL}:configId`).put(authController.authenticateJWT, robiotController.putConfigByIdToRobiot);

export default router;
