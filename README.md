imaginary-player
================

npm module for pseudo-streaming/broadcasting

[![Build Status](https://travis-ci.org/mjchoi/imaginary-player.png)](https://travis-ci.org/mjchoi/imaginary-player)

## Motivation

Broadcasting is a complex problem (such that every visitor would be sychronized to watch the same moment). Luckly with HTML5 `<video>` and [Media Fragments URI](http://www.w3.org/TR/media-frags/), the client can do most of this work -- we just need to supply where something is currently playing. :sunglasses: Hence this module is a fancy timer in essence. See [below](#about-html5-video-support) for HTML `<video>` support.

## Usage examples

First things first. Install the package.
```shell
npm install imaginary-player [--save]
```

You will need to initialize the playlist like below. Each playlist item can be your arbitrary data but it must respond to the `duration` property.
```javascript
var player = require('imaginary-player');

player.playlist([
  { duration: '31:29', title: 'All Arsenal Goals 2012/13',                        location: '1.webm' },
  { duration: '15:00', title: 'The Greatest Ever Arsenal Player - Thierry Henry', location: '2.webm' },
  { duration: '8:17',  title: 'Kieran Gibbs - Still Breathing (2012/13)',         location: '3.webm' }
]).play();
```

Alternatively, you can defer calling `play()` until later. `play()` will start playing from the beginning of the playlist and loop.
```javascript
player.play();
```

You can also specify which index it should start playing from. `play()` is equivalent to `play(0)`.
```javascript
player.play(1);
```

Specify which attribute should show up in the logs:
```javascript
player.logAttribute('title');
// 1371408021917 now playing: All Arsenal Goals 2012/13
```

Once you have it playing, you can `now()` ask for what/where it's currently playing. Using the popular web application framework [express](http://expressjs.com/api.html), you can serve that information like below:
```javascript
var express = require('express');

var app = express();

app.get('/where', function(req, res) {
  res.send( player.now() );
});

app.listen(3000);
```

This would produce a response like below. The `played` attribute represents the current playing marker in seconds.
```json
{
  "duration": "31:29",
  "title": "All Arsenal Goals 2012/13",
  "location": "1.webm",
  "played": 589.743
}
```

Your client can then consume that information like so:
```javascript
var screen = document.querySelector('your-<video>-element'); // with autoplay attribute maybe?

var now = res.body; // server-returned response
screen.src = now.location + "#t=" + now.played;
```

## About HTML5 video support

I'm not a video / encoding format expert.  This [article](http://diveintohtml5.info/video.html#what-works) from diveintohtml5 gives good insight.
####tl;dr
* .webm (VP8 + Vorbis)
* .mp4 (H.264 + AAC)
* .ogg (Theora + Vorbis)

## Fun facts

By coincidence :wink:, Jay-Z has an awesome track named _Imaginary Player_.

<img src="http://imgur.com/vyZxJd2.jpg">
