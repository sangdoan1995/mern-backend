'use strict';
const nodemailer = require("nodemailer");
const mailconfig = require("../config/mailConfig");

require('dotenv').config()

module.exports = async (toemail, subject, url) => {
	
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
		to: toemail,
		subject: subject,
		text: url,
	};

	let info = await transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log("Error send mail " + err);
		} else {
			console.log("Send Mail Success " + data.messageId)
		}
	})
	console.log(`Message sent `, mailOptions)


};
