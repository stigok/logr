var util = require('util');
var helpers = require('./helpers.js');

// Log levels
// error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
var levels = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];
var defaultLevel = 2;

var Logger = function (level) {
  this.level = parseLevel(level);
};

Logger.levels = levels;
Logger.defaultLevel = 2;

function parseLevel(level) {
  var tmp;

  // Determine what log level was wanted
  if (typeof level === 'number') {
    tmp = level;
  } else if (typeof level === 'string') {
    tmp = levels.indexOf(level);
  } else {
    tmp = defaultLevel;
  }

  if (tmp < 0 || tmp >= levels.length) {
    tmp = defaultLevel;
  }

  return tmp;
}

Logger.prototype._log = function (level) {
  level = parseLevel(level);

  // Don't log any more than we want
  if (level > this.level) {
    return;
  }

  // Take all args but the first one and forward to util.format
  var args = Array.prototype.slice.call(arguments, 1);
  var message = util.format.apply(null, args);

  switch (level) {
    case 0:
    case 1:
      this.stderr(message);
      break;
    default:
      this.stdout(message);
      break;
  }
};

Logger.prototype.stdout = function (msg) {
  console.log(msg);
};

Logger.prototype.stderr = function (err) {
  console.error(err);
};

Logger.prototype.error = function () {
  var args = helpers.prependArguments(levels.indexOf('error'), arguments);
  this._log.apply(this, args);
};

Logger.prototype.warning = function () {
  var args = helpers.prependArguments(levels.indexOf('warn'), arguments);
  this._log.apply(this, args);
};

Logger.prototype.info = function () {
  var args = helpers.prependArguments(levels.indexOf('info'), arguments);
  this._log.apply(this, args);
};

Logger.prototype.verbose = function () {
  var args = helpers.prependArguments(levels.indexOf('verbose'), arguments);
  this._log.apply(this, args);
};

// Alias for Logger.info
Logger.prototype.log = function () {
  this.info.apply(this, arguments);
};

// Alias for Logger.warning
Logger.prototype.warn = function () {
  this.warning.apply(this, arguments);
};

module.exports = Logger;
