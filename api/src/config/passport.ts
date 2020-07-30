import passport from 'passport';
import { Strategy } from 'passport-jwt';
import passportLocal from 'passport-local';
import { User } from '../models/User';
import { comparePassword } from '../services/user.service';
import { JwtConfig } from './JwtConfig';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(undefined, false, { message: `Email ${email} not found.` });
            }
            comparePassword(password, user.password, (err: Error, isMatch: boolean) => {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(undefined, user);
                }
                return done(undefined, false, { message: 'Invalid email or password.' });
            });
        });
    }),
);

passport.use(
    new Strategy(JwtConfig, function (jwtPayload: any, done: any) {
        User.findOne({ email: jwtPayload.email }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }),
);
