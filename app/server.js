'use strict'

const logger = require('./logger');
const {port} = require('./config');
const httpServer = require('./httpServer');
require('./db');

httpServer.listen(port, (error) => {
    if(error){
        return logger.error('Error while starting...', error);
    }
    logger.info(`server started at port : ${port}`);
})