const express = require('express');
const controller = require("../controller/UserController");
const authController = require("../controller/AuthController.js");
const TodoController = require("../controller/TodoController.js");
const AbsentContrller = require("../controller/AbsentController.js")
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

    router.get('/getAllReminder/:id', TodoController.getAllReminder);
    router.post('/addReminder', TodoController.addReminder);
    router.post('/deleteReminder', TodoController.deleteRemider);

    router.post('/absent/create', AbsentContrller.createAbsentUser);
    router.get('/absent/sendmail/:id', AbsentContrller.getSendUser);
    router.post('/absent/sendmail/:id', AbsentContrller.sendMail);
    router.get('/absent/list', AbsentContrller.getAllAbsent);
    router.post('/absent/sendmail/delete/:id', AbsentContrller.deleteAbsent);
    router.get('/absent/sendmail/:id/verify/:token', AbsentContrller.absentVerify);
    router.get('/absent/total/:id', AbsentContrller.getDataTotal);

    return app.use('/', router)
}
module.exports = webRouter;
