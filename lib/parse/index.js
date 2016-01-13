'use strict'
var isNode = require('vigour-js/lib/util/is/node')

if (isNode) {
  exports.parse = require('url').parse
} else {
  exports.parse = require('./parse')
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
    console.log(split[2].split('-')[0])
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
