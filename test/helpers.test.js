var expect = require('chai').expect
var helpers = require('../helpers.js')

describe('helpers', function() {

  describe('prependArguments', function () {

    it('should return an array', function (done) {
      (function () {
        var args = helpers.prependArguments('a', arguments)
        expect(args.slice(0)).to.not.throw
        done()
      })('b', 'c')
    })

    it('should prepend a single string value', function (done) {
      (function () {
        var args = helpers.prependArguments('a', arguments)
        expect(args.length).to.equal(3)
        expect(args[0]).to.equal('a')
        done()
      })('b', 'c')
    })

    it('should prepend a single numerical value', function (done) {
      (function () {
        var args = helpers.prependArguments(1, arguments)
        expect(args.length).to.equal(3)
        expect(args[0]).to.equal(1)
        expect(args).to.deep.equal([1, 2, 3])
        done()
      })(2, 3)
    })

    it('should prepend multiple arguments', function (done) {
      (function () {
        var prepends = [1, 2, 3]
        var args = helpers.prependArguments(prepends, arguments)

        expect(args.length).to.equal(5)
        expect(args.slice(0, 3)).to.deep.equal(prepends)

        prepends.push(4)
        prepends.push(5)
        expect(args).to.deep.equal(prepends)

        done()
      })(4, 5)
    })

  })
})
