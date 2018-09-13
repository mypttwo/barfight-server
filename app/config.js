'use strict'

require('dotenv').config();

const port = process.env.PORT;
const db = process.env.DB;
const secret = process.env.SECRET;
const email = process.env.EMAIL;
const emailpwd = process.env.EMAILPWD;
const url = process.env.URL;

module.exports = {
    port,
    db,
    secret,
    email,
    emailpwd,
    url
}