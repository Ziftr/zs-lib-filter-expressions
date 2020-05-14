const ParserError = require('./ParserError').ParserError;
const AstNode = require('./AstNode').AstNode;

class Parser {
  constructor(tokenizer) {
    this.tokenizer = tokenizer;
  }

  /**
   * Patterns:
   *   "(" list ")" 
   *   LITR CMP LITR
   *   LITR
   * Examples:
   *   hello.world
   *   hello.world != hello.nashua
   */
  expr() {
    let $1 = this.tokenizer.next();

    if ($1.type == 'GRP_STR') {
      let $2 = this.list(true);
      let $3 = this.tokenizer.next();

      if (!$3 || $3.type != 'GRP_END') {
        if ($3) {
          throw new ParserError('unexpected token', this.tokenizer.str, $1.pos);
        }

        throw new ParserError('unexpected end of expression', this.tokenizer.str, this.tokenizer.str.length-1);
      }

      return $2;
    }

    if ($1.type != 'LITR') {
      throw new ParserError('unexpected token', this.tokenizer.str, $1.pos);
    }

    let $2 = this.tokenizer.peek();

    if ($2 && $2.type == 'CMP') {
      $2 = this.tokenizer.next();
      let $3 = this.tokenizer.next();

      if ($3.type != 'LITR') {
        throw new ParserError('unexpected token', this.tokenizer.str, $3.pos);
      }

      return new AstNode($2.value, $1.value, $3.value);
    }

    return $1;
  }

  list(isNested = false) {
    let t, $;

    while ( (t = this.tokenizer.peek()) ) {

      switch( t.type ) {
      case 'LITR':
      case 'GRP_STR':
        $ = this.expr();
        break;
      case 'BOOL':
        let $1 = $;
        let $2 = this.tokenizer.next();
        let $3 = this.expr();

        $ = new AstNode($2.value, $1, $3);
        break;
      case 'GRP_END':
        if (isNested) {
          return $;
        }
      default:
        throw new ParserError('unexpected token', this.tokenizer.str, t.pos);
      }
    }

    return $;
  }

  parse() {
    return this.list();
  }
}

module.exports = { Parser };
