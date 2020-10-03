<template>
    <v-app>
    <div class="main">

            <div class="actual-temp">

                <div class="temp-text">
                    <i class="flaticon-house-outline"></i><span>{{actualTemp}}</span>
                </div>

                <span class="last-update-time" v-if="lastUpdateDiff > (30 * 1000)">
                    updated {{lastUpdateDiffInWords}}
                </span>
            </div>
            <hr>

        <div class="control">

            <div class="desired-temp">
                <div class="temp-text">
                  <i class="flaticon-thermometer"></i> <span>{{desiredTemp}}</span>
                </div>
                <v-btn class="temp-change-button" icon @click="desiredTemp++">
                  <v-icon large>fa-arrow-up</v-icon>
                </v-btn>
                <v-btn class="temp-change-button" icon @click="desiredTemp--">
                  <v-icon large>fa-arrow-down</v-icon>
                </v-btn>

            </div>
            <hr>
            <v-btn @click="power = !power" class="power-button" :class="{'on' : power}">
                <v-icon >fa-power-off</v-icon>
            </v-btn>

            <fan-control v-model="fan" @change="(newSpeed)=>{this.fan = newSpeed}"></fan-control>

            <mode-control v-model="mode" @change="(newMode)=>{this.mode = newMode}"></mode-control>

        </div>
        <div class="send-container">
            <v-btn icon large class="send-button red" @click="updateServerWithState()">
                <v-icon>fa-wifi</v-icon>
            </v-btn>
        </div>

    </div>
    </v-app>
</template>
<script>
// import moment from 'moment';
import FanControl from '../FanControl/index.vue';
import ModeControl from '../ModeControl/index.vue';

import './styles.scss';

export default {
  components: {
    FanControl,
    ModeControl,
  },
  data() {
    return {
      actualTemp: 0,
      desiredTemp: 26,
      power: false,
      fan: 2,
      mode: 1,
      isOn: 1,
      isOff: 0,
      lastArduinoUpdateTime: null,
      lastUpdateDiff: null,
      lastUpdateDiffInWords: 'Never',
    };
  },
  created() {
    const updateTemp = (state) => {
      this.actualTemp = state.actualTemp;
      this.lastArduinoUpdateTime = state.lastArduinoUpdateTime;
      this.lastUpdateDiff = new Date().getTime() - state.lastArduinoUpdateTime;
      this.lastUpdateDiffInWords = 'FIXME';// moment(this.lastArduinoUpdateTime, 'x').fromNow();
    };

    const getInfoFromSever = () => {
      fetch('/rest/state', { credentials: 'same-origin' }).then((fetchRes) => {
        fetchRes.json().then((state) => {
          this.power = state.power !== 0;
          this.fan = state.fan;
          this.mode = state.mode;

          updateTemp(state);
        });
      });
    };

    const getTempFromServer = () => {
      fetch('/rest/state', { credentials: 'same-origin' }).then((fetchRes) => {
        fetchRes.json().then((state) => {
          updateTemp(state);
        });
      });
    };

    getInfoFromSever();
    setInterval(getTempFromServer, 5000);
  },
  methods: {
    updateServerWithState() {
      const {
        actualTemp, desiredTemp, power, fan, mode,
      } = this;

      fetch('/rest/state', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          actualTemp, desiredTemp, power: power ? 1 : 0, fan, mode,
        }),
      });
    },
  },
  computed: {
    lastUpdateTime() {
      if (!this.lastArduinoUpdateTime) {
        return 'never';
      }
      return 'fixme';// moment(this.lastArduinoUpdateTime, 'x').fromNow();
    },
    isArduinoUpdating() {
      if (new Date().getTime() - this.lastArduinoUpdateTime > 30 * 1000) {
        return false;
      }

      return true;
    },
  },
};
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
