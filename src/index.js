const Tokenizer = require('../src/Tokenizer').Tokenizer;
const Parser = require('../src/Parser').Parser;
const ParserError = require('../src/ParserError').ParserError;

module.exports = { Tokenizer, Parser, ParserError };

module.exports.eval = function (expr, context) {
  let tokenizer = new Tokenizer(expr);
  let parser = new Parser(tokenizer);
  let tree = parser.parse();

  let value = tree.reduce(context);
  if (Array.isArray(value)) {
    return !!value.find(item => item)
  }
  return !!value;
}
