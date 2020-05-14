# Expression Parser

![Tests](https://github.com/Ziftr/zs-lib-filter-expressions/workflows/Tests/badge.svg?branch=master)

A tiny Node.js expression parser library designed to be embedded in other ZiftrShop projects.

It contains no external dependencies at runtime and compiles and compresses to less than 3kb

There is an emphasizes simplicity over performance since expressions are not called often and do not need to be fast.

# Syntax

Expressions support the following opperators: `==`, `!=`, `>`, `<`, `>=`, `<=`.

You can sepperate expression using `AND` and `OR` and also group expressions with `(` and `)`. The order of opperations when mixing `AND`/`OR` is *undefined behavior* so best practice is to use parenthesis for disambiguation.

For more information, see tests folder for examples. Or [the workflows page on confluence](https://airtank.atlassian.net/wiki/spaces/ENGINEERIN/pages/135692289/Workflows#Filters).


## Installing

```
npm install --save github:Ziftr/zs-lib-filter-expressions
```

## Running Tests

```
npm run test
```

## Packaging

```
npm run dist
```

This will create a file `dist/zs-expression-lib.js` that is suitable for user in browsers or to copy and paste (embed) in a Node.js. It will assign the library to a variable called `ZiftrshopExpressions`.
