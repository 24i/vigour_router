var Router = require('./index.js')
'use strict'

module.exports = console.log('haha')

// 
// on: {
//   new: {
//     popstate () {
//       this._internal = () => {
//         var event = new Event(this, 'popstate')
//         event.isTriggered = true
//         this.href.emit('data', window.location.href, event)
//         event.trigger()
//       }
//       window.addEventListener('popstate', this._internal)
//     }
//   },
//   remove: {
//     popstate () {
//       window.removeEventListener('popstate', this._internal)
//     }
//   }
// },
