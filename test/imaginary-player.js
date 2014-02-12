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

    it('should shuffle if shuffle is enabled', function(done) {
      player.shuffle(true); // enable shuffle
      player.logAttribute('title');
      player.playlist([
        { duration: '00:01', title: '1' },
        { duration: '00:01', title: '2' },
        { duration: '00:01', title: '3' }
      ]).play();

      // the Knuth shuffle algorithm is deterministic with 3 items
      // ['1', '2', '3'] -> ['2', '3', '1']
      player.now().title.should.equal('2');

      setTimeout(function() {
        player.now().title.should.equal('3');
        done();
      }, 1000);

      // verified the first two items to be '2', '3'
      // we assume the last item is '1'
    });
  });
});
