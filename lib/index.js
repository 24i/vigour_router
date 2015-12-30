var Observable = require('vigour-js/lib/observable')
var querystring = require('querystring')
// var each = require('vigour-js/lib/methods/each').define.each

var parsed = require('./parsed')(window.location)
var urlConstructor = require('./constructor').url

var router = new Observable({
  inject: require('vigour-js/lib/operator/transform'),
  url: { // always the correct url,
    ChildConstructor: urlConstructor,
    val: parsed.href,
    urlpath: parsed.urlpath,
    search: parsed.search,
    hash: parsed.hash,
    $transform (val) {
      var href = this.urlpath.val
      if (this.search) { href += this.search.val }
      if (this.hash) { href += this.hash.val }

      return href
    }
  },
  navigation: {
    // constructor op de property
    val: '',
    on: {
      data: {
        parse (data) {
          this.parent.url.urlpath.val = this.val
        }
      }
    },
    $transform(val) {
      if (typeof val === 'string') { return val }
      else {
        var url = val.title.val
        url += val.season.key
        url += val.season.val
        url += val.episode.key
        url += val.episode.val
        return url
      }
    }
    // show: {
    //   title: '',
    //   season: 0,
    //   episode: 0
    // } // always the correct data for navigation
  },
  modal: {
    val: '',
    define: {
      close (val) {
        // dirty & wrong
        var a = window.location.href.split('&open=' + val)[0]
        window.history.pushState({page: 1}, 'title 1', a)
      }
    },// always the correct data for modal
    on: {
      data (val) {
        var stringified = querystring.stringify(val)
        if (parsed.search) {
          parsed.search += '&' + stringified
        } else { parsed.search = stringified }
        this.parent.url.search.val = parsed.search
        // update url
      }
    },
    // $transform (val) {
    //   var stringified = querystring.stringify(val)
    //   if (parsed.search) {
    //     parsed.search += '&' + stringified
    //   } else { parsed.search = stringified }
    //   return parsed.search
    // }
  }
}, false)

module.exports = window.router = router
