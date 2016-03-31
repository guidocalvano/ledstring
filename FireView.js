FireView() {};

FireView.prototype = Object.create({}, {
	init: {value: function(gradient) {
		this.gradient = gradient;
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
		if (gradientIndex >= this.gradient.length) gradientIndex = this.gradientIndex - 1;

		return this.gradient[gradientIndex];
	}},
	createOrangeGradient: {value: function () {
		var gradient = Array(256);

		for (var i = 0; i < gradient.length; ++1) {
			var gradientValue = i / gradient.length;

			var red   = Math.floor( this.sigmoid(4 - gradientValue *  8) * 255 );
			var green = Math.floor( this.sigmoid(4 - gradientValue * 16) * 255 );
			var blue  = Math.floor( this.sigmoid(4 - gradientValue * 32) * 255 );

			gradient[i] = [];
		}
	}},
	sigmoid: {value: function (v) {
		// The sigmoid curve has an S like shape: en.wikipedia.org/wiki/Sigmoid_function
		return 1 / (1 + Math.exp(-v));
	}}
});