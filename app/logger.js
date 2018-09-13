'use strict';

const fs = require("fs");

const winston = require("winston");
require("winston-daily-rotate-file");

const dir = "./logs";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const transport = new winston.transports.DailyRotateFile({
  filename: "logs/server-%DATE%.log",
  dirname: "logs/",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d"
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports : [
      new (winston.transports.Console)({'timestamp':true}),
        transport
    ]
})

module.exports = logger;
