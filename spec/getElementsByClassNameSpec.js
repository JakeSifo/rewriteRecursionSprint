var htmlStrings = [
  '',
  '<div class="targetClassName"></div>',
  '<div class="otherClassName targetClassName"></div>',
  '<div><div class="targetClassName"></div></div>',
  '<div><div class="targetClassName"><div class="targetClassName"></div></div></div>',
  '<div><div></div><div><div class="targetClassName"></div></div></div>',
  '<div><div class="targetClassName"></div><div class="targetClassName"></div></div>',
  '<div><div class="someOtherDiv"><div class="targetClassNameButNotQuite innerDiv">'
  + '<span class="targetClassName">Some text for this span.</span>'
  + '</div></div></div>',
  '<div class="container"><div class="targetClassName randomClass"></div></div>',
  '<div class="paragraph text targetClassName"><p class="intro targetClassName">'
  + 'Text for the paragraph tag.'
  + '</p></div>'
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
       ? '<body class="targetClassName">' + htmlString + '</body>'
       : '<body>' + htmlString + '</body>';

      it(testLabel, function() {
        var $rootElement = $(htmlString);
        $('body').append($rootElement);

        if (shouldAddTargetClassToBody) {
          $('body').addClass('targetClassName');
        }

        var result = getElementsByClassName('targetClassName');
        var expectedNodeList = document.getElementsByClassName('targetClassName');
        var expectedArray = Array.prototype.slice.apply(expectedNodeList);
        expect(result).to.have.ordered.members(expectedArray); // why can't we use .equal here?
      });
    });
  });
});
