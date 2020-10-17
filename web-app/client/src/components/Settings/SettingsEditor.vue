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
            @click="onBackButtonClicked()"
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
          <MqttServerInfoEditor v-model="value.mqttServerInfo" @input="onMqttServerInfoChanged"/>
        </v-container>
      </div>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { MqttServerInfo, Settings } from '@/types';
import MqttServerInfoEditor from './MqttServerInfoEditor.vue';

function isMqttInfoInvalid(mqttServerInfo: MqttServerInfo) {
  // eslint-disable-next-line arrow-body-style
  return ['address', 'user', 'password'].some((key) => {
    return !Object.hasOwnProperty.call(mqttServerInfo, key)
      || (mqttServerInfo as any)[key] === '';
  });
}
export default Vue.extend({
  name: 'SettingsEditor',
  components: { MqttServerInfoEditor },
  props: {
    value: { type: Object as PropType<Settings> },
  },
  data() {
    return {
      requiresAttention: false,
      showDialog: false,
    };
  },
  created() {
    this.value.mqttServerInfo = JSON.parse(localStorage.getItem('mqttServerInfo') || '{}');
    this.requiresAttention = isMqttInfoInvalid(this.value.mqttServerInfo);
    this.$emit('change', this.value);
  },
  methods: {
    onMqttServerInfoChanged(mqttServerInfo: MqttServerInfo) {
      localStorage.setItem('mqttServerInfo', JSON.stringify(mqttServerInfo));
      this.requiresAttention = isMqttInfoInvalid(this.value.mqttServerInfo);
    },
    onBackButtonClicked() {
      this.showDialog = false;
      this.$emit('change', this.value);
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
