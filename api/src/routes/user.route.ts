import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import * as passportConfig from '../config/passport';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const API_URL = '/api/v1/users/';
const authController: AuthController = new AuthController();

router.route(`${API_URL}login`).post(UserController.postLogin);
router.route(`${API_URL}logout`).get(authController.authenticateJWT, UserController.getLogout);
router.route(`${API_URL}signup`).post(UserController.postSignup);
router.route(`${API_URL}update`).post(authController.authenticateJWT, UserController.postUpdateProfile);
router.route(`${API_URL}password`).post(authController.authenticateJWT, UserController.postUpdatePassword);
router.route(`${API_URL}delete`).delete(authController.authenticateJWT, UserController.deleteAccount);

export default router;
