<template>

  <div class="mqtt-info-editor">
    <v-text-field
      label="MQTT server address"
      hide-details="auto"
      :rules="[rules.Required]"
      v-model="value.address"
      @input="onInput()"
    ></v-text-field>
    <v-text-field label="MQTT server username" hide-details="auto" :rules="[rules.Required]"
                  v-model="value.user"
                  @input="onInput()"
    />
    <v-text-field label="MQTT server password" hide-details="auto"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  :rules="[rules.Required]"
                  v-model="value.password"
                  @input="onInput()"
    />
    <v-text-field label="MQTT subject prefix (optional)" hide-details="auto"
                  v-model="value.mqttSubjectPrefix"
                  @input="onInput()"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { MqttServerInfo } from '@/types';
import ValidationRules from '../../utils/InputValidationRules';

export default Vue.extend({
  name: 'MqttServerInfoEditor',
  props: {
    value: {
      type: Object as PropType<MqttServerInfo>,
      default() { return {}; },
    },
  },
  data: () => ({
    showPassword: false as boolean,
    rules: ValidationRules,
  }),
  methods: {
    onInput() {
      this.$emit('input', this.value);
    },
  },
});
</script>

<style scoped>

</style>
