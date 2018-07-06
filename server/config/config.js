const vars = [
  "PORT",
  "AUTHORIZED_GOOGLE_EMAILS",
  "GOOGLE_CLIENT_ID",
  "G_ID_TOKEN_COOKIE_NAME",
  "MQTT_URL",
  "MQTT_SUBJECT_PREFIX",
]

let config = {}
vars.forEach((varName)=>{
  if(!process.env[varName]){
    console.error("Missing environment variable", varName)
  }

  config[varName] = process.env[varName]
})

module.exports = config;