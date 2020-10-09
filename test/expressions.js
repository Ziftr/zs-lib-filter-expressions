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

  const test20 = 'x';

  describe(test20, function() {
    it('should return true when value is non-empty string', function() {
      let res = integrationTest(test20, { x: 't' });
      expect(res).to.equal(true);
    });
    it('should return true when value is non-zero number', function() {
      let res = integrationTest(test20, { x: -1 });
      expect(res).to.equal(true);
    });
    it('should return true when value is boolean true', function() {
      let res = integrationTest(test20, { x: true });
      expect(res).to.equal(true);
    });
    it('should return true when value is boolean object', function() {
      let res = integrationTest(test20, { x: {} });
      expect(res).to.equal(true);
    });
    it('should return false when value is empty string', function() {
      let res = integrationTest(test20, { x: '' });
      expect(res).to.equal(false);
    });
    it('should return false when value is zero', function() {
      let res = integrationTest(test20, { x: 0 });
      expect(res).to.equal(false);
    });
    it('should return false when value is boolean false', function() {
      let res = integrationTest(test20, { x: false });
      expect(res).to.equal(false);
    });
  });

  const test21 = 'x AND y';

  describe(test21, function() {
    it('should return true when both are true', function() {
      let res = integrationTest(test21, { x: true, y: true });
      expect(res).to.equal(true);
    });
    it('should return false when x is false', function() {
      let res = integrationTest(test21, { x: false, y: true });
      expect(res).to.equal(false);
    });
    it('should return false when y is false', function() {
      let res = integrationTest(test21, { x: true, y: false });
      expect(res).to.equal(false);
    });
  });

  const test22 = 'x AND (y)';

  describe(test22, function() {
    it('should return true when both are true', function() {
      let res = integrationTest(test22, { x: true, y: true });
      expect(res).to.equal(true);
    });
    it('should return false when x is false', function() {
      let res = integrationTest(test22, { x: false, y: true });
      expect(res).to.equal(false);
    });
    it('should return false when y is false', function() {
      let res = integrationTest(test22, { x: true, y: false });
      expect(res).to.equal(false);
    });
  });

  const test23 = 'x > 3';

  describe(test23, function() {
    it('should return true when x is greater than 3', function() {
      let res = integrationTest(test23, { x: 4 });
      expect(res).to.equal(true);
    });
    it('should return false when x is less than 3', function() {
      let res = integrationTest(test23, { x: 2 });
      expect(res).to.equal(false);
    });
  });

  const test24 = 'x AND y > 3';

  describe(test24, function() {
    it('should return true when x is true and y is greater than 3', function() {
      let res = integrationTest(test24, { x: true, y: 4 });
      expect(res).to.equal(true);
    });
    it('should return false when x is false and y is greater than 3', function() {
      let res = integrationTest(test24, { x: false, y: 4 });
      expect(res).to.equal(false);
    });
    it('should return false when y is less than 3', function() {
      let res = integrationTest(test24, { x: true, y: 2 });
      expect(res).to.equal(false);
    });
  });

  const test25 = 'x == "yes"';

  describe(test25, function() {
    it('should return true when x is "yes"', function() {
      let res = integrationTest(test25, { x: "yes" });
      expect(res).to.equal(true);
    });
    it('should return false when x is not "yes"', function() {
      let res = integrationTest(test25, { x: "no" });
      expect(res).to.equal(false);
    });
  });

  const test26 = '"no" == "yes"';

  describe(test26, function() {
    it('should return false', function() {
      let res = integrationTest(test26, {});
      expect(res).to.equal(false);
    });
  });

  const test27 = '"yes" == "yes"';

  describe(test27, function() {
    it('should return true', function() {
      let res = integrationTest(test27, {});
      expect(res).to.equal(true);
    });
  });

  const test28 = '"yes" == "yes\'';

  describe(test28, function() {
    it('should throw a ParserError exception', function() {
      expect(function(){
        integrationTest(test28, {});
      }).to.throw('unexpected token');
    });
  });


  const test29 = '"yes" == \'yes\'';

  describe(test29, function() {
    it('should return true', function() {
      let res = integrationTest(test29, {});
      expect(res).to.equal(true);
    });
  });

  const test30 = '"The test\'s apostrophy"';

  describe(test30, function() {
    it('should return true', function() {
      let res = integrationTest(test30, {});
      expect(res).to.equal(true);
    });
  });

  const test31 = '"20" > 100';

  describe(test31, function() {
    it('should return false', function() {
      let res = integrationTest(test31, {});
      expect(res).to.equal(false);
    });
  });

  const test32 = '1.2 > 1.1';

  describe(test32, function() {
    it('should return true', function() {
      let res = integrationTest(test32, {});
      expect(res).to.equal(true);
    });
  });

  const test33 = '10.2 > 0.10';

  describe(test33, function() {
    it('should return true', function() {
      let res = integrationTest(test33, {});
      expect(res).to.equal(true);
    });
  });

  const test34 = '0.2 > 02';

  describe(test34, function() {
    it('should throw a ParserError exception', function() {
      expect(function(){
        integrationTest(test34, {});
      }).to.throw('unexpected token');
    });
  });

  const test35 = 'my_test == 3';

  describe(test35, function() {
    it('should return true', function() {
      let res = integrationTest(test35, {my_test: 3});
      expect(res).to.equal(true);
    });
  });

  const test36 = 'x1.val != true';

  describe(test36, function() {
    it('should return true when x1.val is false', function() {
      let res = integrationTest(test36, { x1: {val: false} });
      expect(res).to.equal(true);
    });
    it('should return false when x1.val is true', function() {
      let res = integrationTest(test36, { x1: {val: true} });
      expect(res).to.equal(false);
    });
    it('should return true when x1.val is undefined', function() {
      let res = integrationTest(test36, { x1: {not_val: true} });
      expect(res).to.equal(true);
    });
    it('should return true when x1 is undefined', function() {
      let res = integrationTest(test36, {});
      expect(res).to.equal(true);
    });
  });
});
