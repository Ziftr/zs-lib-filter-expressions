const VALTYPES = ['STR','NUM','IDEN'];

class Token {
  constructor(type, value, pos) {
    this.type = type;
    this.value = value;
    this.pos = pos;
  }

  reduce(context) {
    if (this.type == 'IDEN') {
      let path = this.value.split('.');

      let obj = context, k;
      while (obj && (k = path.shift())) {
        obj = obj[k];
      }

      return obj;
    }
    return this.value;
  }

  hasValue() {
    return VALTYPES.indexOf(this.type) !== -1;
  }
}

module.exports = { Token };
