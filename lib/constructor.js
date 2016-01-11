var Observable = require('vigour-js/lib/observable')
var Event = require('vigour-js/lib/event')

exports.dataListener = new Observable({
  on: {
    data (data, event) {
      this.parent.emit('update')
    }
  }
}).Constructor

// exports.router = new Observable({
//   url: {
//     val: window.location
//     // search: ''
//   } // set href
// }, false).Constructor
