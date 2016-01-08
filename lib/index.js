var querystring = require('querystring')
var Observable = require('vigour-js/lib/observable')

var parsed = require('./parsed')(window.location)
var urlConstructor = require('./constructor').url

function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

var router = new Observable({
  inject: require('vigour-js/lib/operator/transform'),
  url: { // always the correct url,
    ChildConstructor: urlConstructor,
    val: parsed.href,
    urlpath: parsed.urlpath,
    search: parsed.search,
    hash: parsed.hash,
    $transform (val) {
      console.log('lol');
      var href = this.urlpath.val
      if (this.search) { href += this.search.val }
      if (this.hash) { href += '#' + this.hash.val }

      return href
    }
  },
  // ook history mbv timestamps aangeven
  navigation: {
    val: '',
    on: {
      data: {
        parse (data) {
          console.log('navigation on data', data)
          if (typeof data === 'string') { url = data } else {
            // dit kan nog wel wat nicer denk ik
            var url = ''
            if (data.title) { url += slugify(data.title.val) }
            if (data.season) {
              url += '/' + data.season.key
              url += '-' + data.season.val
            }
            if (data.episode) {
              url += '/' + data.episode.key
              url += '-' + data.episode.val
            }
          }
          this.parent.url.urlpath.val = '/' + url
        }
      }
    }
  },
  modal: {
    val: {},
    define: {
      close (val) {
        // dirty & wrong
        this.parent.url.search.val = this.parent.url.search.val.split('&open=' + val)[0]
      }
    },
    on: {
      data: {
        parse (data) {
          var stringified = querystring.stringify(data)
          if (parsed.search) {
            parsed.search += '&' + stringified
          } else { parsed.search = stringified }
          this.parent.url.search.val = parsed.search
        }
      }
    }
  }
}, false)

module.exports = window.router = router
