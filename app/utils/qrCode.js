'use strict'

let registrationEmailService = require('./registrationEmail');

const QRCode = require('qrcode');

QRCode.toString('http://www.google.com', {type: 'svg'}, function (err, string) {
  if (err) {
    throw err;
  }
  console.log(string)
  registrationEmailService('mypt.one@gmail.com', 'Prize', string);
})
  