var FireCylinderModel = require('./FireCylinderModel');
var FireView          = require('./FireView');
var Screen            = require('./Screen');

function FireControl() {}

FireControl.prototype = Object.create({}, {
	init: {value: function (width, height, frameRate, skipFirstNPixels) {
		if (skipFirstNPixels === undefined)
			skipFirstNPixels = 0;


		this.model     = new FireCylinderModel().init(width, height, .97);
		this.screen    = new Screen().init(width, height, skipFirstNPixels);
		this.view      = new FireView().init(FireView.prototype.createOrangeGradient());

		this.ledString = require("rpi-ws2801");
		this.ledString.connect(width * height);

		setInterval(this.timeCycle.bind(this), 1000 / frameRate);

		return this;
	}},

	timeCycle: {value: function() {
		var fireMap = this.model.timeCycle();

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