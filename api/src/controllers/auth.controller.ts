import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import '../config/passport';
import logger from '../util/logger';

export class AuthController {
    public authenticateJWT(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', function (err, user, info) {
            if (err) {
                console.log(err);
                return res.status(401).json({ status: 'error', code: 'unauthorized 1' });
            }
            logger.debug('ERR : ' + JSON.stringify(err));
            logger.debug('ERR : ' + JSON.stringify(user));
            logger.debug('ERR : ' + JSON.stringify(info));
            if (!user) {
                return res.status(401).json({ status: 'error', code: 'unauthorized 2' });
            } else {
                return next();
            }
        })(req, res, next);
    }

    public authorizeJWT(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', function (err, user, jwtToken) {
            if (err) {
                console.log(err);
                return res.status(401).json({ status: 'error', code: 'unauthorized' });
            }
            if (!user) {
                return res.status(401).json({ status: 'error', code: 'unauthorized' });
            } else {
                const scope = req.baseUrl.split('/').slice(-1)[0];
                const authScope = jwtToken.scope;
                if (authScope && authScope.indexOf(scope) > -1) {
                    return next();
                } else {
                    return res.status(401).json({ status: 'error', code: 'unauthorized' });
                }
            }
        })(req, res, next);
    }
}
