var theUrl = require('../../lib/index.js')
var colors = require('colors-browserify') //eslint-disable-line
var Observable = require('vigour-js/lib/observable')

//
theUrl.inject(
  require('../../lib/browser.js')
)

console.log(theUrl)

global.url = new theUrl.Constructor({

})

var a = global.bla = new Observable({
  val: 'yo'
})
var b = global.bla2 = new Observable('yo2')

global.url.set({
  // inject: [
  //   require('vigour-router/lib/browser.js')
  // ], y u no work
  search: 'searchit!',
  'hello': {
    separator: ',',
    indicator: '#',
    on: {
      data (data) {
        if (!this.val) {
          console.log('ok update my bitches! shit be gone!'.red)
        } else {
          console.log('data creepin!'.white.bold.inverse, this.val)
        }
      }
    },
    val: a
  },
  '💩': {
    separator: '&',
    indicator: '#',
    on: {
      data (data) {
        if (!this.val) {
          console.log('ok update my bitches! shit be gone!'.red)
        } else {
          console.log('data creepin! burs'.magenta.inverse, data, this.val)
        }
      }
    },
    val: b
  },
  'no': {
    separator: ',',
    indicator: '/',
    on: {
      data (data) {
        if (!this.val) {
          console.log('ok update my bitches! shit be gone!'.red)
        } else {
          console.log('data creepin! burs'.magenta.inverse, data, this.val)
        }
      }
    },
    val: b
  }
})
