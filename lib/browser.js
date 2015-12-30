var Event = require('vigour-js/lib/event')

'use strict'

exports.on = {
  new: {
    popstate () {
      this._internal = () => {
        var event = new Event(this, 'popstate')
        event.isTriggered = true
        this.href.emit('data', window.location.href, event)
        event.trigger()
        console.log('doe dit toch')
        console.log('this.parent.push', this.define)
      }
      window.addEventListener('popstate', this._internal)
    }
  },
  remove: {
    popstate () {
      window.removeEventListener('popstate', this._internal)
    }
  }
}
