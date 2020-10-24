import { mount } from '@vue/test-utils';
import ModeControl from './index.vue';
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('ModeControl: Buttons emit change event', () => {
  const wrapper = mount(ModeControl);

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

describe('ModeControl: State changes css', () => {
  const wrapper = mount(ModeControl);
  const button1 = wrapper.find('.button-1');
  const button2 = wrapper.find('.button-2');
  const button3 = wrapper.find('.button-3');
  const button4 = wrapper.find('.button-4');

  test('button 1', async ()=> {
    await wrapper.setProps({
      value: 0
    })

    expect(button1.classes('v-btn--active')).toBe(true);
    expect(button2.classes('v-btn--active')).toBe(false);
    expect(button3.classes('v-btn--active')).toBe(false);
    expect(button4.classes('v-btn--active')).toBe(false);
  });

  test('button 2', async ()=> {
    await wrapper.setProps({
      value: 1
    })

    expect(button1.classes('v-btn--active')).toBe(false);
    expect(button2.classes('v-btn--active')).toBe(true);
    expect(button3.classes('v-btn--active')).toBe(false);
    expect(button4.classes('v-btn--active')).toBe(false);
  });

  test('button 3', async ()=> {
    await wrapper.setProps({
      value: 2
    })

    expect(button1.classes('v-btn--active')).toBe(false);
    expect(button2.classes('v-btn--active')).toBe(false);
    expect(button3.classes('v-btn--active')).toBe(true);
    expect(button4.classes('v-btn--active')).toBe(false);
  });

  test('button 4', async ()=> {
    await wrapper.setProps({
      value: 3
    })

    expect(button1.classes('v-btn--active')).toBe(false);
    expect(button2.classes('v-btn--active')).toBe(false);
    expect(button3.classes('v-btn--active')).toBe(false);
    expect(button4.classes('v-btn--active')).toBe(true);
  });

});
