'use strict'

const mongoose = require('../db');

let userSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        index : true
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String
    }
});

mongoose.model('User', userSchema);

module.exports = {
    User : mongoose.model('User'),
    userSchema
}
