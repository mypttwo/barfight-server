'use strict'

const jwt = require('jsonwebtoken');

const secret = require('./config').secret;
const logger = require('./logger');

const generateAuthToken = (userId) => {
    return jwt.sign({id : userId}, secret, {
        expiresIn : 86400
    });    
}

const verifyAuthToken = (req, res, next) => {
    let authToken = req.headers['x-access-token'];
    if(!authToken){
        logger.error('authToken is not avilable in request');
        return res.status(403).send('authToken is not avilable in request');
    }
    jwt.verify(authToken, secret, (error, data) => {
        if(error){
            logger.error('authToken is not valid');
            return res.status(403).send('authToken is not valid');
        }
        logger.info(`authToken validated for data ${data}`);
        req.userId = data.id;
        next();
    })
}

module.exports = {
    generateAuthToken,
    verifyAuthToken
}