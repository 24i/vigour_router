// shorter regex / doesnt work with port
// ([^\/\.]+\.[^:\/\s\.]{2,3}?)([^#?\s]+)?(.*?)?(#[\w\-]+)?$

// exports.parse = function (url) {
//   var myRegexp = /^((http[s]?|ftp):\/\/)?\/?([^\/\.]+\.)*?([^\/\.]+\.[^:\/\s\.]{2,3}(\.[^:\/\s\.]‌​{2,3})?)(:\d+)?($|\/)([^#?\s]+)?(.*?)?(#[\w\-]+)?$/
//   var match = myRegexp.exec(url)
//
//   return {
//     hash: match[10] || '',
//     href: match[0] || '',
//     urlpath: match[8] || '',
//     search: match[9] || '' // parse query string into object
//   }
// }
var _url = document.createElement('a')

exports.parse = function (url) {
  _url.href = url
  return {
    hash: _url.hash || '',
    href: _url.href || '',
    urlpath: _url.pathname || '',
    search: _url.search || ''
  }
}

exports.parseNavigation = function (url) {
  let parsed = exports.parse(url)
  let split = parsed.urlpath.split('/')
  let season
  let episode
  let key

  let page = split[1] || ''
  let show = split[2] || ''

  if (split[2]) {
    key = split[2].split('-')[0]
    console.log(split[2].split('-')[0]);
  } else if (split[3]) {
    season = split[3].split('season-')[1] || ''
  } else if (split[4]) {
    episode = split[4].split('episode-')[1].split('-')[0] || ''
  }
  if (parsed.search) {
    console.log('search!')
  }

  return {
    page: page,
    show: show,
    key: key,
    season: season,
    episode: episode
  }
}
