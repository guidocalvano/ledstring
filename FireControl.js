var FireCylinderModel = require('./FireCylinderModel');
var FireView          = require('./FireView');
var Screen            = require('./Screen');
var express           = require('express');
var socketIo          = require('socket.io');
var http			  = require('http');

function FireControl() {}

FireControl.prototype = Object.create({}, {
	init: {value: function (width, height, targetShiftRate, skipFirstNPixels) {
		if (skipFirstNPixels === undefined)
			skipFirstNPixels = 0;


		this.model     = new FireCylinderModel().init(width, height, .97, targetShiftRate);
		this.screen    = new Screen().init(width, height, skipFirstNPixels);
		this.view      = new FireView().init(FireView.prototype.createOrangeGradient());

		this.lightIntensity = 1;

		this.ledString = require("rpi-ws2801");
		this.ledString.connect(width * height + skipFirstNPixels);

		setInterval(this.timeCycle.bind(this), 1000 / 60);

		this.app = this.initApp();


		return this;
	}},

	initApp: {value: function () {
		var app = express();
		var server = http.createServer(app);
		server.listen(80);
		io = socketIo(server);

		io.on('connection', function (socket) {
  			socket.emit('newLightIntensity', this.lightIntensity);
  			socket.on('newLightIntensity', function (data) {
  				this.lightIntensity = parseFloat(data);
  				io.sockets.emit('newLightIntensity', this.lightIntensity);
  			}.bind(this));
  		}.bind(this));

		app.get('/', function(req, res){
  			res.sendfile(__dirname + '/public/webInterface.html');
		}.bind(this));

		app.get('/socket.io.js', function(req, res){
  			res.sendfile(__dirname + '/public/socket.io.js');
		}.bind(this));

		app.listen(3000);

		return app;
	}},

	timeCycle: {value: function() {
		var fireMap = this.model.timeCycle();

		for (var x = 0; x < fireMap.length;    ++x)
		for (var y = 0; y < fireMap[0].length; ++y)
			fireMap[x][y] *= this.lightIntensity;

		this.view.render(fireMap, this.screen);

		var ledStringState = this.screen.toSnakeLayout();

		this.renderToLedString(ledStringState);
	}},

	renderToLedString: {value: function(ledStringState){
		for (var i = 0; i < ledStringState.length; ++i)
			this.ledString.setColor(i, ledStringState[i]);
		this.ledString.update();
	}}
});

module.exports = FireControl;