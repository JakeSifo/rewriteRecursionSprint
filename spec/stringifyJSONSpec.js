// test cases are described in fixtures.js
describe('stringifyJSON', function() {
  describe('should match the result of calling JSON.stringify', function() {
    stringifiableTests.forEach(function(test) {
      it(test.label, function() {
        var expected = JSON.stringify(test.value);
        var result = stringifyJSON(test.value);
        expect(result).to.equal(expected, 'Incorrect Output');
        expect(test.value).to.eql(JSON.parse(expected), 'Input mutated');
      });
    });
  });

  describe('should not stringify invalid input', function() {
    unstringifiableTests.forEach(function(test) {
      it(test.label, function() {
        var expected = JSON.stringify(test.value);
        var result = stringifyJSON(test.value);
        expect(result).to.equal(expected, 'Incorrect Output');
        if (expected !== undefined) {
          expect(test.value).to.not.eql(JSON.parse(expected), 'Input mutated');
        }
      });
    });
  });
});
