const Reminder = require("../models/reminder");
const bcrypt = require("bcrypt");
const crypto = require("crypto")
const Joi = require("joi")
require("dotenv").config();
const nodemailer = require('nodemailer');

const validation = (data) => {
    const schema = Joi.object({
        token: Joi.string().required(),
        reminderMsg: Joi.string().required().label("reminderMsg"),
        reminderAt: Joi.string().required().label("reminderAt"),
        toEmail: Joi.string().email().required().label("toEmail"),
    });
    return schema.validate(data);
}

const sendEmail = async (toEmail, msg, note) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
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
        to: toEmail,
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


const getAllReminder = async (req, res) => {

    const SetInterval = setInterval(async () => {
        try {
            const reminderList = await Reminder.find({ tokenId: req.params.token });
            if (reminderList) {
                reminderList.forEach(async (reminder) => {
                    if (!reminder.isReminded) {
                        const now = new Date();
                        if ((new Date(reminder.remindAt) - now) <= 0) {
                            // reminder send email
                            const toEmail = reminder.toEmail;
                            const msg = reminder.reminderMsg;
                            const note = 'tình trạng tiến độ chậm trễ!!!';
                            sendEmail(toEmail, msg, note);
                            await Reminder.findByIdAndUpdate(reminder._id, { isReminded: true });
                            console.log("Email reminder done send");
                        }

                    }
                });
            }

        } catch (err) {
            console.log(err)
        }

    }, 30000);

    const reminder = await Reminder.find({ tokenId: req.params.token });
    if (reminder) {
        res.status(200).json(reminder);
    }
    else {
        res.status(304).send([]);
        console.log("not reminder")
    };
};

const addReminder = async (req, res) => {

    try {
        const data = validation(req.body);
        const { reminderMsg, remindAt, toEmail, token } = req.body;
        const reminder = new Reminder({
            tokenId: req.body.token,
            reminderMsg,
            remindAt,
            isReminded: false,
            toEmail
        });
        await reminder.save();
        res.status(201).json({ msg: "add success" })
    } catch (err) {
        res.status(501).send(err)
        console.log(err)
    }

}
const deleteRemider = async (req, res) => {
    const reminder = await Reminder.findByIdAndDelete({ _id: req.body.id })
    if (!reminder) {
        console.log("reminder empty");
        res.status(204).json({ msg: "please add reminder" })
    }
    if (reminder) {
        res.send(reminder);
    }
};

module.exports = { getAllReminder, addReminder, deleteRemider }

