# Internet connected A/C remote using Esp8266 (arduino compatible) board

![Build](https://github.com/zappatta/wremote/workflows/Build/badge.svg)
![Test](https://github.com/zappatta/wremote/workflows/Test/badge.svg)

![Imgur](https://i.imgur.com/Dpmky3r.png?1)

This is a personal project I've worked on to allow me to control my home A/C unit via the internet. I could've gone with better, premade solutions such as [sensibo](https://sensibo.com/). But where is the fun in that? 

All the code is published here freely, for everyone who might wish to use it to build similar setups. Good luck :P

You don't have to be a genious, but this assumes you have basic knowledge in Arduino and Javascript to get it to work. Remember, this is for fun. If you want simple, buy a premade device.

### Supported Air Conditioners
This was built to replace a remote model YACIFBI. The library used to send the IR codes states it also supports remote models YAA1FB, FAA1FB1, YB1F2, YB1FA, YAG1FB. These seem to be white-label remotes for many AC units such as GREE, Electrolux, and Tadiran. 

## Hardware
This was built and tested on a WeMos D1 R2 Arduino compatible board. You can buy one online for about $6. It should work with any ESP8266 board, yet I can't say I tested that. I've tried using an Arduino Uno Wifi Dev edition at first, but it only has 2K of SRAM, which was not sufficicent enough for the sktech and libraries.

Apart from the board you will need:
* IR Led
* Temperature sensor (I use TMP36). Not mandatory but nice to see current temprature.

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
I've also created web inteface for controlling the A/C. The GUI is built for mobile devices. But will work on desktop browsers as well. 

in V2 I've eliminated the server-side code, and have the client side web-app issue commands directly to the MQTT server. 
While this comes with added cost of having the manually enter the MQTT server in each device, it can now be run with absolutely
not set-up work required, and does not require owning and configuring a server of you own. It can be hosted in 
github pages. So I believe the benefits outweighs the cost.

## how it works
This GUI and board both use the MQTT protocol to send and receive commands. 
You will need to use a hosted MQTT server, either by using a hosted solution or rolling your own.

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
