import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import { JWT_SECRET } from '../util/secrets';

export const JwtConfig: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    // Utiliser pour les serveru d'auth externe
    //issuer: "altermap",
    //audience: "altermap"
};
