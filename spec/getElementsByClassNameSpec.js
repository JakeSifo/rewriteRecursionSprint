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