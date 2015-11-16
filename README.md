# logr
Customisable logger with log level filter and tagged messages.

## Usage

All logging methods works just like [`util.format()`](https://nodejs.org/api/util.html#util_util_format_format)

    var Logger = require('logr');
    var logger = new Logger();
    logger.error('message')
    logger.warn('message')
    logger.info('prints to stdout');
    logger.log('alias for info');

You can override how and where the logger prints by setting `logger.stdout` and
`logger.stderr`. It is expected to be a function called with a single parameter
`msg`.

## Examples with writing errors to file

    // Don't print anything more verbose than 'warn'
    var logger = new Logger('warn');
    var fs = require('fs');

    logger.stderr = function (line) {
      fs.appendFile('error.log', line + '\n');

      // And print to stdout instead of stderr
      Logger.prototype.stdout(line);
    };

    logger.log('This message will be ignored completely');
    logger.error('However, this would print to stdout and file')
