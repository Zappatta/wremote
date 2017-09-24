# Arduino sketch for ESP8266 A/C web remote control

### Required Libraries
* [ESP8266-IRremote](https://github.com/markszabo/IRremoteESP8266) - An ESP8266 compatible port for the [Arduino IRremote](https://github.com/z3t0/Arduino-IRremote) Library.
* [Tadiran](https://github.com/Zappatta/MySensors/tree/master/AcControl/Library) - Found this at a [development branch](https://github.com/dpressle/MySensors/tree/Development/AcControl/Library) of a Github repo by [Dpressle](https://github.com/dpressle). I cannot be thankful enough for this, as it saved me __A LOT__ of work. Dpressle you are awesome!! <3. 

    * To get this lib to work with ESP8266-IRremote, I had to modify it to use uint16_t instead of normal unsigned int. That is why the the link above leads to my own fork. Nonetheless, i claim no responsibility and deserve no credit for this library. You can probably achieve the same results with casting in the .ino file.
    
### Getting started    
* [Install](https://www.arduino.cc/en/Guide/Libraries) these library on your arduino IDE
* cp config.example.h config.h
* modify config.h with your WiFI credentials, your server address, and pins if changed.
* upload sketch to board using Arduino IDE.


