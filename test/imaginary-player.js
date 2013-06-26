var should = require('chai').should(),
    player = require('../lib/imaginary-player');

describe('imaginary-player', function() {
  describe('now()', function() {
    it('should return error unless something is playing', function() {
      player.now().error.should.equal("nothing being played");
    });

    it('should loop', function(done) {
      player.logAttribute('title');
      player.playlist([
        { duration: '01:00', title: 'first item' },
        { duration: '00:01', title: 'last item'  }
      ]).play(1);

      setTimeout(function() {
        player.now().title.should.equal("first item");
        done();
      }, 1000);
    });
  });
});
