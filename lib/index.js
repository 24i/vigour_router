'use strict'

var Observable = require('vigour-js/lib/observable')
var isNode = require('vigour-js/lib/util/is/node')

var dataListener = require('./constructor').dataListener

var slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

var Router = new Observable({
  inject: require('vigour-js/lib/operator/transform'),
  url: { // always the correct url,
    ChildConstructor: dataListener,
    val: '',
    urlpath: '',
    search: '',
    hash: '',
    $transform (val) {
      var href = this.urlpath.val
      if (this.search.val) { href += this.search.val }
      if (this.hash.val) { href += '#' + this.hash.val }
      return href
    }
  },
  // ook history mbv timestamps aangeven
  navigation: {
    val: {
      page: '',
      show: '',
      season: '',
      episode: '',
      title: ''
    },
    $transform (val, event) {
      var state = {}
      if (val.key === 'shows' || val.key === 'discover' || val.key === 'channels') {
        state.page = val.key
      } else if (val.currentEpisode) {
        var current = val.currentEpisode.val

        state.page = 'shows'
        state.show = current.show.title.val
        state.season = val.currentSeason.val.number.val
        state.episode = current.val.number.val

        if (val.currentEpisode.val.title.val) {
          state.title = val.currentEpisode.val.title.val
        }
      } else {
        console.log('channels?')
      }
      return state
    },
    on: {
      data (data) {
        var url
        if (typeof data === 'string') { return }
        var val = this.val
        if (val.page) {
          url = '/' + val.page.val
        }
        if (val.show) {
          console.log(val, data)
          url += '/' + data.key + '-' + slugify(val.show.val) +
            '/season-' + val.season.val +
            '/episode-' + val.episode.val
          if (val.title) {
            url += '-' + slugify(val.title.val)
          }
        }
        this.parent.url.urlpath.val = url
      }
    }
  },
  modal: {
    val: {},
    define: {
      close (val) {
        var url = this.parent.url
        url.search.val = url.search.val.split('&open=')[0]
        this.val = void 0
      }
    },
    on: {
      data (data) {
        if (!data) { return }
        var search = this.parent.url.search
        if (search.val) {
          search.val += '&open=' + data
        } else {
          search.val = '?open=' + data
        }
        this.parent.url.search.val = search.val
      }
    }
  }
}).Constructor

if (!isNode) {
  // var Router = require('./index.js')
  var parse = require('./parse')
  // console.log(parsed.parse(window.location))
  Router.prototype.inject({
    on: {
      new () {
        this._internal = () => {
          var parsed = parse.parseNavigation(window.location)
        }
        window.addEventListener('popstate', this._internal)
      },
      remove (data, event) {
        window.removeEventListener('popstate', this._internal)
      }
    },
    url: {
      on: {
        update (data, event) {
          console.log('PUSHING DAT STATE', this.val)
          // window.history.pushState({}, '', this.val)
        }
      }
    }
  })
}

module.exports = window.router = new Router()
