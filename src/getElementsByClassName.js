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
 * @param {HTMLElement} lastMeChild the child of the last recursive element
 * @returns {Array} Return array of elements with the targeted className
 */
var getElementsByClassName = function (className, lastMeChild) {
  var me;
  if (lastMeChild) {
    me = lastMeChild;
  } else {
    me = document.body;
  }
  var myClassArray = me.classList;
  var myChildren = me.childNodes;
  var matchingElements = [];
  // Detect classes with multiple Strings as class name ex: class="red apple"
  var classNames = '';
  if (myClassArray !== undefined) {
    for (var myClassName = 0; myClassName < myClassArray.length; myClassName++) {
      classNames += ' ' + myClassArray[myClassName];
    }
  }
  classNames += ' ';
  // In order to support multiStr classNames add space at beginning
  // and end of className to filter strings conatining same chars
  // ex: 'targetClassN ameButNotQuite' or 'ButNotQuitetargetClassN ame'
  var uniqClassName = ' ' + className + ' ';
  if (classNames.includes(uniqClassName)) {
    // I have the target in my class
    matchingElements.push(me);
  }
  // Check if I have children
  if (myChildren !== undefined) {
    for (var child = 0; child < myChildren.length; child++) {
      matchingElements.push(getElementsByClassName(className, myChildren[child]));
    }
  }
  //Flatten the array so we hae a neat array of depth 1
  return matchingElements.flat(Infinity);
};
/**
 * Created a more robust Spec file that actually tests getElementsByClassName
 * Origonal spec file fails if given a multiStr class name like 'Window Left'
 *
 *
 *
  var htmlStrings = [
  '',
  '<div class="targetC lassName"></div>',
  '<div class="otherClassName targetC lassName"></div>',
  '<div><div class="targetC lassName"></div></div>',
  '<div><div class="targetC lassName"><div class="targetC lassName"></div></div></div>',
  '<div><div></div><div><div class="targetC lassName"></div></div></div>',
  '<div><div class="targetC lassName"></div><div class="targetC lassName"></div></div>',
  '<div><div class="someOtherDiv"><div class="targetC lassNameButNotQuite innerDiv">'
  + '<span class="targetC lassName">Some text for this span.</span>'
  + '</div></div></div>',
  '<div class="container"><div class="targetC lassName randomClass"></div></div>',
  '<div class="paragraph text targetC lassName"><p class="intro targetC lassName">'
  + 'Text for the paragraph tag.'
  + '</p></div>',
  '<div><div class="someOtherDiv"><div class="ButNotQuitetargetC lassName innerDiv">'
  + '<span class="targetC lassName">Some text for this span.</span>'
  + '</div></div></div>'
];

describe('getElementsByClassName', function() {
  var $testSuite;

  // remove the test suite element from the page before running tests
  before(function() {
    $testSuite = $('#mocha');
    $testSuite.detach();
    $('body').empty();
  });

  // render the test suite after testing is complete
  after(function() {
    $testSuite.appendTo('body');
  });

  describe('should match the results of calling the built-in function', function() {
    // clear the page between tests
    afterEach(function() {
      $('body').removeClass();
      $('body').empty();
    });

    htmlStrings.forEach(function(htmlString, index) {
      var shouldAddTargetClassToBody = index % 2 === 0;
      var testLabel = shouldAddTargetClassToBody
       ? '<body class="targetC lassName">' + htmlString + '</body>'
       : '<body>' + htmlString + '</body>';

      it(testLabel, function() {
        var $rootElement = $(htmlString);
        $('body').append($rootElement);

        if (shouldAddTargetClassToBody) {
          $('body').addClass('targetC lassName');
        }

        var result = getElementsByClassName('targetC lassName');
        var expectedNodeList = document.getElementsByClassName('targetC lassName');
        var expectedArray = Array.prototype.slice.apply(expectedNodeList);
        expect(result).to.have.ordered.members(expectedArray); // why can't we use .equal here?
      });
    });
  });
});

 */