var should = require('chai').should(),
    moment = require('moment'),
    parser = require('../lib/parser');

describe('parser', function() {
  describe('parseDuration()', function() {
    it('should parse mm:ss format', function() {
      var duration = moment.duration( parser.parseDuration('54:50') );
      duration.hours().should.equal(0);
      duration.minutes().should.equal(54);
      duration.seconds().should.equal(50);
    });

    it('should parse hh:mm:ss format', function() {
      var duration = moment.duration( parser.parseDuration('1:37:30') );
      duration.hours().should.equal(1);
      duration.minutes().should.equal(37);
      duration.seconds().should.equal(30);
    });

    it('should parse overloaded mm:ss format', function() {
      var duration = moment.duration( parser.parseDuration('97:30') );
      duration.hours().should.equal(1);
      duration.minutes().should.equal(37);
      duration.seconds().should.equal(30);
    });

    it('should throw error if given invalid duration format', function() {
      var invalid = ['12:34:56:78', '12'];

      for(var i = 0; i < invalid.length; i++) {
        (function() {
          parser.parseDuration(invalid[i]);
        }).should.throw(/invalid duration format/);
      }
    });
  });
});
