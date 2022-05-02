class AstNode {
  constructor(op, left, right) {
    this.op = op;
    this.left = left;
    this.right = right;
  }

  walk(node, context) {
    return node && node.reduce(context);
  }

  eval(left, right, context) {
    if (Array.isArray(right)) {
      return !!right.find(itm => this.eval(left, itm, context));
    }

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

  reduce(context) {
    let left = this.walk(this.left, context);
    let right = this.walk(this.right, context);

    if (Array.isArray(left)) {
      return !!left.find(itm => this.eval(itm, right, context));
    }

    return this.eval(left, right, context);
  }
}

module.exports = { AstNode };
