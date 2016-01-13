'use strict'
var Router = require('./').Router

Router.prototype.inject({
  on: {
    new() {
      console.log('hahah')
      this._internal = () => {
        var parsed = parse.parseNavigation(window.location)
        console.log(parsed)
      }
      window.addEventListener('popstate', this._internal)
    },
    remove(data, event) {
      window.removeEventListener('popstate', this._internal)
    }
  }
})

module.export = new Router()
