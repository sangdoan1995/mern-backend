const express = require('express');
const controller = require("../controller/UserController");
const authController = require("../controller/AuthController.js");
const TodoController = require("../controller/TodoController.js")
const router = express.Router();

const webRouter = (app) => {

    router.get('/', (req, res) => {
        res.send("<h1>Deploy nodejs success</h1>");
    })
    router.post('/sendotp', controller.sendOTP);
    router.post('/sendsms', controller.sendSMS);
    router.post('/verify', controller.verifyOTP);

    router.get('/api/users/:id/verify/:token', controller.verifyUser);
    router.post('/api/users', controller.apiUser);

    router.post('/api/auth', authController.authLogin);

    router.get('/getAllReminder/:token', TodoController.getAllReminder);
    router.post('/addReminder', TodoController.addReminder);
    router.post('/deleteReminder', TodoController.deleteRemider);


    return app.use('/', router)
}
module.exports = webRouter;
