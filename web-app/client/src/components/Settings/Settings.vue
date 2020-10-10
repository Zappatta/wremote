<template>

  <div>
    <v-btn
      icon type="button" class="settings-button"
      :class="{ 'attention': requiresAttention }"
      @click="showDialog = true"
    >
      <v-icon large>fa-cog</v-icon>
    </v-btn>
    <v-dialog
      v-model="showDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <div class="settings-modal">
        <v-toolbar
          color="white"
          flat
        >
          <v-btn
            icon
            light
            @click="showDialog = false"
          >
            <v-icon color="grey darken-2">
              mdi-arrow-left
            </v-icon>
          </v-btn>

          <v-toolbar-title class="grey--text text--darken-4">
            Settings
          </v-toolbar-title>
        </v-toolbar>
        <v-container>
          <MqttServerInfoEditor v-model="mqttServerInfo" @input="onMqttServerInfoChanged"/>
          <div>
            {{ this.mqttServerInfo }}
          </div>
        </v-container>
      </div>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {MqttServerInfo} from '@/types';
import MqttServerInfoEditor from './MqttServerInfoEditor.vue';

function isMqttInfoInvalid(mqttServerInfo: MqttServerInfo) {
  // eslint-disable-next-line arrow-body-style
  return ['address', 'user', 'password'].some((requiredMqttServerInfoKey) => {
    return !Object.hasOwnProperty.call(mqttServerInfo, requiredMqttServerInfoKey)
      || mqttServerInfo[requiredMqttServerInfoKey] === '';
  });
}
export default Vue.extend({
  name: 'Settings',
  components: { MqttServerInfoEditor },
  data() {
    return {
      requiresAttention: false,
      showDialog: false,
      mqttServerInfo: { } as MqttServerInfo,
    };
  },
  created() {
    this.mqttServerInfo = JSON.parse(localStorage.getItem('mqttServerInfo') || '{}');
    this.requiresAttention = isMqttInfoInvalid(this.mqttServerInfo);
  },
  methods: {
    onMqttServerInfoChanged(mqttServerInfo: MqttServerInfo) {
      localStorage.setItem('mqttServerInfo', JSON.stringify(mqttServerInfo));
      this.requiresAttention = isMqttInfoInvalid(this.mqttServerInfo);
    },
  },
});
</script>

<style scoped lang="scss" rel="stylesheet/scss">

.settings-button {
  background-color:white;
  position: absolute;
  top:5px;
  right: 5px;
  padding:25px;
  &.attention {
    ::after {
      color:white;
      background-color:red;
      content:"!";
      position: absolute;
      font-size:15px;
      font-weight: 900;
      width:20px;
      transform: translate(20px, 20px);
      border-radius: 50%;
    }
   }
}

.settings-modal {
  background-color:white;
  width:100%;
  height:100%;
}
</style>
