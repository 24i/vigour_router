var urlConstructor = require('./childconstructor')
var Observable = require('vigour-js/lib/observable')


module.exports = new Observable({
  inject: [
    require('vigour-js/lib/operator/type'),
    require('vigour-js/lib/operator/transform'),
    require('./browser')
  ],
  $type: 'string',
  href: {
    inject: [
      require('vigour-js/lib/operator/type'),
      require('vigour-js/lib/operator/transform')
    ],
    $transform () {
      return global.location.href
    },
    $type: 'string',
    properties: {
      _internal: true
    },
    on: {
      data: {
        children(data, event) {
          this.parent.each(function(property, key) {
            if (key !== 'href') {
              property.emit('data', data, event)
            }
          })
        }
      }
    }
  },
  ChildConstructor: urlConstructor
})
