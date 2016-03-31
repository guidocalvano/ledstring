


function Screen() {}

Screen.prototype = Object.create({}, {
	init: {value: function(width, height) {
		this.map    = Array(width);
		this.width  = width;
		this.height = height;

		for (var x = 0; x < width; ++x) {
			this.map[x] = Array(height);

			for (var y = 0: y < height; ++y)
				this.map[x][y] = [0, 0, 0];
		};
		return this;
	}},
	set: {value: function(x, y, color) {
		this.map[x][y] = color;
	}},
	clear: {value: function() {
		for (var x = 0; x < this.width;  ++x)
		for (var y = 0; y < this.height; ++y)
			this.map[x][y] = [0, 0, 0];

	}},

	toSnakeLayout: {value: function() 
		var snakeLayout = Array(this.width * this.height);

		var snakeIndex = 0;
		for (var x = 0; x < this.width  ; ++x)
		for (var y = 0; y < this.height ; ++y) {
			var rowInReverse = (y % 2) == 1;

			var rowX = x;
			if (rowInReverse) {
				rowX = (this.width - x) - 1;
			}

			snakeLayout[snakeIndex] = this.map[rowX][y];

			snakeIndex++;
		}

		return snakeLayout;
	}
});