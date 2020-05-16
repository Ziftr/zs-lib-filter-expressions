class AstNode {
  constructor(op, left, right) {
    this.op = op;
    this.left = left;
    this.right = right;
  }

  walk(node, context) {
    return node && node.reduce(context);
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
