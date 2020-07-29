import { User } from '../models/User';
import bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/secrets';
import logger from '../util/logger';

export async function register(name: string, email: string, password: string, notifications: boolean) {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = new User({
        email,
        password: hashedPassword,
        name,
        notifications,
    });
    await user.save();
    logger.debug(JSON.stringify(user));
    return jwt.sign({ email }, JWT_SECRET);
}

export async function comparePassword(candidatePassword: string, password: string, callback: any) {
    bcrypt.compare(candidatePassword, password, (err: Error, isMatch: boolean) => {
        callback(err, isMatch);
    });
}
