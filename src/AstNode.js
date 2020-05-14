class AstNode {
  constructor(op, left, right) {
    this.op = op;
    this.left = left;
    this.right = right;
  }

  walk(node, context) {
    if (node === undefined) {
      return;
    }

    if (typeof node == 'string') {
      let path = node.split('.');

      let obj = context, k;
      while (obj && (k = path.shift())) {
        obj = obj[k];
      }

      return obj;
    }

    return node.reduce(context);
  }

  reduce(context) {
    let left = this.walk(this.left, context);
    let right = this.walk(this.right, context);

    switch (this.op) {
    case '==':  return left === right;
    case '!=':  return left !== right;
    case '>':   return left > right;
    case '<':   return left < right;
    case '>=':  return left >= right;
    case '<=':  return left <= right;
    case 'AND': return left && right;
    case 'OR':  return left || right;
    }

    return false;
  }
}

module.exports = { AstNode };
