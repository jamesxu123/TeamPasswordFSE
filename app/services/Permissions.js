import * as express from 'express'
import User from '../models/User'
var jwt = require('jsonwebtoken');
require('dotenv').load()

// Permission Validation
//
// 0 - Unverified
// 1 - User
// 2 - Admin


/*
JWT: {
    email: string,
    permission: int,
}

 */

function findByToken(token) {
    const tokenJSON = JSON.parse(token);
}

class Permissions {
    static getToken(req) {
        let token = req['headers']['x-access-token'] ? req['headers']['x-access-token'] : false;

        if (!token) {
            token = req.body.token;
        }
        return token;
    }

    static isUser(req, res, next) {
        const token = this.getToken(req);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send({error: 'Access Denied'});
            } else {
                if (token['permission'] >= 1) {
                    next();
                } else {
                    res.status(403).send({error: 'Access Denied'});
                }
            }
        })
    }

    static isAdmin(req, res, next) {
        const token = this.getToken(req);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send({error: 'Access Denied'});
            } else {
                if (token['permission'] >= 2) {
                    next();
                } else {
                    res.status(403).send({error: 'Access Denied'});
                }
            }
        })
    }

    static isGroupMember(req, res, next) {
        const token = this.getToken(req);
    }
}

export default Permissions
