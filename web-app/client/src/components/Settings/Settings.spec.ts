import { mount } from '@vue/test-utils';
import SettingsEditor from './SettingsEditor.vue';
import MqttServerInfoEditor from './MqttServerInfoEditor.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
let vuetify : any = new Vuetify({});

describe('SettingsEditor SCENARIO: Loading with empty state and the setting info', () => {
  beforeEach(() => {
    vuetify = new Vuetify({});
  })

  const wrapper = mount(SettingsEditor, {
    propsData: {
      value: {
        mqttServerInfo: {}
      }
    },
    vuetify,
  });

  test('not having mqttServerInfo displays ! badge', async () => {
    await wrapper.setProps({
      value: {}
    })
    expect(wrapper.find('.settings-button').classes()).toContain('attention')
  });

  test('clicking on button shows dialog', async () => {
    await wrapper.find('.settings-button').trigger('click');
    expect(wrapper.find('.settings-modal').isVisible()).toBe(true);
  });

  test('Entering removes the ! badge and saves to localStorage', async () => {

    await wrapper.trigger('click');

    const mqttServerInfoEditor = wrapper.findComponent(MqttServerInfoEditor);

    await mqttServerInfoEditor.vm.$emit('input',
      {
        address: 'www.example.com',
        user: 'cowUser',
        password: 'moo'
      })


    expect(wrapper.find('.settings-button').classes()).not.toContain('attention')
    const settingsSavedToLocalStorage = localStorage.getItem('mqttServerInfo') || ''
    expect(JSON.parse(settingsSavedToLocalStorage)).toEqual({
      address: 'www.example.com',
      user: 'cowUser',
      password: 'moo'
    })

  });
});

describe('SettingsEditor SCENARIO: Loading with stored settings', () => {
  beforeEach(() => {
    vuetify = new Vuetify({});
  })

  localStorage.setItem('mqttServerInfo', JSON.stringify({
    address: 'www.example.com',
    user: 'cowUser',
    password: 'moo'
  }));

  const wrapper = mount(SettingsEditor, {
    propsData: {
      value: {
        mqttServerInfo: {}
      }
    },
    vuetify,
  });

  test('having mqttServerInfo, so no badge is displayed', async () => {
    await wrapper.setProps({
      value: {}
    })
    expect(wrapper.find('.settings-button').classes()).not.toContain('attention')
  });

});
