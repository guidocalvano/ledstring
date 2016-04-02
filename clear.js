var leds = require("rpi-ws2801");

LED_COUNT = 50;

leds.connect(LED_COUNT);

for (var i = 0; i < LED_COUNT; ++i) {

	leds.setColor(i, [0,0,0]); 
}
leds.update();
