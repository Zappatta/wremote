import { mount } from '@vue/test-utils';
import FanControl from './index.vue';
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('FanControl: Buttons emit changeevent', () => {
  const wrapper = mount(FanControl);

  test('button 1', async ()=> {
    const button1 = wrapper.find('.button-1');
    await button1.trigger('click');
    expect(wrapper.emitted().change).toContainEqual([0]);
  });

  test('button 2', async ()=> {
    const button2 = wrapper.find('.button-2');
    await button2.trigger('click');
    expect(wrapper.emitted().change).toContainEqual([1]);
  });

  test('button 3', async ()=> {
    const button3 = wrapper.find('.button-3');
    await button3.trigger('click');
    expect(wrapper.emitted().change).toContainEqual([2]);
  });

  test('button 4', async ()=> {
    const button4 = wrapper.find('.button-4');
    await button4.trigger('click');
    expect(wrapper.emitted().change).toContainEqual([3]);
  });

})
