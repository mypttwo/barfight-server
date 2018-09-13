'use strict'

const bcryptjs = require('bcryptjs');
const {db} = require('../config');
const {Admin} = require('../models/admin');

console.log(`setting up administrators in ${db}`);

let createAdmin = (name, email, password) => {
    let hashedPassword = bcryptjs.hashSync(password);

    Admin.create({
        name : name,
        email : email,
        password : hashedPassword
    }).then((data) => {
        console.log(`created user ${data.name}`);
        process.exit(0);
    }).catch((error) => {
        //https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.err
        console.error(`Could not create admin ${name} Error : ${error}`);
        process.exit(0);
    });
}

createAdmin('admin1', 'admin1@gmail.com', 'password');
createAdmin('admin2', 'admin2@gmail.com', 'password');