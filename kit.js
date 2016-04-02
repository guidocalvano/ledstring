var leds = require("rpi-ws2801");

LED_COUNT = 50;

leds.connect(LED_COUNT);

activeLedIndex = 0;

setInterval(function() {
		activeLedIndex = (activeLedIndex + 1) % LED_COUNT;

		for (var i = 0; i < LED_COUNT; ++i) {

			red = i == activeLedIndex ? 255 : 0;

			leds.setColor(i, [red,0,0]); 
		}
		leds.update();
		console.log('activeLedIndex = ' + activeLedIndex);
}, 500);