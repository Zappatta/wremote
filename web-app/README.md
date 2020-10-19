# Web interface server for arduino A/C remote

### Info
This is the web-interface, written in VueJs and Vuetify.

It will connect directly to a MQTT server of you choice which you need to specify in the settings. 
The MQTT server info will be saved in your browser's local storage, so it only needs to be specified once.

Uses [mqtt.js](https://github.com/mqttjs/MQTT.js) for MQTT communication. 

Boilerplate created with Vue-cli.

Uses github actions to build and deploy to github pages. [https://wremote.zappatta.pw](You can see/use it here)

### Getting started

* npm install
* npm run serve

##### For prod 
* npm run build
* node dist/main.js 

### Credits and acknowledgments:

#### icons:
* Snowflake by [Icon Works](https://www.flaticon.com/authors/icon-works) from www.flaticon.com 
* Drought by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com
* Fan by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com
* Magic want by [iconnice](https://www.flaticon.com/authors/iconnice) from www.flaticon.com
* Sun by [Lucy G](https://www.flaticon.com/authors/lucy-g) from www.flaticon.com
* Mode by [Robin Kylander](https://www.flaticon.com/authors/robin-kylander) from www.flaticon.com
