import { mount } from '@vue/test-utils';
import MqttStatusBadge from './MqttStatusBadge.vue';
import Vue from 'vue'
import Vuetify from 'vuetify'
import { MqttStatus } from '@/types';

Vue.use(Vuetify)

describe('MqttStatusBadge. Diplays different icon for connection state', () => {
  const wrapper = mount(MqttStatusBadge);
  const connectedIcon = wrapper.find('#mqtt-status-connected');
  const connectingIcon = wrapper.find('#mqtt-status-connecting');
  const disconnectedIcon = wrapper.find('#mqtt-status-disconnected');

  test('sconnected state', async ()=> {
    await wrapper.setProps({
      value: MqttStatus.connected,
    })

    expect(connectedIcon.isVisible()).toBe(true);
    expect(connectingIcon.isVisible()).toBe(false);
    expect(disconnectedIcon.isVisible()).toBe(false);
  });

  test('connecting state', async ()=> {
    await wrapper.setProps({
      value: MqttStatus.connecting,
    })

    expect(connectedIcon.isVisible()).toBe(false);
    expect(connectingIcon.isVisible()).toBe(true);
    expect(disconnectedIcon.isVisible()).toBe(false);
  });

  test('disconnected state', async ()=> {
    await wrapper.setProps({
      value: MqttStatus.disconnected,
    })

    expect(connectedIcon.isVisible()).toBe(false);
    expect(connectingIcon.isVisible()).toBe(false);
    expect(disconnectedIcon.isVisible()).toBe(true);
  });

})

