const Token = require('./Token').Token;

class Tokenizer {

  constructor(str) {
    this.patterns = {
      GRP_STR: '[(]',      // Groups
      GRP_END: '[)]',            
      CMP: '[<>]=?|[!=]=', // Comparison ops
      LITR: '[a-z.0-9]+',  // Litterals
      BOOL: 'AND|OR',      // Boolean expressions
      WHITESPACE: '\\s+',  // Whitepace (ignore)
      INVD: '.',           // Invalid (error)
    };
    this.types = Object.keys(this.patterns);
    
    this.re = new RegExp(this.types.map(t => `(?<${t}>${this.patterns[t]})`).join('|'),'g')

    this.str = str;
    this.buffer = null;
    this.complete = false;
  }

  peek() {
    if (this.buffer) {
      return this.buffer;
    }
    this.buffer = this.next();
    return this.buffer;
  }

  next() {
    if (this.buffer) {
      let b = this.buffer;
      this.buffer = null;
      return b;
    }
    if (this.complete) {
      return null;
    }

    let m = this.re.exec(this.str);

    if (m) {
      if (m.groups.WHITESPACE) {
        return this.next();

      } else {
        for ( let t in this.types ) {
          if (m.groups[this.types[t]]) {
            return new Token(this.types[t], m[0], m.index);
          }
        }
      }
    }

    this.complete = true;
    return null;
  }

  all() {
    let tokens = [], t;

    while ( (t = this.next()) ) {
      tokens.push(t);
    }

    return tokens;
  }
}

module.exports = { Tokenizer };
