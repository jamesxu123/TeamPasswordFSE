import Express from 'express'
import User from '../User/User'
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
    static getToken(req: Express.Request): string {
        let token: string = req.get("JWT") || '';
        if (token === '') {
            throw new Error("No JWT token provided!");
        }
        return token;
    }

    static isLoggedIn(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
        const token: string = Permissions.getToken(req);
        jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                res.status(403).send({error: 'Access Denied'});
            } else {
                if (decoded['permission'] >= 1) {
                    next();
                } else {
                    res.status(403).send({error: 'Access Denied'});
                }
            }
        })
    }

    static isAdmin(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
        const token: string = this.getToken(req);
        jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                res.status(403).send({error: 'Access Denied'});
            } else {
                if (decoded['permission'] >= 2) {
                    next();
                } else {
                    res.status(403).send({error: 'Access Denied'});
                }
            }
        })
    }

    // static isGroupMember(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    //     const token: string = this.getToken(req);
    //     jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
    //         if (err) {
    //             res.status(403).send({error: 'Access Denied'});
    //         } else {
    //             if (decoded['permission'] >= 2) {
    //                 next();
    //             } else {
    //                 res.status(403).send({error: 'Access Denied'});
    //             }
    //         }
    //     });
    // }
}

export default Permissions
