import Express from 'express'
import User from '../models/User'
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
    static getToken(req: any) {
        let token = req['headers']['x-access-token'] ? req['headers']['x-access-token'] : false;

        if (!token) {
            token = req.body.token;
        }
        return token;
    }

    static isUser(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
        const token: string = this.getToken(req);
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
