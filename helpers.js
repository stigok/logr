// Takes function arguments obj and returns new array with additional arg prepended
module.exports.prependArguments = function (additionals, existing) {
  // slice to make copy of array as it's passed by reference
  var args = (Array.isArray(additionals)) ? additionals.slice(0) : [additionals];

  for (var i = 0; i < existing.length; i++) {
    args.push(existing[i]);
  }

  return args;
};
