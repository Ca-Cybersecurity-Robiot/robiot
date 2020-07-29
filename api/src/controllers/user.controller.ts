import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../util/secrets';
import * as jwt from 'jsonwebtoken';
import '../config/passport';
import { register } from '../services/user.service';
import logger from '../util/logger';
import passport from 'passport';
import { UserDocument } from '../models/User';

/**
 * POST /login
 * Sign in using email and password.
 */
export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug(req.body);
    passport.authenticate('local', (err: Error, user: UserDocument, info: any) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            logger.debug('errors', { msg: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const token = jwt.sign({ email: user.email }, JWT_SECRET);
            res.status(200).send({ token: token });
        });
    })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
export const getLogout = async (req: Request, res: Response) => {
    req.logOut();
    res.status(200).send({ message: 'you have been disconected' });
};

/**
 * POST /signup
 * Create a new local account.
 */
export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
    const token = await register(req.body.name, req.body.email, req.body.password, req.body.notifications);
    res.status(200).send({ token });
};

/**
 * POST /account/profile
 * Update profile information.
 */
export const postUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
    //TODO Post update
};

/**
 * POST /account/password
 * Update current password.
 */
export const postUpdatePassword = async (req: Request, res: Response, next: NextFunction) => {
    //TODO Post Update
};

/**
 * DEL /delete
 * Delete user account.
 */
export const deleteAccount = (req: Request, res: Response, next: NextFunction) => {
    // TODO Delete
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
export const postReset = async (req: Request, res: Response, next: NextFunction) => {
    //TODO generate random token and update user
};
