// shorter regex / doesnt work with port
// ([^\/\.]+\.[^:\/\s\.]{2,3}?)([^#?\s]+)?(.*?)?(#[\w\-]+)?$

module.exports = function (url) {
  var myRegexp = /^((http[s]?|ftp):\/\/)?\/?([^\/\.]+\.)*?([^\/\.]+\.[^:\/\s\.]{2,3}(\.[^:\/\s\.]‌​{2,3})?)(:\d+)?($|\/)([^#?\s]+)?(.*?)?(#[\w\-]+)?$/
  // var match = myRegexp.exec(url)

  return {
    hash: '', //match[10] || '',
    href: '', //match[0] || '',
    urlpath: '', //match[8] || '',
    search: '' //match[9] || '' // parse query string into object
  }
}
