import { mount, VueWrapper } from '@vue/test-utils';
import { h, ref, nextTick, ComponentPublicInstance } from 'vue';
import Dfullscreen from "../src/fullscreen";

describe('fullscreen', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  beforeEach(() => {
    wrapper = mount({
      components: {
        'd-fullscreen': Dfullscreen
      },
      template: `
        <d-fullscreen :mode='"normal"' @fullscreenLaunch='fullscreenLaunch'>
          <div fullscreen-target>
            <button test fullscreen-launch>{{btnContent}}</button>
          </div>
        </d-fullscreen>
      `,
      setup() {
        const btnContent = ref('FullScreen');
        const fullscreenLaunch = (val: boolean) => {
          if (val) {
            btnContent.value = 'Exit';
          } else {
            btnContent.value = 'FullScreen';
          }
        };
        return {
          btnContent,
          fullscreenLaunch
        };
      }
    });
  });

  // 样式判断
  it('judge html class correctly', async () => {

    // 初始样式
    expect(document.getElementsByTagName('html')[0].classList.value).toEqual('');
    // 点击之后，增加class
    await wrapper.find('[test]').trigger('click');
    await nextTick();
    expect(document.getElementsByTagName('html')[0].classList.value).not.toContain('devui-fullscreen');

    // 再次点击，删除class
    await wrapper.find('[test]').trigger('click');
    await nextTick();
    expect(document.getElementsByTagName('html')[0].classList.value).toEqual('');
  });

  it('mode attribute shoule be rendered correctly', async () => {
    const innerWrapper = mount(Dfullscreen, {
      props: {
        modelValue: false,
      },
    });

    await innerWrapper.setProps({ modelValue: true });
    expect(innerWrapper.classes()).toContain('devui-fullscreen');
    await innerWrapper.setProps({ modelValue: false });

    await innerWrapper.setProps({ mode: 'immersive',modelValue: true  });
    expect(innerWrapper.classes().length).toBe(0);
  });

  it('z-index attribute shoule be rendered correctly', async () => {
    const innerWrapper = mount(Dfullscreen, {
      props: {
        modelValue: false,
        zIndex: 100
      },
    });

    await innerWrapper.setProps({ modelValue: true });
    expect(innerWrapper.attributes('style')).toContain('z-index: 100');
  });

  it('slot shoule be rendered correctly', async () => {
    const innerWrapper = mount(Dfullscreen, {
      props: {
        modelValue: false
      },
      slots: {
        default: () => h('div', { id: 'defaultSlot'}, 'I am Fullscreen.')
      }
    });
    const dom = innerWrapper.find('#defaultSlot');

    expect(dom.exists()).toBeTruthy();
    expect(dom.element.textContent).toBe('I am Fullscreen.');
  });
});
