const Token = require('./Token').Token;

class Tokenizer {

  constructor(str) {
    this.patterns = {
      GRP_STR: '[(]',      // Groups
      GRP_END: '[)]',            
      BOOL: 'AND|OR',      // Boolean expressions
      CMP: '[<>]=?|[!=]=', // Comparison ops
      STR: '(?<QUOTE>["\'])(?<STR_INNER>.*?)\\k<QUOTE>', // String
      IDEN: '[A-Za-z][A-Za-z._0-9]*', // Identifier
      NUM: '((0\.|[1-9][0-9]*\.)[0-9]+)|[1-9][0-9]*', // Numbers
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
          let tt = this.types[t];
          if (m.groups[tt]) {
            switch (tt) {
            case 'STR': return new Token(tt, m.groups.STR_INNER, m.index);
            case 'NUM': return new Token(tt, parseFloat(m.groups.NUM), m.index);
            default: return new Token(tt, m[0], m.index);
            }
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
