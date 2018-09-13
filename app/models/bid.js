'use strict'

const mongoose = require('../db');

let bidSchema = new mongoose.Schema({
    auctionId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'BarAdmin'
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    value : {
        type : Number
    },
    time : {
        type : Date
    }                
});

mongoose.model('Bid', bidSchema);

module.exports = {
    Bid : mongoose.model('Bid'),
    bidSchema
}
