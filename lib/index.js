var Observable = require('vigour-js/lib/observable')

var parsed = require('./parsed')(window.location)
var urlConstructor = require('./constructor').url
var dataListener = require('./constructor').dataListener

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
    ChildConstructor: dataListener,
    on: {
      update (data, event) {
        console.log('PUSHING DAT STATE', this.val)
        window.history.pushState({}, '', this.val)
      }
    },
    val: parsed.href,
    urlpath: parsed.urlpath,
    search: parsed.search,
    hash: parsed.hash,
    $transform (val) {
      var href = this.urlpath.val
      if (this.search.val) { href += this.search.val }
      if (this.hash.val) { href += '#' + this.hash.val }
      return href
    }
  },
  // ook history mbv timestamps aangeven
  navigation: {
    val: '',
    $transform (val, event) {
      var state = {}
      if (val.key === 'shows' || val.key === 'discover' || val.key === 'channels') {
        state.page = val.key
      } else if (val.currentEpisode) {
        let current = val.currentEpisode.val

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
        if (typeof data === 'string') { return }
        var url = '/' + this.val.page.val
        if (this.val.show) {
          url += '/' + slugify(this.val.show.val) +
            '/season-' + this.val.season.val +
            '/episode-' + this.val.episode.val
          if (this.val.title) {
            url += '-' + slugify(this.val.title.val)
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
        let url = this.parent.url
        url.search.val = url.search.val.split('&open=')[0]
        this.val = void 0
      }
    },
    on: {
      data (data) {
        if (!data) {
          return
        }
        let search = this.parent.url.search
        if (search.val) {
          search.val += '&open=' + data
        } else {
          search.val = '?open=' + data
        }
        this.parent.url.search.val = search.val
      }
    }
  }
})

module.exports = window.router = router
