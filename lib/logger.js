"use strict";

const { createLogger, format, transports } = require("winston"); // Universal logging library

const { combine, timestamp, label, printf } = format;

// Custom Winston Format
const customWinstonFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

exports.logger = function (labelName, filename) {
  return createLogger({
    format: combine(
      label({ label: labelName }),
      timestamp(),
      customWinstonFormat
    ),
    transports: [
      new transports.Console(), // Log on Console
      new transports.File({ filename: filename }), // Log on file (ex. combined.log)
    ],
  });
};
