const fs = require('fs');

let conf = {};
if(fs.existsSync('./config/config.js')){
  conf = require('./config.js')
}
else {
  console.warn("No config.js files is found. assuming all config exists in environment variables")
}



module.exports = new Proxy({},{
  get(target, prop){
    let retVal = process.env[prop] || conf[prop]

    if(!retVal) {

      throw 'unable to find configuration ' + prop +' please make sure it is avalable either as env var or in config/config.js'
    }
    return retVal;
  }
})