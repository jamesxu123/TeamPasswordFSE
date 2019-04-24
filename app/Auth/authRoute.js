import Permissions from "./Permissions"

const express = require('express')
const router = express.Router()

import UserController from '../User/UserController'

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

router.post('/loginWithToken', Permissions.isLoggedIn, (req, res, next) => {
    // UserController.loginWithToken(Permissions.getToken(req)).then(value => {
    //     if (value) {
    //         res.status(200).send(value)
    //     } else {
    //         res.status(403)
    //     }
    // }).catch(err => {
    //     res.status(403).send(err.toString())
    // })
    res.status(200)
})

module.exports = router
