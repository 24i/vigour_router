var Observable = require('vigour-js/lib/observable')

exports.navigation = new Observable({
  on: {
    data: {
      rick (data) {
        alert('JA PATS')
        console.log('data navigation', data)
        // this.parent.parent.url.urlpath.val = data
      }
    }
  }
}).Constructor

exports.url = new Observable({
  on: {
    data (data) {
      window.history.pushState({page: 1}, 'title 1', this.parent.val)
    }
  }
})
