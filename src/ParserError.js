class ParserError {
  constructor(msg, str, pos) {
    this.message = msg;
    this.str = str;
    this.pos = pos;
  }

  toString() {
    let padding = '';
    for (let i=0; i < this.pos; i++) { padding += ' '; }

    return `${this.msg}\n\n${this.str}\n${padding}^`;
  }
}

module.exports = { ParserError };
