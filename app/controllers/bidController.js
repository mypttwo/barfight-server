'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../logger');
const Bid = require('../models/bid').Bid;
const Auction = require('../models/auction').Auction;
const {url} = require('../config');
const {isAuctionLive,auctionLiveStatus,getMaxBid} = require('../utils/auctionUtils');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));

router.post('', (req, res) => {
    if(!req.body.userId){
        return res.status(405).send();
    }
    if(!req.body.auctionId){
        return res.status(405).send();
    }
    if(!req.body.value){
        return res.status(405).send();
    }

    Auction.findById(req.body.auctionId).then((auction) => {
        let isAlive = auctionLiveStatus(auction);
        //if(isAlive)        
        if(true)  {  
            getMaxBid(req.body.auctionId).then((maxBid) => {
                let maxBidValue = auction.startBid;
                if(maxBid){
                    maxBidValue = maxBid.value;
                }
                if(maxBidValue < req.body.value){
                    return Bid.create({
                         auctionId : req.body.auctionId,
                         userId : req.body.userId,
                         value : req.body.value,
                         time : new Date()
                     }).then((data) => {
                         return res.status(200).send();
                     }).catch((error) => {
                         return res.status(500).send('Something went wrong :(! Please try again.');
                     });
                 } else {
                     return res.status(420).send('Bid too low');
                 }
            })
        } else {
            return res.status(421).send('Too Late! Auction is over.');
        }
    });
})


module.exports = router;