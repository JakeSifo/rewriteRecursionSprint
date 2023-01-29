// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
/**
 * Recursive version of .getElementsByClassName.
 *
 * Only elements with ALL of the classNames specified are selected.
 *
 * @param {String} className the target class name
 * @param {*} lastChild the child of the last element
 * @returns {Array} Return array of elements with targeted className
 */
var getElementsByClassName = function (className, lastMeChild) {
  // NOTE: Adding another parameter can help you solve this exercise!

  // your code here
  var me = document.body;
  if (lastMeChild) {
    me = lastMeChild;
  }
  var myClassArray = $(me.classList);
  var myChildren = $(me.childNodes);
  var matchingElements = [];

  // Detect classes with multiple Strings as class name ex: class="red apple"
  var classNames = '';
  for (var myClassName = 0; myClassName < myClassArray.length; myClassName++) {
    classNames += ' ' + myClassArray[myClassName] + ' ';
  }

  // In order to suppert multiStr classNames add space at end of className to filter other strings
  className += ' ';
  if (classNames.includes(className)) {
    className = className.replace(/.$/, '');
    // I have the target in my class
    matchingElements.push(me);
  } else {
    className = className.replace(/.$/, '');
  }
  // Check if I have children
  for (var child = 0; child < myChildren.length; child++) {
    matchingElements.push(getElementsByClassName(className, myChildren[child]));
  }
  //Flatten the array so we hae a neat array of depth 1
  return matchingElements.flat(Infinity);
  console.log('------------------------------\n');
  console.log($(me));
  console.log(myClassArray);
  console.log(myChildren);
  console.log(matchingElements);
};