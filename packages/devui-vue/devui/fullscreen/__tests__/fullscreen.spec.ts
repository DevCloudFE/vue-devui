import { mount, VueWrapper } from '@vue/test-utils';
import { ref, nextTick } from 'vue';

describe('fullscreen', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount({
      template: `
        <d-fullscreen :mode='"normal"' @fullscreenLaunch='fullscreenLaunch'>
          <div fullscreen-target>
            <button test fullscreen-launch>{{btnContent}}</button>
          </div>
        </d-fullscreen>
      `,
      setup() {
        const btnContent = ref('FullScreen');
        const fullscreenLaunch = (val) => {
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

  // 判断属性
  it('attr', () => {
    expect(wrapper.attributes('mode')).toBe('normal');
  });
});
