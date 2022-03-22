# everloggy

A nodejs logger for just about everything.

## Motivation

`everloggy` is designed to be a simple and universal logging library with
support for multiple transports. A transport is essentially a storage device
for your logs. Each `everloggy` logger can have multiple transports (see:
[Transports]) configured at different levels (see: [Logging levels]). For
example, one may want error logs to be stored in a persistent remote location
(like a database), but all logs output to the console or a local file.

`everloggy` aims to decouple parts of the logging process to make it more
flexible and extensible. Attention is given to supporting flexibility in log
formatting (see: [Formats]) & levels (see: [Using custom logging levels]), and
ensuring those APIs decoupled from the implementation of transport logging
(i.e. how the logs are stored / indexed, see: [Adding Custom Transports]) to
the API that they exposed to the programmer.

## Usage

The recommended way to use `everloggy` is to create your own logger. The
simplest way to do this is using `winston.createLogger`:

``` js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
```

You may also log directly via the default logger exposed by
`require('winston')`, but this merely intended to be a convenient shared
logger to use throughout your application if you so choose.
