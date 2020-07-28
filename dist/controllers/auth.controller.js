"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
require("../config/passport");
const logger_1 = __importDefault(require("../util/logger"));
class AuthController {
    authenticateJWT(req, res, next) {
        passport_1.default.authenticate("jwt", function (err, user, info) {
            if (err) {
                console.log(err);
                return res.status(401).json({ status: "error", code: "unauthorized 1" });
            }
            logger_1.default.debug("ERR : " + JSON.stringify(err));
            logger_1.default.debug("ERR : " + JSON.stringify(user));
            logger_1.default.debug("ERR : " + JSON.stringify(info));
            if (!user) {
                return res.status(401).json({ status: "error", code: "unauthorized 2" });
            }
            else {
                return next();
            }
        })(req, res, next);
    }
    authorizeJWT(req, res, next) {
        passport_1.default.authenticate("jwt", function (err, user, jwtToken) {
            if (err) {
                console.log(err);
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
            if (!user) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
            else {
                const scope = req.baseUrl.split("/").slice(-1)[0];
                const authScope = jwtToken.scope;
                if (authScope && authScope.indexOf(scope) > -1) {
                    return next();
                }
                else {
                    return res.status(401).json({ status: "error", code: "unauthorized" });
                }
            }
        })(req, res, next);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map