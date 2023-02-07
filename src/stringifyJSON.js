// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

// I - an object? a value that's either stringifiable or not
// O - a string
// C - none.
// E - should not stringify invalid inputs

var stringifyJSON = function (obj) {

  // create result as empty string
  var result = '';
  if (obj === undefined || typeof obj === 'function') {
    result = undefined;
  }
  switch (typeof (obj)) {
  case 'object':
    if (obj !== null) {
        // if array
      if (Array.isArray(obj)) {
        result = '[';
        obj.forEach(function (value, index) {
          if (typeof value === 'function' || value === undefined) {
            result = result + null;
          } else {
            result = result + stringifyJSON(value);
          }
          if (index < (obj.length - 1)) {
            result = result + ',';
          }
        });
        result = result + ']';
      } else {
        result = '{';
        Object.keys(obj).forEach(function (key, index) {
          var currentValue = obj[key];
          var previousValue = obj[Object.keys(obj)[index - 1]];
          if (previousValue !== undefined &&
              (currentValue !== undefined && typeof currentValue !== 'function')) {
            result = result + ',';
          }
          if (!(typeof currentValue === 'function' || currentValue === undefined)) {
            result = result + stringifyJSON(key) + ':' + stringifyJSON(obj[key]);
          }
        });
        result = result + '}';
      }
    } else {
      result += 'null';
    }
    break;

  case 'number':
    result = result + obj;
    break;

  case 'boolean':
    result = result + obj;
    break;

  case 'string':
    result = '"' + obj + '"';
  }
  return result;
};

//   // EDGE CASE
//   // if item is invalid input (functions or undefined)
//   // do not stringify
//   // return 'null' if found in array
//   if (obj === undefined || typeof obj === 'function') {
//     result = undefined;
//   }

//   // BASE CASE
//   // if obj is string, number, or boolean
//   // add obj to result string
//   if (typeof obj === 'number' || typeof obj === 'boolean') {
//     result = result + obj;
//   }
//   if (typeof obj === 'string') {
//     result = '"' + obj + '"';
//   }

//   // RECURSION
//   // if item is array (not object)
//   // add opening bracket to result
//   // iterate over array, for each value
//   // add stringified value to result
//   // if next index exists,
//   // add comma
//   // add closing brack to result
//   if (Array.isArray(obj)) {
//     result = '[';
//     obj.forEach(function (value, index) {
//       if (typeof value === 'function' || value === undefined) {
//         result = result + null;
//       } else {
//         result = result + stringifyJSON(value);
//       }
//       if (index < (obj.length - 1)) {
//         result = result + ',';
//       }
//     });
//     result = result + ']';
//   }
//   // if item is object (not array)
//   // edge case: if obj is null
//   // return string version of null
//   // add opening curly brace to result
//   // iterate: for each key
//   // add stringified key and value to result
//   // if next key exists,
//   // add comma
//   // add closing curly brace to result
//   if (typeof obj === 'object' && !Array.isArray(obj)) {
//     if (obj === null) {
//       return 'null';
//     }
//     result = '{';
//     Object.keys(obj).forEach(function (key, index) {
//       var currentValue = obj[key];
//       var previousValue = obj[Object.keys(obj)[index - 1]];
//       if (previousValue !== undefined &&
//         (currentValue !== undefined && typeof currentValue !== 'function')) {
//         result = result + ',';
//       }
//       if (typeof currentValue === 'function' || currentValue === undefined) {
//         currentValue = undefined;
//       } else {
//         result = result + stringifyJSON(key) + ':' + stringifyJSON(obj[key]);
//       }
//       // if (typeof currentValue === 'function' || currentValue === undefined) {
//       //   currentValue = undefined;
//       // } else {
//       //   result = result + stringifyJSON(key) + ':' + stringifyJSON(obj[key]);
//       // }

//     });
//     result = result + '}';
//   }

//   // return result
//   return result;

// };
