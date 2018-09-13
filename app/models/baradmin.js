'use strict'

const mongoose = require('../db');

let barAdminSchema = new mongoose.Schema({
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
    },
    phone : {
        type : String
    },
    bar : {
        type : String
    },        
});

mongoose.model('BarAdmin', barAdminSchema);

module.exports = {
    BarAdmin : mongoose.model('BarAdmin'),
    barAdminSchema
}
