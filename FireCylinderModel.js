function FireCylinderModel() {}

FireCylinderModel.prototype = Object.create({}, {
	init: {value: function (width, height, extinctionFactor, targetShiftRate) {
		this.width               = width;
		this.height              = height;
		this.map                 = this.createMap(width, height);
		this.extinctionFactor    = extinctionFactor;

		this.timeBetweenTargets  = 1000 / targetShiftRate; // milliseconds
		this.timeStampLastTarget = Date.now();

		for (var x = 0; x < this.width; ++x) {
			this.map[x][0] = .3 + .7 * Math.random() ;
		}

		this.targetMap = JSON.parse(JSON.stringify(this.map)); // Quick hack to make a deep copy. It is O(N) though, so no worries.


		setInterval(this.shiftTarget.bind(this), this.timeBetweenTargets);

		return this;
	}},
	timeCycle: {value: function () {
		
		var targetShiftRatio = (Date.now() - this.timeStampLastTarget) / this.timeBetweenTargets;

		// var targetShiftRatio = elapsedTime / this.timeBetweenTargets;// 1 / (1 + Math.exp(-elapsedTime));

		 // var targetShiftRatio =  1 / (1 + Math.exp(-(targetShiftRatio   - .5 * this.timeBetweenTargets)) );

		var currentMap = Array(this.width);

		for (var x = 0; x < this.width;  ++x) {
			currentMap[x] = Array(this.height);
			for (var y = 0; y < this.height; ++y) {
				currentMap[x][y] = (1 - targetShiftRatio) * this.map[x][y] + this.targetMap[x][y] * targetShiftRatio;
			}
		}

		return currentMap;
	}},

	shiftTarget: {value: function() {
		this.map = this.targetMap;

		var newMap = this.createMap(this.width, this.height);

		for (var x = 0; x < this.width; ++x) {
			newMap[x][0] = .15 * (.4 + .6 * Math.random()) + 
						   .65 * this.map[x][0] + 
						   .1 * this.map[(this.width + x - 1) % this.width][0] + 
						   .1 * this.map[(x + 1) % this.width][0];
		}

		for (var y = 0; y < (this.height - 1); ++y)
		for (var x = 0; x <  this.width      ; ++x) {

			left   = 1 * this.map[(this.width + x - 1) % this.width][y];
			center = 1 * this.map[x][y];
			right  = 1 * this.map[(             x + 1) % this.width][y];

			newMap[x][y + 1] = this.extinctionFactor * (left * .32 + center * .36 + right * .32) - Math.random() * .12;
		}
		this.targetMap = newMap;
		this.timeStampLastTarget = Date.now();
	}},

	createMap: {value: function (width, height) {
		var map = Array(width);

		for (var x = 0; x < width; ++x) {
			map[x] = Array(height);

			for (var y = 0; y < height; ++y)
				map[x][y] = 0;
		};

		return map;
	}},
	testPrint: {value: function(){
		console.log('frame');
		for (var x = 0; x < this.map.length; ++x){
			console.log(this.map[x]);
		}
		console.log('end frame');
	}}
});

module.exports = FireCylinderModel;