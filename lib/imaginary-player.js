var moment = require('moment'),
    parser = require('./parser');

var _playlist = [],
    start = moment(),
    index = 0,
    timer = setTimeout(),
    playing = false,
    identifier;

exports.now = now;
exports.playlist = playlist;
exports.play = play;
exports.logAttribute = logAttribute;

function playlist(items) {
  if( !Array.isArray(items) )
    throw("items must be an Array");

  reset();
  _playlist = items;
  return this;
}

function reset() {
  index = 0;
  clearTimeout(timer);
  playing = false;
}

function now() {
  if( !playing )
    return { error: "nothing being played" };

  var item = _playlist[index];
  item.played = played();

  return item;
}

function played() {
  return moment().diff(moment(start), 'seconds', true);
}

function next() {
  return index = ++index % _playlist.length;
}

// @i - index to play from. plays from beginning if not specified
function play(i) {
  if( _playlist.length == 0 )
    throw("cannot play an empty playlist");

  if( !i )
    i = 0;

  item = _playlist[index = i];

  start = moment();
  playing = true;
  console.log( +start + ' now playing: ' + (item[identifier] || '') );

  timer = setTimeout(function() {
      play( next() );
    },
    moment( moment(start).add(parser.parseDuration(item.duration)) )
      .diff( moment() )
  );
}

function logAttribute(attr) {
  identifier = attr;
}
