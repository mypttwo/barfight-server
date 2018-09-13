'use strict'

const mongoose = require('mongoose');

const db  = require('./config').db;
const logger = require('./logger');



mongoose.connect(db)
.then(() => {
    logger.info(`Connected to db ${db}`)
})
.catch((error) => {
    logger.error(`Server is shutting down. Could not connect to db ${db} ${error}`);
    process.exit(0);
})

module.exports = mongoose;
