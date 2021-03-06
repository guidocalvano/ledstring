function FireView() {};

FireView.prototype = Object.create({}, {
	init: {value: function(gradient) {
		this.gradient = gradient;

		return this;
	}},
	render: {value: function(map, screen) {
		for (var x = 0; x < map.length;    ++x)
		for (var y = 0; y < map[0].length; ++y)	{
			color = this.getGradientColor(map[x][y]);
			screen.set(x, y, color);
		}	
	}},
	getGradientColor: {value: function(gradientValue) {

		var gradientIndex = Math.floor(this.gradient.length * gradientValue);
		if (gradientIndex >= this.gradient.length) gradientIndex = this.gradient.length - 1;
		if (gradientIndex < 0) gradientIndex = 0;


		return this.gradient[gradientIndex];
	}},
	createOrangeGradient: {value: function () {
		var gradient = Array(256);

		var dimmingEnd = .65;
		var dimmingRange = 1 - dimmingEnd;

		for (var i = 0; i < gradient.length; ++i) {
			var gradientValue = 1 - i / gradient.length;

			var dimming = dimmingEnd + 2 * Math.exp(-gradientValue);

			var red   = Math.floor( dimming * (1 - ( 1 - .8 * this.sigmoid(4 - gradientValue *  7.2)) * (1 - this.sigmoid(4 - gradientValue * 14.3)) ) * 255 );

			var green = Math.floor( .6 * dimming *  this.sigmoid(4 - gradientValue * 12.3) * 255 );
			// var blue  = Math.floor( dimming * this.sigmoid(4 - gradientValue * 45) * 255 );
			var blue = 0;

			gradient[i] = [red, green, blue];
		}
		return gradient;
	}},
	sigmoid: {value: function (v) {
		// The sigmoid curve has an S like shape: en.wikipedia.org/wiki/Sigmoid_function
		return 1 / (1 + Math.exp(-v));
	}}
});

module.exports = FireView;