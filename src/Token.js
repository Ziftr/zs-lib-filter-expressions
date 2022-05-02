const VALTYPES = ['STR','NUM','IDEN'];

class Token {
  constructor(type, value, pos) {
    this.type = type;
    this.value = value;
    this.pos = pos;
  }

  pathWalk(obj, path) {
    if (obj && path.length) {
       if (Array.isArray(obj)) {
         let result = obj
           .map(itm => this.pathWalk(itm, [].concat(path)))
           .filter(itm => itm !== undefined)
           .reduce((acc, itm) => {
             if (Array.isArray(itm)) {
               return acc.concat(itm);
             }
             return acc.concat([itm]);
           },[]);

         return result;
       }

       let k = path.shift();
       return this.pathWalk(obj[k], path);
    }

    return obj;
  }

  reduce(context) {
    if (this.type == 'IDEN') {
      if (this.value === 'true') {
        return true;
      } else if (this.value === 'false') {
        return false;
      }

      let path = this.value.split('.');
      return this.pathWalk(context, path);
    }
    return this.value;
  }

  hasValue() {
    return VALTYPES.indexOf(this.type) !== -1;
  }
}

module.exports = { Token };
