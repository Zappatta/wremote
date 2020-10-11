<template>
    <v-app>
    <div class="main">
      <SettingsEditor v-model="settings" @change="settingsChanged"/>
      <MqttStatusBadge v-model="mqttStatus"/>
            <div class="actual-temp">
                <div class="temp-text">
                    <i class="flaticon-house-outline"></i><span>{{actualTemp}}</span>
                </div>

                <span class="last-update-time" v-if="lastUpdateDiff > (30 * 1000)">
                    updated "some time FIXME"
                </span>
            </div>
            <hr>

        <div class="control">

            <div class="desired-temp">
                <div class="temp-text">
                  <i class="flaticon-thermometer"></i> <span>{{acState.temperature}}</span>
                </div>
                <v-btn class="temp-change-button" icon @click="acState.temperature++">
                  <v-icon large>fa-arrow-up</v-icon>
                </v-btn>
                <v-btn class="temp-change-button" icon @click="acState.temperature--">
                  <v-icon large>fa-arrow-down</v-icon>
                </v-btn>

            </div>
            <hr>
            <v-btn @click="acState.power = !acState.power"
                   class="power-button"
                   :class="{'on' : acState.power}"
            >
                <v-icon >fa-power-off</v-icon>
            </v-btn>

            <fan-control v-model="acState.fan" @change="(newSpeed)=>{acState.fan = newSpeed}"/>

            <mode-control v-model="acState.mode" @change="(newMode)=>{acState.mode = newMode}"/>

        </div>
        <div class="send-container">
            <v-btn icon large class="send-button red" @click="sendStateToMqttServer()">
                <v-icon>fa-wifi</v-icon>
            </v-btn>
        </div>
      {{ settings }}
    </div>
    </v-app>
</template>
<script lang="ts">
import Vue from 'vue';
import {AirConditionerMode, AirConditionerState, MqttStatus, Settings,} from '@/types';
import mqtt from 'mqtt';
import FanControl from '../FanControl/index.vue';
import ModeControl from '../ModeControl/index.vue';
import SettingsEditor from '../Settings/SettingsEditor.vue';
import MqttStatusBadge from '../MqttStatusBadge/MqttStatusBadge.vue';

import './styles.scss';

let mqttClient: any;

export default Vue.extend({
  components: {
    FanControl,
    ModeControl,
    SettingsEditor,
    MqttStatusBadge,
  },
  data() {
    return {
      actualTemp: 0 as number,
      acState: {
        fan: 0,
        mode: AirConditionerMode.auto,
        temperature: 26,
        power: false,
      } as AirConditionerState,
      ambientTemperatureLastUpdatedAt: new Date() as Date,
      isConnectedToMqttServer: false as boolean,
      settings: {} as Settings,
      mqttStatus: MqttStatus.disconnected as MqttStatus,
    };
  },
  methods: {
    sendStateToMqttServer() {
      console.log(JSON.stringify(this.acState));
      mqttClient.publish(`/zappatta@gmail.com/ac/set`, `${(this.acState.power ? 1 : 0)},${this.acState.temperature},${this.acState.mode},${this.acState.fan}`);
    },
    settingsChanged(newSettings: Settings) {
      console.log('Settings changed', newSettings);
      const { address, user, password } = newSettings.mqttServerInfo;
      console.log('will connect', { address, user, password });
      mqttClient = mqtt.connect(address, {
        username: user,
        password,
      });

      mqttClient.on('connect', () => {
        this.mqttStatus = MqttStatus.connected;
        mqttClient.subscribe('/zappatta@gmail.com/ac/ambianceTemp');
      });

      mqttClient.on('message', (topic: string, message: string) => {
        if (topic === '/zappatta@gmail.com/ac/ambianceTemp') {
          console.log(message.toString());
          this.actualTemp = parseInt(message.toString(), 0);
        }
      });
    },
  },
  computed: {
    lastUpdateTime() {
      return 'fixme';
    },

    isArduinoUpdating() {
      if (new Date().getTime() - this.ambientTemperatureLastUpdatedAt.getTime() > 30 * 1000) {
        return false;
      }

      return true;
    },
  },
});
</script>
<style>
 #modes {
     display: flex;
     flex-direction: row;
 }

 /*flaticon adds 20px margin-left for some reason. Override it*/
 [class^="flaticon-"]:before, [class*=" flaticon-"]:before,
 [class^="flaticon-"]:after, [class*=" flaticon-"]:after {
     margin-left: 0px;
 }

</style>
