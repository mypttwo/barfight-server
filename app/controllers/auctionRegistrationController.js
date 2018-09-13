'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../logger');
const Auction = require('../models/auction').Auction;
const {url} = require('../config');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));


router.post('', (req, res) => {
    if(!req.body.name){
        return res.status(405).send();
    }
    if(!req.body.startBid){
        return res.status(405).send();
    }
    if(!req.body.bidStep){
        return res.status(405).send();
    }
    if(!req.body.prize){
        return res.status(405).send();
    }
    if(!req.body.bar){
        return res.status(405).send();
    }  
    if(!req.body.bar){
        return res.status(405).send();
    } 
    if(!req.body.start){
        return res.status(405).send();
    }         
    if(!req.body.end){
        return res.status(405).send();
    }          

    Auction.create({
        barAdminId : req.body.barAdminId,
        name : req.body.name,
        startBid : req.body.startBid,
        bidStep : req.body.bidStep,
        bar : req.body.bar,
        prize : req.body.prize,
        start : req.body.start,
        end: req.body.end

    }).then((data) => {
        return res.status(200).send();
    }).catch((error) => {
        //https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.err
        return res.status(500).send();
    });

})

module.exports = router;