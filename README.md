## Usage

You can override where the logger prints by setting `logger.stdout` and
`logger.stderr`. It is expected to be a function called with a single parameter
`msg`

## Examples
### Write to file

    var logger = new Logger();
    logger.stderr = function (line) {
      fs.appendFile('error.log', line);
    }

### Write a debug log with timestamps and error level

    var logger = new Logger();
    function write (msg) {
      Logger.prototype.stdout.call(this, '[%d] %s', Date.now().getTime(), msg);
    }

    logger.stdout = write;
    logger.stderr = write;

    logger.info('Hello, info!')
