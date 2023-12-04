const { AbsentDb } = require('../models/absent');
const { TokenAbsentSchema } = require('../models/TokenAbsent');
const cryto = require('crypto');
const Joi = require('joi');
const nodemailer = require('nodemailer')
const mailconfig = require('../config/mailConfig');
const { TrustProductsEntityAssignmentsContextImpl } = require('twilio/lib/rest/trusthub/v1/trustProducts/trustProductsEntityAssignments');
require('dotenv').config();

// const validation = (data) => {
//     const schema = Joi.object({
//         staffName: Joi.string().required().label("Staff Name"),
//         daysleave: Joi.number().required().label("Day Leave"),
//         daysfrom: Joi.date().timestamp().required().label("Day From"),
//         daysto: Joi.date().timestamp().required().label("Day To"),
//         description: Joi.string().required().label('description'),
//     });
//     return schema.validate(data);
// };


const sendEmail = async (msg, note) => {
    let transporter = nodemailer.createTransport({
        host: mailconfig.HOST,
        port: mailconfig.PORT,
        secure: false,
        auth: {
            user: 'sangdoan123456789@gmail.com',
            pass: 'grntmhbgrxbcfool'
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    let mailOptions = {
        from: '"📧 ADMIN_KHDT_MOBIFONE 📧 "<sangdoan123456789@gmail.com>',
        to: 'sang.dd@mobifone.vn',
        subject: msg,
        text: note,
    };
    let info = await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log("Error send mail " + err);
        } else {
            console.log("Send Mail Success " + data.messageId)
        }
    })
    console.log(`Message sent `, mailOptions)
}

const createAbsentUser = async (req, res) => {
    try {
        const { crud } = req.body;
        const absent = await new AbsentDb({ ...req.body }).save()
        res.status(200).send('success')

    } catch (err) {
        res.status(504).send({ msg: err.message })
    }
}
const getSendUser = async (req, res) => {
    try {
        const data = await AbsentDb.findOne({ id: req.params.id })
        res.send(data)
    } catch (err) {
        res.status(504).send({ err: err.message })
    }

}
const sendMail = async (req, res) => {
    try {
        const user = await AbsentDb.findOne({ id: req.params.id });
        if (user) {
            const tokenabsent = await new TokenAbsentSchema({
                userId: user._id,
                token: cryto.randomBytes(32).toString('hex')
            }).save()

            const url = `${process.env.BASE_URL}absent/sendmail/${user._id}/verify/${tokenabsent.token}`
            const note = `"please verify on leave " ${url}`;
            const msg = user.staffName + " request on leave"
            const send = await sendEmail(msg, note);
            console.log('email send to manager');
            res.status(201).send({
                msg: "send success",
                info: send
            })

        }

    } catch (err) {
        console.log(err)
    }
}

const absentVerify = async (req, res) => {
    try {
        const absents = await AbsentDb.findOne({ _id: req.params.id });
        if (!absents) return res.status(400).send({ message: "Invalid link" });

        const token = await TokenAbsentSchema.findOne({
            userId: absents._id,
            token: req.params.token,
        });
        if (!token) {
            return res.status(400).send({ message: "Invalid link" });
        } else {
            await AbsentDb.findByIdAndUpdate(absents._id, { verified: true });
            await token.deleteOne();

            return res.status(200).send({ message: "Email verified successfully" });
        }

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", err: error.message });
    }
}

const getAllAbsent = async (req, res) => {
    try {
        const dataGet = await AbsentDb.find();
        res.status(200).send(dataGet)
    } catch (err) {
        console.log(err)
    }
}
const deleteAbsent = async (req, res) => {
    try {
        const DataAbsent = await AbsentDb.findOneAndDelete({ id: req.params.id });
        res.status(200).send({ msg: "Delete form success" })
    } catch (err) {
        console.log(err)
    }
}
module.exports = { createAbsentUser, getSendUser, sendMail, getAllAbsent, deleteAbsent, absentVerify }