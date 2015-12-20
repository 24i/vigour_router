'use strict'
// pretty dirty but makes the colors module compatible with the browser
var map = exports.map = require('./map')
var log = console.log
var string = String.prototype
var Style = function (val, style) {
  this.val = val
  this.style = style
}
var style = Style.prototype

for (let key in map.colors) {
  define(key, 'color:' + map.colors[key] + ';')
}

for (let key in map.backgrounds) {
  define(key, 'background-color:' + map.backgrounds[key] + ';')
}

for (let key in map.styles) {
  define(key, convertToCss(map.styles[key]))
}

for (let key in map.extras) {
  define(key, convertToCss(map.extras[key]))
}

console.line = true

console.log = function () {
  var args = [ '' ]
  for (let arg of arguments) {
    if (arg instanceof Style) {
      args[0] += '%c' + arg.val + ' '
      args.push(arg.style)
    } else {
      let type = typeof arg
      if (type === 'string') {
        args[0] += '%c' + arg + ' '
        args.push('color: inherit;')
      } else if (type === 'function') {
        args[0] += '%c' + String(arg) + '\n'
        args.push('color: grey;')
      } else if (arg === null) {
        args[0] += '%cnull '
        args.push('color: grey;')
      } else if (type === 'object') {
        args[0] += '%O '
        args.push(arg)
      } else if (type === 'number' || type === 'boolean') {
        args[0] += '%c' + arg + ' '
        args.push('color: blue;')
      } else if (arg === void 0) {
        args[0] += '%cundefined '
        args.push('color: grey;')
      }
    }
  }
  if (console.line) {
    args[0] += ('\n%c' + extractLineNumberFromStack((new Error()).stack))
    args.push(`
      color: grey;
      font-style:italic;
      font-size:8px;
      line-height: 30px;
      padding-bottom: 0px;
      overflow:hidden;
    `)
  }

  log.apply(console, args)
}

function extractLineNumberFromStack (stack) {
  var lines = stack.split('\n')
  var line = lines[2]
  line = (line.indexOf(' (') >= 0
    ? line.split(' (')[1].substring(0, line.length - 1)
    : line.split('at ')[1]
    )
  return line
}

// util functions
function define (key, css) {
  Object.defineProperty(style, key, {
    get () {
      this.style = this.style + css
      return this
    }
  })
  Object.defineProperty(string, key, {
    get () {
      return new Style(this, css)
    }
  })
}

function convertToCss (obj) {
  let cssMap = obj
  let css = ''
  for (let style in cssMap) {
    css += style + ':' + cssMap[style] + ';'
  }
  return css
}
