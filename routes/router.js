const express = require('express');
const controller = require("../controller/UserController");
const authController = require("../controller/AuthController.js");
const TodoController = require("../controller/TodoController.js");
const AbsentController = require("../controller/AbsentController.js")
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

    router.post('/absent/create', AbsentController.createAbsentUser);
    router.get('/absent/sendmail/:id', AbsentController.getSendUser);
    router.post('/absent/sendmail/:id', AbsentController.sendMail);
    router.get('/absent/list', AbsentController.getAllAbsent);
    router.post('/absent/sendmail/delete/:id', AbsentController.deleteAbsent);
    router.get('/absent/sendmail/:id/verify/:token', AbsentController.absentVerify);
    router.get('/absent/total/:id', AbsentController.getDataTotal);

    router.get('/absent/totaluser/:id', AbsentController.getTotalUser);
    router.post('/absent/leavedate/:id', AbsentController.postFreeDate);
    router.post('/absent/totaldate/:id', AbsentController.postTotalDate);

    return app.use('/', router)
}
module.exports = webRouter;
