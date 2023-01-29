// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

/**
 *
 * @param {*} obj The value to convert to a JSON string.
 */
var stringifyJSON = function (obj) {
  // your code goes here
  var toReturn;
  switch (typeof (obj)) {
  case 'object':
    toReturn = '';
    if (obj !== null) {
      if (Array.isArray(obj)) {
          // If Array
        toReturn += '[';
        if (obj.length > 0) {
          for (var item in obj) {
            var toHandle = stringifyJSON(obj[item]);
            toReturn += toHandle === undefined ? null : toHandle;
            toReturn += ',';
          }
          toReturn = toReturn.substring(0, toReturn.length - 1);
        }
        toReturn += ']';
      } else {
          // If Object
        toReturn += '{';
        if (Object.keys(obj).length) {
          var myLength = Object.keys(obj).length;
          var isGood = true;
          for (var key in obj) {
            var toHandle = stringifyJSON(obj[key]);
            if (toHandle !== undefined) {
              toReturn += '"' + key + '":' + toHandle + ',';
            }
            myLength--;
          }
          if (isGood) {
            toReturn = toReturn.substring(0, toReturn.length - 1);
          }
        }
        if (toReturn) {
          toReturn += '}';
        } else {
          toReturn += '{}';
        }
      }
    } else {
        // If null
      toReturn += 'null';
    }
    break;
  case 'boolean':
    toReturn = '';
    toReturn += '' + obj;
    break;
  case 'number':
    toReturn = '';
    toReturn += '' + obj;
    break;
  case 'bigint':
    toReturn = '';
    toReturn += '' + obj;
    break;
  case 'string':
    toReturn = '';
    toReturn += '"' + obj + '"';
    break;
  case 'symbol':
    toReturn = '';
    toReturn += '' + obj;
    break;
  }


  return toReturn;
};
