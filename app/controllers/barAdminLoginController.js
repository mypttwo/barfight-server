'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const logger = require('../logger');
const BarAdmin = require('../models/baradmin').BarAdmin;
const generateAuthToken = require('../auth').generateAuthToken;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

router.post('', (req, res) => {
    if(!req.body.email){
        return res.status(400).send();
    }
    if(!req.body.password){
        return res.status(400).send();
    }
    BarAdmin.findOne({email : req.body.email}).then((data) => {
        if(!data){
            return res.status(404).send({auth : false, message : 'Auth Failed'});
        }
        let passwordIsValid = bcryptjs.compareSync(req.body.password, data.password);
        if(passwordIsValid){
            let token  = generateAuthToken(data._id);
            return res.status(200).send({auth : true, token, adminId : data._id});
        } else {
            return res.status(403).send({auth : false, message : 'Bad password'});
        }
    }).catch((error) => {
        return res.status(500).send({auth : false, message : 'Auth Failed'});
    })
});

router.post('/newPassword', (req, res) => {
    if(!req.body.email){
        return res.status(400).send();
    }
    
    let newPassword = "" + Math.floor(100000 + Math.random() * 900000);
    let hashedPassword = bcryptjs.hashSync(newPassword);

    BarAdmin.findOneAndUpdate({email : req.body.email}, {$set:{password: hashedPassword}}, {new: true}).then((data) => {
        if(!data){
            return res.status(404).send({auth : false, message : 'Auth Failed'});
        }
        registrationEmailService(data.email, 'New Password', `Your new password is ${newPassword}. Please change it when you next login. <p> Keep Partying! </p>`);
        return res.status(200).send();
    }).catch((error) => {
        return res.status(500).send({auth : false, message : 'Auth Failed'});
    })
});

module.exports = router;
