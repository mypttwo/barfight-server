'use strict'

const express = require('express')();
const cors = require('cors');
const http = require('http');

const logger = require('./logger');
const socketServer = require('./socketServer');

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const registrationController = require('./controllers/registrationController');

const adminLoginController = require('./controllers/adminLoginController');

const barAdminRegistrationController = require('./controllers/barAdminRegistrationController');
const barAdminController = require('./controllers/barAdminController');
const barAdminLoginController = require('./controllers/barAdminLoginController');

const auctionRegistrationController = require('./controllers/auctionRegistrationController');
const auctionController = require('./controllers/auctionController');

const bidController = require('./controllers/bidController');


express.use(cors());
express.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`); 
    next();
});

express.use('/users', userController);
express.use('/register', registrationController);
express.use('/login',loginController);

express.use('/adminlogin',adminLoginController);

express.use('/barAdmins', barAdminController);
express.use('/registerBarAdmin', barAdminRegistrationController);
express.use('/barAdminLogin',barAdminLoginController);

express.use('/createauction',auctionRegistrationController);
express.use('/auctions',auctionController);

express.use('/bids',bidController);


express.get('/', (req, res) => res.send('You need a drink!'));

const httpServer = http.createServer(express);
logger.info('httpServer set up');

socketServer.setup(httpServer);
logger.info('socketServer set up');

module.exports = httpServer;

