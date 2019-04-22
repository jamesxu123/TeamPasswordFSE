const express = require('express')
const router = express.Router()

import UserController from '../controller/UserController'

/* POST home page. */
router.post('/create', function (req, res, next) {
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
    let result = await UserController.loginWithPassword(body['email'], body['password'])
    res.send(result)
})

module.exports = router
