function FireCylinderModel() {}

FireCylinderModel.prototype = Object.create({}, {
	init: {value: function (width, height, extinctionFactor) {
		this.width            = width;
		this.height           = height;
		this.map              = this.createMap(width, height);
		this.extinctionFactor = extinctionFactor;

		return this;
	}},
	timeCycle: {value: function () {
		var newMap = this.createMap(this.width, this.height);

		for (var x = 0; x < this.width; ++x)
			newMap[x, 0] = Math.random();

		for (var y = 0; y < (this.height - 1); ++y)
		for (var x = 0; x <  this.width      ; ++x) {

			left   = this.map[(this.width + x - 1) % this.width][y];
			center = this.map[x][y];
			right  = this.map[(             x + 1) % this.width][y];

			newMap[x][y + 1] = this.extinctionFactor * (left + center + right) / 3;
		}
		this.map = newMap;

		return newMap;
	}},
	createMap: {value: function (width, height) {
		var map = Array(width);

		for (var x = 0; x < width; ++x) {
			map[x] = Array(height);

			for (var y = 0: y < height; ++y)
				map[x][y] = 0;
		};
	}}
});