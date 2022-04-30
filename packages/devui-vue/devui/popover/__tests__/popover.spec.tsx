import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import DPopover from '../src/popover';

describe('d-popover', () => {
  it('visible', async () => {
    const wrapper = mount({
      setup() {
        return () => <DPopover content="default">{{ reference: () => <d-button>default</d-button> }}</DPopover>;
      },
    });
    const btn = wrapper.find('.devui-btn');
    expect(wrapper.find('.devui-popover-reference').exists()).toBeTruthy();
    expect(btn.exists()).toBeTruthy();
    await btn.trigger('click');
    const popoverContent = document.body.querySelector('.devui-popover-content');
    expect(popoverContent).toBeTruthy();
    expect(popoverContent?.firstElementChild?.innerHTML).toBe('default');
    wrapper.unmount();
  });

  it('pop-type', async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <DPopover content="info" pop-type="info">
            {{ reference: () => <d-button>info</d-button> }}
          </DPopover>
        );
      },
    });
    await wrapper.find('.devui-btn').trigger('click');
    const popoverContent = document.body.querySelector('.devui-popover-content');
    expect(popoverContent?.firstElementChild?.className).toContain('devui-popover-icon');
    wrapper.unmount();
  });

  it('trigger hover', async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" trigger="hover">
            {{ reference: () => <d-button>default</d-button> }}
          </DPopover>
        );
      },
    });
    await wrapper.find('.devui-btn').trigger('mouseenter');
    setTimeout(() => {
      const popoverContent = document.body.querySelector('.devui-popover-content');
      expect(popoverContent).toBeTruthy();
      wrapper.unmount();
    }, 150);
  });

  it('trigger manually', async () => {
    const isOpen = ref(false);
    const wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" is-open={isOpen.value} trigger="manually">
            {{ reference: () => <d-button>default</d-button> }}
          </DPopover>
        );
      },
    });
    isOpen.value = true;
    await nextTick();
    const popoverContent = document.body.querySelector('.devui-popover-content');
    expect(popoverContent).toBeTruthy();
    wrapper.unmount();
  });
});
