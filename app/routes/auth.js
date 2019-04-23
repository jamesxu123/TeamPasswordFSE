import Permissions from "../services/Permissions"

const express = require('express')
const router = express.Router()

import UserController from '../controller/UserController'

/* POST home page. */
router.post('/create', (req, res, next) => {
    let body = req.body
    UserController.makeUser(body['firstName'], body['lastName'], body['email'], body['password']).then(msg => {
        res.send(msg)
    }).catch(error => {
        console.log(error)
        res.send(error.message)
    })
})

router.post('/loginWithPassword', async (req, res, next) => {
    let body = req.body
    UserController.loginWithPassword(body['email'], body['password']).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(403).send(err.toString())
    })
})

router.post('/loginWithToken', Permissions.isUser, (req, res, next) => {
    res.sendStatus(200)
})

module.exports = router
