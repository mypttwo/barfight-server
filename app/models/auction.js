'use strict'

const mongoose = require('../db');

let auctionSchema = new mongoose.Schema({
    barAdminId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'BarAdmin'
    },
    name : {
        type : String
    },
    startBid : {
        type : Number
    },
    bidStep : {
        type : Number
    },
    prize : {
        type : String
    },
    bar : {
        type : String
    },
    start : {
        type : Date
    },
    end : {
        type : Date
    },    
    isFulfilled: {
        type: Boolean,
        default: false
    },    
    isDeclared: {
        type: Boolean,
        default: false
    }                
});

mongoose.model('Auction', auctionSchema);

module.exports = {
    Auction : mongoose.model('Auction'),
    auctionSchema
}
