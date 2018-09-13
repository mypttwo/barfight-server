'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const logger = require('../logger');
const User = require('../models/user').User;
const registrationEmailService = require('../utils/registrationEmail');
const {url} = require('../config');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));


router.post('', (req, res) => {
    if(!req.body.password){
        return res.status(405).send();
    }
    if(!req.body.name){
        return res.status(405).send();
    }
    if(!req.body.email){
        return res.status(405).send();
    }

    let hashedPassword = bcryptjs.hashSync(req.body.password);

    User.create({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    }).then((data) => {
        registrationEmailService(req.body.email, 'Welcome To Bar Bidder!', `${url}/verify/${data.id}`)
        return res.status(200).send();
    }).catch((error) => {
        //https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.err
        if(error.code == 11000){
            logger.error(`${error}`);
            return res.status(406).send();
        }
        return res.status(500).send();
    });

})

module.exports = router;