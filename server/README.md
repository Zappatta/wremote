# Web interface server for arduino A/C remote

### Info
This is the web-interface. Based on expressjs on server-side, and Vue on client side. 
It has very basic security. 

Arduino requests are only allowed from certain IP (or DNS) (see [ArduinoAuth.js](src/middlewares/ArduinoAuth.js)).

Actually controlling the A/C can only be done for authroized google email addresses as specified in config.js 

### requirements:

To prevent from strangers controling your A/C, we use google sign in to verify users. So you will need an API key from google at (https://developers.google.com/identity/sign-in/web/sign-in).


### Getting started

* npm install -g babel-node webpack
* cp src/config.sample.js to src/config.js
* edit config.js
* npm install
* npm run start-dev

##### For prod 
* set environment var NODE_ENV=production
* npm run build
* node public/main.js

Instead of setting NODE_ENV in environment var, you can add 
``
    process.env.NODE_ENV = 'production';
``
to your config.js


### Credits and acknowledgments:

#### icons:
* Snowflake by [Icon Works](https://www.flaticon.com/authors/icon-works) from www.flaticon.com 
* Drought by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com
* Fan by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com
* Magic want by [iconnice](https://www.flaticon.com/authors/iconnice) from www.flaticon.com
* Sun by [Lucy G](https://www.flaticon.com/authors/lucy-g) from www.flaticon.com
* Mode by [Robin Kylander](https://www.flaticon.com/authors/robin-kylander) from www.flaticon.com