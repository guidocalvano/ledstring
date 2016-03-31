FireControl = require('./FireControl');

var width     = 6;
var height    = 8;
var frameRate = 5;
var skipFirstNPixels = 2;
var fc = new FireControl().init(width, height, frameRate, skipFirstNPixels);
