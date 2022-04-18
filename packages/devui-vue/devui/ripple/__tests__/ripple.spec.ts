import { nextTick, createApp } from 'vue';
import { mount } from '@vue/test-utils';
import Ripple from '../index';
import { DEFAULT_PLUGIN_OPTIONS } from '../src/options';
// 全局属性
const global = {
  directives: {
    ripple: Ripple
  }
};
describe('ripple', () => {
  it('ripple should render correctly', async () => {
    const wrapper = mount(
      {
        template: `
          <div class="ripple-container" style="width: 100px; height: 100px" v-ripple></div>
        `
      },
      {
        global
      }
    );
    await nextTick();
    const rippleElement = wrapper.find('.ripple-container');
    await rippleElement.trigger('click');

    expect(wrapper.find('div').exists()).toBeTruthy();
  });
  it('test ripple plugin', () => {
    const app = createApp({}).use(Ripple);
    expect(app.directive('ripple', Ripple)).toBeTruthy();
  });

  it('ripple default options', () => {
    expect(DEFAULT_PLUGIN_OPTIONS).toEqual({
      directive: 'ripple',
      color: 'currentColor',
      initialOpacity: 0.2,
      finalOpacity: 0.1,
      duration: 0.8,
      easing: 'ease-out',
      delayTime: 75,
      disabled: false
    });
  });
});
