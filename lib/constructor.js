var Observable = require('vigour-js/lib/observable')
var Event = require('vigour-js/lib/event')

exports.dataListener = new Observable({
  on: {
    new (data, event) {
      this._internal = () => {
        var event = new Event(this, 'popstate')
        event.isTriggered = true
        console.log(this.parent)
        // this.href.emit('data', window.location.href, event)
        event.trigger()
        console.log('doe dit toch')
        console.log('this.parent.push', this.define)
      }
      window.addEventListener('popstate', this._internal)
    },
    remove () {
      window.removeEventListener('popstate', this._internal)
    },
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
