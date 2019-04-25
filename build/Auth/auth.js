"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Permissions_1 = __importDefault(require("./Permissions"));
const express = require('express');
const router = express.Router();
const UserController_1 = __importDefault(require("../User/UserController"));
/* POST home page. */
router.post('/create', (req, res, next) => {
    let body = req.body;
    UserController_1.default.makeUser(body['firstName'], body['lastName'], body['email'], body['password']).then(msg => {
        res.send(msg);
    }).catch(error => {
        console.log(error);
        res.send(error.message);
    });
});
router.post('/loginWithPassword', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let body = req.body;
    UserController_1.default.loginWithPassword(body['email'], body['password']).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(403).send(err.toString());
    });
}));
router.post('/loginWithToken', Permissions_1.default.isLoggedIn, (req, res, next) => {
    res.sendStatus(200);
});
module.exports = router;
