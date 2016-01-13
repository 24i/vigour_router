'use strict'
var _url = document.createElement('a')

module.exports = function (url) {
  _url.href = url
  return {
    hash: _url.hash,
    href: _url.href,
    urlpath: _url.pathname,
    search: _url.search,
    host: _url.hostname,
    port: _url.port
  }
}
