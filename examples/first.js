var Logger = require('./logger');
var fs = require('fs');

function write(msg) {
  var timestamp = new Date().toLocaleTimeString('en-US', {hour12: false});
  var log = timestamp + ' | ' + msg;

  // Append message to file
  fs.appendFile('debug.log', log + '\n');

  // Print to stdout as well
  Logger.prototype.stdout(log);
}

var custom = new Logger('verbose');
custom.stdout = write;
custom.stderr = write;

module.exports = custom;
