"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
// Permission Validation
//
// 0 - Unverified
// 1 - User
// 2 - Admin
/*
JWT: {
    email: string, REQUIRED
    permission: int, REQUIRED
}
 */
class Permissions {
    static getToken(req) {
        let token = req.get("JWT") || '';
        if (token === '') {
            throw new Error("No JWT token provided!");
        }
        return token;
    }
    static isUser(req, res, next) {
        const token = Permissions.getToken(req);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send({ error: 'Access Denied' });
            }
            else {
                if (decoded['permission'] >= 1) {
                    next();
                }
                else {
                    res.status(403).send({ error: 'Access Denied' });
                }
            }
        });
    }
    static isAdmin(req, res, next) {
        const token = this.getToken(req);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send({ error: 'Access Denied' });
            }
            else {
                if (decoded['permission'] >= 2) {
                    next();
                }
                else {
                    res.status(403).send({ error: 'Access Denied' });
                }
            }
        });
    }
}
exports.default = Permissions;
