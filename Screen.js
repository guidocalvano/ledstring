


function Screen() {}

Screen.prototype = Object.create({}, {
	init: {value: function(width, height, skipFirstNPixels) {
		this.map    = Array(width);
		this.width  = width;
		this.height = height;

		this.skipFirstNPixels = skipFirstNPixels;

		for (var x = 0; x < width; ++x) {
			this.map[x] = Array(height);

			for (var y = 0; y < height; ++y)
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

	toSnakeLayout: {value: function() {
		var snakeLayout = Array(this.width * this.height + this.skipFirstNPixels);

		var snakeIndex = 0;
		
		for (var i = 0; i < this.skipFirstNPixels; ++i)
			snakeLayout[snakeIndex++] = [0, 0, 0];
		
		for (var x = 0; x < this.width  ; ++x) 
		for (var y = 0; y < this.height ; ++y) {
			var columnInReverse = (x % 2) == 1;

			var columnY = y;
			if (columnInReverse) {
				columnY = (this.height - y) - 1;
			}

			snakeLayout[snakeIndex] = this.map[x][columnY];

			snakeIndex++;
		}

		return snakeLayout;
	}}
});

module.exports = Screen;