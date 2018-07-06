const vars = [
  "PORT",
  "AUTHORIZED_GOOGLE_EMAILS",
  "GOOGLE_CLIENT_ID",
  "G_ID_TOKEN_COOKIE_NAME",
]

let config = {}
vars.forEach((varName)=>{
  if(!process.env[varName]){
    console.error("Missing environment variable", varName)
  }

  config[varName] = process.env[varName]
})

module.exports = config;