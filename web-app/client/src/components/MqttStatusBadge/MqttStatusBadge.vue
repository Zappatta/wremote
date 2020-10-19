<template>
  <div class="mqtt-status-badge">
    <h6>MQTT:</h6>
    <v-icon large color="green" v-show="value === MqttStatus.connected">fa-link</v-icon>
    <v-icon large color="orange" v-show="value === MqttStatus.connecting">fa-ellipsis-v</v-icon>
    <v-icon large color="red" v-show="value === MqttStatus.disconnected">fa-unlink</v-icon>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {MqttStatus} from '@/types';

export default Vue.extend({
  name: 'MqttStatusBadge',
  props: {
    value: { type: Number as PropType<MqttStatus> },
  },
  data() {
    return { MqttStatus };
  },
});
</script>

<style scoped>
.mqtt-status-badge {
  position: absolute;
  top:5px;
  left: 5px;
}
</style>
