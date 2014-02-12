// Knuth shuffle
// - source: http://www.htmlblog.us/random-javascript-array
Array.prototype.shuffle = function() {
  var i = this.length,
      j,
      temp;

  while( --i ) {
    j = Math.floor( Math.random() * (i - 1) );
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
}
