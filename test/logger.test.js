var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
chai.use(require('sinon-chai'))

var helpers = require('../helpers.js')
var Logger = require('../logr.js')

describe('logger', function () {

  describe('constructor', function () {

    it('should log to info by default', function () {
      var logger = new Logger()
      expect(logger.level).to.equal(2)
    })

    describe('should set log level', function () {

      it('should handle a valid digit', function () {
        expect(new Logger(0).level).to.equal(0)
        expect(new Logger(1).level).to.equal(1)
        expect(new Logger(2).level).to.equal(2)
      })

      it('should handle a predefined string', function () {
        expect(new Logger('verbose').level).to.equal(3)
        expect(new Logger('debug').level).to.equal(4)
        expect(new Logger('silly').level).to.equal(5)
      })

      it('should handle invalid arguments quietly and use default log level', function () {
        var defaultLevel = 2
        var testArguments = ['a', 'b', 'c', -1, -2, '-3', null, undefined]
        for (var arg in testArguments) {
          var logger = new Logger(arg)
          expect(logger.level).to.equal(defaultLevel)
        }
      })

    })

  })

  describe('output', function () {
    var logger

    beforeEach(function () {
      logger = new Logger()
      logger.stdout = sinon.spy()
      logger.stderr = sinon.spy()
    })

    afterEach(function () {
      // Reset spies after each test
      logger.stdout.reset()
      logger.stderr.reset()
    })

    it('should log "error" to stderr', function () {
      logger.error('err')
      expect(logger.stderr.calledOnce)
      expect(logger.stderr.calledWith('err'))
      expect(logger.stdout.called).to.be.false
    })
    it('should log "warn" to stderr', function () {
      logger.warn('warning')
      expect(logger.stderr.calledOnce)
      expect(logger.stderr.calledWith('warning'))
      expect(logger.stdout.called).to.be.false
    })
    it('should log "log" to stdout', function () {
      logger.log('msg')
      expect(logger.stdout.calledOnce)
      expect(logger.stdout.calledWith('msg'))
      expect(logger.stderr.called).to.be.false
    })
    it('should log "verbose" to stdout', function () {
      logger.verbose('msg')
      expect(logger.stdout.calledOnce)
      expect(logger.stdout.calledWith('msg'))
      expect(logger.stderr.called).to.be.false
    })
    it('should log "debug" to stdout', function () {
      logger.log('debug')
      expect(logger.stdout.calledOnce)
      expect(logger.stdout.calledWith('msg'))
      expect(logger.stderr.called).to.be.false
    })
    it('should log "silly" to stdout', function () {
      logger.silly('msg')
      expect(logger.stdout.calledOnce)
      expect(logger.stdout.calledWith('msg'))
      expect(logger.stderr.called).to.be.false
    })
  })

  describe('omits messages with higher log level than specified', function () {

    var logger

    beforeEach(function () {
      logger = new Logger()
      logger.stdout = sinon.spy()
      logger.stderr = sinon.spy()
    })

    afterEach(function () {
      logger.stdout.reset()
      logger.stderr.reset()
    })

    it('should print messages with log level 0', function () {
      logger.level = 0

      logger.error('str')
      logger.info('str')
      logger.log('str')
      logger.verbose('str')

      expect(logger.stderr).to.have.been.calledOnce
      expect(logger.stdout).to.not.have.been.called
    })

    it('should print messages with log level 2 or lower', function () {
      logger.level = 2

      logger.error('str')
      logger.info('str')
      logger.log('str')
      logger.verbose('str')

      expect(logger.stderr).to.have.been.calledOnce
      expect(logger.stdout).to.have.been.calledTwice
    })

    it('should print messages with log level 3 or lower', function () {
      logger.level = 3

      logger.error('str')
      logger.info('str')
      logger.log('str')
      logger.verbose('str')

      expect(logger.stderr).to.have.been.calledOnce
      expect(logger.stdout).to.have.been.calledThrice
    })
  })

  describe('multicheck for log level omition', function () {
    it('should print everything but errors to stdout', function () {
      var logger = new Logger('silly')
      logger.stdout = sinon.spy()
      logger.stderr = sinon.spy()

      for (var i = 0; i < Logger.levels.length; i++) {
        logger._log(i, 'message')
      }

      expect(logger.stderr.callCount).to.equal(2)
      expect(logger.stdout.callCount).to.equal(Logger.levels.length - logger.stderr.callCount)
    })

    it('should print once', function () {
      var spy = sinon.spy()
      var logger = new Logger('silly')
      var levels = Logger.levels.length
      logger.stdout = spy
      logger.stderr = spy

      for (var i = 0; i < 100; i++) {
        logger._log(i, 'message')
      }

      expect(spy.callCount).to.equal(100)
    })
  })

  describe('logger arguments', function () {

    it('should be called just like util.format', function () {
      var logger = new Logger()
      logger.stdout = sinon.spy()
      logger.log('Hello, %s!', 'world')
      logger.info('a%d b%d c%d', 1, 2, 3)
      expect(logger.stdout.calledWith('Hello, world!')).to.be.true
      expect(logger.stdout.calledWith('a1 b2 c3')).to.be.true
    })

  })

  describe('aliases', function () {

    it('`.log()` is an alias for `.info()`', function () {
      var logger = new Logger()
      logger.info = sinon.spy();
      logger.log('msg')
      expect(logger.info.calledWithExactly('msg')).to.be.true
    })

    it('`.warn()` is an alias for `.warning()`', function () {
      var logger = new Logger()
      logger.warning = sinon.spy();
      logger.warn('warning')
      expect(logger.warning.called).to.be.true
    })

  })

  describe('examples', function () {
    it('should run first example')
  })
})
