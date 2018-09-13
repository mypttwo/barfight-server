'use strict'

const nodemailer = require('nodemailer');
const {email, emailpwd} = require('../config');

const registrationEmailService = (to, subject, text) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: email,
          pass: emailpwd
        }
      });

    let mailOptions = {
        from: email,
        to: to,
        subject: subject,
        html : `<html><body> ${text} <body></html>`
      };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = registrationEmailService;