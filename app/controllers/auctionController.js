'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const logger = require('../logger');
const Auction = require('../models/auction').Auction;
const User = require('../models/user').User;
const verifyToken = require('../auth').verifyAuthToken;
const registrationEmailService = require('../utils/registrationEmail');
const {getMaxBid,isAuctionLive,buildAuctionList} = require('../utils/auctionUtils');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

const verifyUser = function(req, res, next){
    if(req.userId != req.params.id){
        logger.error(`User ${req.userId} is attempting to modify data of user ${req.params.id}`);
        return res.status(403).send({auth : false, message : 'verify_failed'});
    }
    next();
}

router.get('/', verifyToken, (req, res) => {
    Auction.find({barAdminId : req.userId}).then((data) => {
        let auctionPromiseList = buildAuctionList(data);
        Promise.all(auctionPromiseList).then((auctionList) => {
            return res.status(200).send(auctionList);
        });
    }).catch((error) => {
        logger.error(`${error}`);
        return res.status(500).send('Server Error');        
    })
});

router.get('/all', (req, res) => {
    Auction.find().then((data) => {
        let auctionPromiseList = buildAuctionList(data);
        Promise.all(auctionPromiseList).then((auctionList) => {
            return res.status(200).send(auctionList);
        });
    }).catch((error) => {
        logger.error(`${error}`);
        return res.status(500).send('Server Error');        
    })
});

router.post('/fulfill', (req, res) => {
    if(!req.body.auctionId){
        return res.status(405).send();
    }
    Auction.findByIdAndUpdate(req.body.auctionId, 
        {$set: {isFulfilled : true}}, {new : true})
        .then((data) => {
            res.status(200).send(data);
        }).catch((error) => {
        res.status(500).send();
    });
})

router.post('/declare', (req, res) => {
    if(!req.body.auctionId){
        return res.status(405).send();
    }
    let auction, bid;
    let winCode = Math.floor(100000 + Math.random() * 900000);
    Auction.findByIdAndUpdate(req.body.auctionId, 
        {$set: {isDeclared : true}}, {new : true})
        .then((data) => {
            auction = data; 
            res.status(200).send(data);
            return getMaxBid(req.body.auctionId);
        }).then((maxBid) => {
            bid = maxBid; 
            return User.findById(maxBid.userId);
        }).then((user) => {
            console.log('auction', auction);
            console.log('maxBid', bid);
            console.log('winner', user);
            registrationEmailService(user.email, 'Congratulations!', `You have won ${auction.prize} at ${auction.bar} in the game that ran from ${(new Date(auction.start)).toLocaleString()} to ${(new Date(auction.end)).toLocaleString()}. <p>To claim it you will need to pay Rs.${bid.value} and submit this Code : ${winCode} to the Manager.</p> <p> Keep Partying! And Play again!</p>`);
        })
        .catch((error) => {
            logger.error(error);
            res.status(500).send();
    });
})

router.get('/:id',  (req, res) => {
    Auction.findById().then((data) => {
        return res.status(200).send(data);
    }).catch((error) => {
        logger.error(`${error}`);
        return res.status(500).send('Server Error');        
    })
});

router.put('/:id', verifyToken, (req, res) => {
    Auction.findByIdAndUpdate(req.params.id, req.body, {new : true}).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send();
    });
});

router.delete('/:id', verifyToken, verifyUser, (req, res) => {
    Auction.findByIdAndRemove(req.params.id, (error, data) => {
        if(error){
            logger.error(`Could not delete Auction ${data._id} ${error}`);
            res.status(500).send();
        }
        logger.info(`Deleted Auction ${req.params.id}`);
        res.status(200).send();
    });
});

module.exports = router;



