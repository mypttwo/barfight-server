'use strict'

const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
const logger = require('../logger');
const BarAdmin = require('../models/baradmin').BarAdmin;
const verifyToken = require('../auth').verifyAuthToken;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

const verifyUser = function(req, res, next){
    if(req.userId != req.params.id){
        logger.error(`User ${req.userId} is attempting to modify data of user ${req.params.id}`);
        return res.status(403).send({auth : false, message : 'verification failed'});
    }
    next();
}

router.get('/',  (req, res) => {
    BarAdmin.find().select({ password: 0 }).then((data) => {
        return res.status(200).send(data);
    }).catch((error) => {
        logger.error(`${error}`);
        return res.status(500).send('Server Error');        
    })
});

router.get('/:id',  (req, res) => {
    BarAdmin.findById(req.params.id).select({ password: 0 }).then((data) => {
        return res.status(200).send(data);
    }).catch((error) => {
        logger.error(`${error}`);
        return res.status(500).send('Server Error');        
    })
});

router.put('/:id', verifyToken, verifyUser, (req, res) => {

    let hashedPassword = bcryptjs.hashSync(req.body.password);
    let barAdmin = {
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    };

    BarAdmin.findByIdAndUpdate(req.params.id, barAdmin, {new : true}).select({password : 0}).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
        res.status(500).send();
    });
});

router.delete('/:id', verifyToken, verifyUser, (req, res) => {
    BarAdmin.findByIdAndRemove(req.params.id, (error, data) => {
        if(error){
            logger.error(`Could not delete BarAdmin ${data._id} ${error}`);
            res.status(500).send();
        }
        logger.info(`Deleted BarAdmin ${req.params.id}`);
        res.status(200).send();
    });
});

module.exports = router;



