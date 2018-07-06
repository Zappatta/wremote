# Internet connected A/C remote using Esp8266 (arduino compatible) board

This is a personal project I've worked on to allow me to control my home A/C unit via the internet. I could've gone with better, premade solutions such as [sensibo](https://sensibo.com/). But where is the fun in that? 

All the code is published here freely, for everyone who might wish to use it to build similar setups. Good luck :P

You don't have to be a genious, but this assumes you have basic knowledge in Arduino and Javascript to get it to work. Remember, this is for fun. If you want simple, buy a premade device.

### Supported Air Conditioners
This was built to replace a remote model YACIFBI. The library used to send the IR codes states it also supports remote models YAA1FB, FAA1FB1, YB1F2, YB1FA, YAG1FB. These seem to be white-label remotes for many AC units such as GREE, Electrolux, and Tadiran. 

## Hardware
This was built and tested on a WeMos D1 R2 Arduino compatible board. You can buy one online for about $6. It should work with any ESP8266 board, yet I can't say I tested that. I've tried using an Arduino Uno Wifi Dev edition at first, but it only has 2K of SRAM, which was not sufficicent enough for the sktech and libraries.

Apart from the board you will need:
* IR Led
* Temprature sensor (I use TMP36). Not mandatory but nice to see current temprature.

I have plugged the LED without a resistor, since it only turns on for short bursts. I have found that with a resistor, the LED is not powerful enough from the distance I need. This may reduce the lifetime of the LED, but so far it is working properly.

#### Arduino schematic
![Schematic](https://raw.githubusercontent.com/Zappatta/wremote/master/schematic.jpg)
This is an example schematic. This one shows an Arduino Uno board, but the setup is the same with only different pin names. If you have no experience with Arduino whatsoever, I recommend you start with the sparkfun guides for [LED](https://learn.sparkfun.com/tutorials/sik-experiment-guide-for-arduino---v32/experiment-1-blinking-an-led) and [Temprature sensor](https://learn.sparkfun.com/tutorials/sik-experiment-guide-for-arduino---v32/experiment-7-reading-a-temperature-sensor). 

I suck at soldering, so for the final build I used [dupont connectors](http://www.instructables.com/id/Fitting-Dupont-Connectors/) instead of a breadboard. I then fit the whole thing in a tin can. For me it was a Seresto anti-flea collar box. Altoids box can also work there. 

This is how it looks:
![final build](https://i.imgur.com/oeP57hU.png)

#### Arudino sketch
After building the hardware, you will need to upload the sketch that is located in the arduino directory. This directory has it's own readme with instructions.

## Web interface
This web interface is built using NodeJs and Express. I'm using Babel to transpile the code to ES2107 for both server and client side code. It also uses Vue on the client side. I've tried my best to make it simple to get up and running, and you have NPM scripts to take care of that for you.

Personally, I'm hosting the web interface on a hosted VM on the internet. But I can't think why this shouldn't work on your local LAN as well if you want to. Just make sure to forward the right ports in your router if you want to access it from the outside. 

The GUI is built for mobile devices. But will work on desktop browsers as well.

## how it works
The board will use the MQTT protocol to communicate with the server. the Server is a web GUI to control the broad.

## License - MIT

The MIT License (MIT)

Copyright (c) 2017 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
