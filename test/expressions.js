const chai = require('chai');
const expect = chai.expect;

const ZiftrshopExpressions = require('../src');

const ParserError = ZiftrshopExpressions.ParserError;
const integrationTest = ZiftrshopExpressions.eval;

describe('Expression integration tests', function() {

  const test1 = 'x1.val == x2.val';

  describe(test1, function() {
    it('should return true when equal', function() {
      let res = integrationTest(test1, { x1: {val: 3}, x2: {val:3} });
      expect(res).to.equal(true);
    });
    it('should return false when not equal', function() {
      let res = integrationTest(test1, { x1: {val: 3}, x2: {val:9} });
      expect(res).to.equal(false);
    });
  });

  const test2 = 'x1.val != x2.val';

  describe(test2, function() {
    it('should return true when not equal', function() {
      let res = integrationTest(test2, { x1: {val: 3}, x2: {val:9} });
      expect(res).to.equal(true);
    });
    it('should return false when equal', function() {
      let res = integrationTest(test2, { x1: {val: 3}, x2: {val:3} });
      expect(res).to.equal(false);
    });
  });

  const test3 = 'x1.val > x2.val';

  describe(test3, function() {
    it('should return true when greater than', function() {
      let res = integrationTest(test3, { x1: {val: 6}, x2: {val:3} });
      expect(res).to.equal(true);
    });
    it('should return false when less than', function() {
      let res = integrationTest(test3, { x1: {val: 1}, x2: {val:9} });
      expect(res).to.equal(false);
    });
    it('should return false when equal', function() {
      let res = integrationTest(test3, { x1: {val: 3}, x2: {val:3} });
      expect(res).to.equal(false);
    });
  });

  const test4 = 'x1.val < x2.val';

  describe(test4, function() {
    it('should return true when less than', function() {
      let res = integrationTest(test4, { x1: {val: 1}, x2: {val:3} });
      expect(res).to.equal(true);
    });
    it('should return false when greater than', function() {
      let res = integrationTest(test4, { x1: {val: 3}, x2: {val:1} });
      expect(res).to.equal(false);
    });
    it('should return false when equal', function() {
      let res = integrationTest(test4, { x1: {val: 3}, x2: {val:3} });
      expect(res).to.equal(false);
    });
  });

  const test5 = 'x1.val >= x2.val';

  describe(test5, function() {
    it('should return true when greater than', function() {
      let res = integrationTest(test5, { x1: {val: 6}, x2: {val:3} });
      expect(res).to.equal(true);
    });
    it('should return false when less than', function() {
      let res = integrationTest(test5, { x1: {val: 1}, x2: {val:9} });
      expect(res).to.equal(false);
    });
    it('should return true when equal', function() {
      let res = integrationTest(test5, { x1: {val: 3}, x2: {val:3} });
      expect(res).to.equal(true);
    });
  });

  const test6 = 'x1.val <= x2.val';

  describe(test6, function() {
    it('should return true when less than', function() {
      let res = integrationTest(test6, { x1: {val: 1}, x2: {val:3} });
      expect(res).to.equal(true);
    });
    it('should return false when greater than', function() {
      let res = integrationTest(test6, { x1: {val: 3}, x2: {val:1} });
      expect(res).to.equal(false);
    });
    it('should return true when equal', function() {
      let res = integrationTest(test6, { x1: {val: 3}, x2: {val:3} });
      expect(res).to.equal(true);
    });
  });

  const test7 = '(x1.val == x2.val)';

  describe(test7, function() {
    it('should return true when equal', function() {
      let res = integrationTest(test7, { x1: {val: 3}, x2: {val:3} });
      expect(res).to.equal(true);
    });
    it('should return false when not equal', function() {
      let res = integrationTest(test7, { x1: {val: 3}, x2: {val:9} });
      expect(res).to.equal(false);
    });
  });

  const test8 = 'x1.val == x2.val AND x1.val == x3.val';

  describe(test8, function() {
    it('should return true when all three are equal', function() {
      let res = integrationTest(test8, { x1: {val: 3}, x2: {val:3}, x3: {val: 3} });
      expect(res).to.equal(true);
    });
    it('should return false when x1 is not equal', function() {
      let res = integrationTest(test8, { x1: {val: 1}, x2: {val:3}, x3: {val: 3} });
      expect(res).to.equal(false);
    });
    it('should return false when x2 is not equal', function() {
      let res = integrationTest(test8, { x1: {val: 3}, x2: {val:1}, x3: {val: 3} });
      expect(res).to.equal(false);
    });
    it('should return false when x3 is not equal', function() {
      let res = integrationTest(test8, { x1: {val: 3}, x2: {val:3}, x3: {val: 1} });
      expect(res).to.equal(false);
    });
  });

  const test9 = `${test8} AND x1.val == x4.val`;

  describe(test9, function() {
    it('should return true when all four are equal', function() {
      let res = integrationTest(test9, { x1: {val: 3}, x2: {val:3}, x3: {val: 3}, x4: {val: 3} });
      expect(res).to.equal(true);
    });
    it('should return false when x1 is not equal any', function() {
      let res = integrationTest(test9, { x1: {val: 1}, x2: {val:3}, x3: {val: 3}, x4: {val: 3} });
      expect(res).to.equal(false);
    });
    it('should return false when x2 is not equal', function() {
      let res = integrationTest(test9, { x1: {val: 3}, x2: {val:1}, x3: {val: 3}, x4: {val: 3} });
      expect(res).to.equal(false);
    });
    it('should return false when x3 is not equal', function() {
      let res = integrationTest(test9, { x1: {val: 3}, x2: {val:3}, x3: {val: 1}, x4: {val: 3} });
      expect(res).to.equal(false);
    });
    it('should return false when x4 is not equal', function() {
      let res = integrationTest(test9, { x1: {val: 3}, x2: {val:3}, x3: {val: 3}, x4: {val: 1} });
      expect(res).to.equal(false);
    });
  });

  const test10 = 'x1.val == x2.val OR x1.val == x3.val'

  describe(test10, function() {
    it('should return true when all three are equal', function() {
      let res = integrationTest(test10, { x1: {val: 3}, x2: {val:3}, x3: {val: 3} });
      expect(res).to.equal(true);
    });
    it('should return false when x2 and x3 are equal but not x1', function() {
      let res = integrationTest(test10, { x1: {val: 1}, x2: {val:3}, x3: {val: 3} });
      expect(res).to.equal(false);
    });
    it('should return false when none are equal', function() {
      let res = integrationTest(test10, { x1: {val: 1}, x2: {val:2}, x3: {val: 3} });
      expect(res).to.equal(false);
    });
    it('should return false when x2 and x1 equal but not x3', function() {
      let res = integrationTest(test10, { x1: {val: 3}, x2: {val:3}, x3: {val: 1} });
      expect(res).to.equal(true);
    });
    it('should return false when x3 and x1 equal but not x2', function() {
      let res = integrationTest(test10, { x1: {val: 3}, x2: {val:1}, x3: {val: 3} });
      expect(res).to.equal(true);
    });
  });

  const test11 = `x1.val == x2.val AND (x1.val == x3.val OR x1.val == x4.val)`;

  describe(test11, function() {
    it('should return true when all four are equal', function() {
      let res = integrationTest(test11, { x1: {val: 3}, x2: {val:3}, x3: {val: 3}, x4: {val: 3} });
      expect(res).to.equal(true);
    });
    it('should return false when x1 is not equal any', function() {
      let res = integrationTest(test11, { x1: {val: 1}, x2: {val:3}, x3: {val: 3}, x4: {val: 3} });
      expect(res).to.equal(false);
    });
    it('should return false when x2 is not equal x1', function() {
      let res = integrationTest(test11, { x1: {val: 3}, x2: {val:1}, x3: {val: 3}, x4: {val: 3} });
      expect(res).to.equal(false);
    });
    it('should return false when x3 and x4 do not equal x1 but x2 does', function() {
      let res = integrationTest(test11, { x1: {val: 3}, x2: {val:3}, x3: {val: 1}, x4: {val: 1} });
      expect(res).to.equal(false);
    });
    it('should return true when x1 and x2 and x3 are equal but not x4', function() {
      let res = integrationTest(test11, { x1: {val: 3}, x2: {val:3}, x3: {val: 3}, x4: {val: 1} });
      expect(res).to.equal(true);
    });
    it('should return true when x1 and x2 and x4 are equal but not x3', function() {
      let res = integrationTest(test11, { x1: {val: 3}, x2: {val:3}, x3: {val:1}, x4: {val: 3} });
      expect(res).to.equal(true);
    });
  });

  const test12 = '(x1.val == x2.val';

  describe(test12, function() {
    it('should throw a ParserError exception', function() {
      expect(function(){
        integrationTest(test12, {});
      }).to.throw('unexpected end of expression');
    });
  });

  const test13 = '(x1.val == x2.val AND (x1.val == x2.val)';

  describe(test13, function() {
    it('should throw a ParserError exception', function() {
      expect(function(){
        integrationTest(test12, {});
      }).to.throw('unexpected end of expression');
    });
  });

  const test14 = `(x1.val == x3.val OR x1.val == x4.val) AND x1.val == x2.val`;

  describe(test14, function() {
    it('should return true when all four are equal', function() {
      let res = integrationTest(test14, { x1: {val: 3}, x2: {val:3}, x3: {val: 3}, x4: {val: 3} });
      expect(res).to.equal(true);
    });
    it('should return false when x1 is not equal any', function() {
      let res = integrationTest(test14, { x1: {val: 1}, x2: {val:3}, x3: {val: 3}, x4: {val: 3} });
      expect(res).to.equal(false);
    });
    it('should return false when x2 is not equal x1', function() {
      let res = integrationTest(test14, { x1: {val: 3}, x2: {val:1}, x3: {val: 3}, x4: {val: 3} });
      expect(res).to.equal(false);
    });
    it('should return false when x3 and x4 do not equal x1 but x2 does', function() {
      let res = integrationTest(test14, { x1: {val: 3}, x2: {val:3}, x3: {val: 1}, x4: {val: 1} });
      expect(res).to.equal(false);
    });
    it('should return true when x1 and x2 and x3 are equal but not x4', function() {
      let res = integrationTest(test14, { x1: {val: 3}, x2: {val:3}, x3: {val: 3}, x4: {val: 1} });
      expect(res).to.equal(true);
    });
    it('should return true when x1 and x2 and x4 are equal but not x3', function() {
      let res = integrationTest(test14, { x1: {val: 3}, x2: {val:3}, x3: {val:1}, x4: {val: 3} });
      expect(res).to.equal(true);
    });
  });

  const test15 = '(x1.val == x2.val AND (AND x1.val == x2.val)';

  describe(test15, function() {
    it('should throw a ParserError exception', function() {
      expect(function(){
        integrationTest(test15, {});
      }).to.throw('unexpected end of expression');
    });
  });

  const test16 = '(x1.val == x2.val) AND (x1.val == x2.val)';

  describe(test16, function() {
    it('should return true when equal', function() {
      let res = integrationTest(test16, { x1: {val: 3}, x2: {val:3} });
      expect(res).to.equal(true);
    });
    it('should return false when not equal', function() {
      let res = integrationTest(test16, { x1: {val: 3}, x2: {val:9} });
      expect(res).to.equal(false);
    });
  });

  const test17 = '(x1.val == x2.val AND (x1.val == x2.val))';

  describe(test17, function() {
    it('should return true when equal', function() {
      let res = integrationTest(test17, { x1: {val: 3}, x2: {val:3} });
      expect(res).to.equal(true);
    });
    it('should return false when not equal', function() {
      let res = integrationTest(test17, { x1: {val: 3}, x2: {val:9} });
      expect(res).to.equal(false);
    });
  });

  const test18 = 'x1.val & x2.val';

  describe(test18, function() {
    it('should throw a ParserError exception', function() {
      expect(function(){
        integrationTest(test18, {});
      }).to.throw('unexpected token');
    });
  });

  const test19 = 'x1.val == x2.val)';

  describe(test19, function() {
    it('should throw a ParserError exception', function() {
      expect(function(){
        integrationTest(test19, {});
      }).to.throw('unexpected token');
    });
  });

});
