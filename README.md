# logr [![Build Status](https://travis-ci.org/stigok/logr.svg)](https://travis-ci.org/stigok/logr)
Customisable logger with log level filter and tagged messages.

## Usage

All logging methods works just like [`util.format()`](https://nodejs.org/api/util.html#util_util_format_format)

    var Logger = require('logr');
    var logger = new Logger();

    logger.error('prints to stderr')
    logger.warn('prints to stderr')
    logger.info('prints to stdout');
    logger.log('alias for info');
    logger.verbose('prints to stdout')
    logger.debug('prints to stdout')
    logger.silly('prints to stdout')

You can override how and where the logger prints by setting `logger.stdout` and
`logger.stderr`. It is expected to be a function called with a single parameter
`msg`.

### Examples

#### Write errors to file

    // Ignore anything but warn and error
    var logger = new Logger('warn');
    var fs = require('fs');

    logger.stderr = function (line) {
      fs.appendFile('error.log', line + '\n');

      // And print to stdout instead of stderr
      Logger.prototype.stdout(line);
    };

    logger.log('This message will be ignored completely');
    logger.error('However, this would print to stdout and file')
