var Element = require('vigour-element')
var Observable = require('vigour-js/lib/observable')

var router = require('../../lib')

var pages = new Element({
  val: router.navigation.page,
  on: {
    data () {
      // console.log('go to the correct pages', router.url.val)
    }
  }
})

var shows = new Element({
  val: router.navigation.show,
  on: {
    data () {
      // console.log('go to the correct show page', router.url.val)
    }
  }
})

var modal = new Element({
  val: router.modal,
  on: {
    data () {
      // console.log('do something!!', router.modal.val)
    }
  }
})

it('should update window hash when setting modal', function (done) {
  router.modal.val = {
    open: 'register'
  }
  expect(window.location.search).to.contain('open=register')
  done()
})

it('should remove querystring when removed', function (done) {
  router.modal.close('register')
  expect(window.location.search).to.not.contain('open=register')
  done()
})

it('should update path when setting page', function (done) {
  router.navigation.val = 'discover'
  expect(window.location.pathname).to.equal('/discover')
  done()
})

var show = new Observable({
  title: 'andere show',
  season: 1,
  episode: 1
})

it('should update path when setting show property', function (done) {
  router.navigation.val = show
  // expect(window.location.pathname).to.equal('/no')
  done()
})

exports.pages = pages
exports.modal = modal
