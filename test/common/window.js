var Element = require('vigour-element')
var Observable = require('vigour-js/lib/observable')

var router = require('../../lib')

var pages = new Element({
  val: router.navigation,
  on: {
    data () {
      console.log('go to the correct pages', router.url.val)
    }
  }
})

var modal = new Element({
  val: router.modal,
  on: {
    data () {
      // console.log('modal element!!', router.modal.val)
    }
  }
})

it('should update window querystring when setting modal', function (done) {
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
  router.navigation.val = 'shows'
  expect(window.location.pathname).to.equal('/shows')
  done()
})

var show = new Observable({
  title: 'andere show',
  season: 1,
  episode: 1
})

var otherShow = new Observable({
  title: 'gekke show voor!!',
  season: 2,
  episode: 3
})

it('should update path when setting show property', function (done) {
  router.navigation.val = show
  expect(window.location.pathname).to.equal('/andere-show/season-1/episode-1')
  router.navigation.val = otherShow
  expect(window.location.pathname).to.equal('/gekke-show-voor/season-2/episode-3')
  done()
})

it('should update hash when setting url hash', function (done) {
  router.url.hash.val = 'oldhash'
  expect(window.location.hash).to.equal('#oldhash')
  router.url.hash.val = 'newhash'
  expect(window.location.hash).to.equal('#newhash')
  done()
})
