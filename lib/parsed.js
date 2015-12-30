module.exports = function (url) {
  var myRegexp = /^((http[s]?|ftp):\/\/)?\/?([^\/\.]+\.)*?([^\/\.]+\.[^:\/\s\.]{2,3}(\.[^:\/\s\.]‌​{2,3})?)(:\d+)?($|\/)([^#?\s]+)?(.*?)?(#[\w\-]+)?$/
  var match = myRegexp.exec(window.location.href)

  return {
    hash: match[10] || '',
    href: match[0] || '',
    urlpath: match[8] || '',
    search: match[9] || '' // parse query string into object
  }
}
