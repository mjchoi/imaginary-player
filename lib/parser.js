exports.parseDuration = parseDuration;

// supports
// - mm:ss
// - hh:mm:ss
function parseDuration(string) {
  var token = string.split(':'),
      hour = token.length == 3;

  if( [2, 3].indexOf(token.length) == -1 )
    throw("invalid duration format. try hh:mm:ss or mm:ss");

  return {
    h: hour ? parseInt(token[0]) : 0,
    m: parseInt(token[hour ? 1 : 0]),
    s: parseInt(token[hour ? 2 : 1])
  };
}
