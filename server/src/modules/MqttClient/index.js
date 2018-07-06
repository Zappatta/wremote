import config from "../../../config/config"
const mqtt = require('mqtt')
import state from '../State/State'

class MqttClient {
  constructor() {
    console.log('Connecting to MQTT server');
    this.client = mqtt.connect(config.MQTT_URL)

    this.client.on('end', function () {
      console.log('Reconnecting to MQTT server');
      this.client.reconnect();
    })
    
    this.client.on('connect',  () => {
      console.log('Connected to MQTT Server');
      this.client.publish("presence", "wremote on")
      console.log('subscribing', config.MQTT_SUBJECT_PREFIX+"ambianceTemp");
      this.client.subscribe(config.MQTT_SUBJECT_PREFIX +"ambianceTemp")
    })

    this.client.on('message', (topic, message) => {
      // message is Buffer
      // console.log(message.toString())
      if(topic === config.MQTT_SUBJECT_PREFIX+'ambianceTemp') {
        console.log('Got MQTT Temp', message.toString());
        state.actualTemp = message.toString();
        state.lastArduinoUpdateTime = new Date().getTime()
      }
    })
  };

  setTemprature(power,desiredTemp,mode,fan){
    this.client.publish(config.MQTT_SUBJECT_PREFIX + 'set',`${power},${desiredTemp},${mode},${fan}`)
  }
}

export default new MqttClient();