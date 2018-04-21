module.exports = {
  PORT: 8080,
  AUTHORIZED_GOOGLE_EMAILS : ['You@example.com'],
  GOOGLE_CLIENT_ID  : "YOUR_GOOGLE_CLIENT_TOKEN",
  G_ID_TOKEN_COOKIE_NAME : 'g_id_token', //probably no need to change this one unless google changes their cookie name
  AUTHORIZED_ARDIUNO_DNS_NAME : 'your.dynamic.dns',//see ArduinoAuth.js
}