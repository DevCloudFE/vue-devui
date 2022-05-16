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
    const btn = wrapper.find('.devui-button');
    expect(wrapper.find('.devui-popover__reference').exists()).toBeTruthy();
    expect(btn.exists()).toBeTruthy();
    await btn.trigger('click');
    const popoverContent = document.body.querySelector('.devui-popover__content');
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
    await wrapper.find('.devui-button').trigger('click');
    const popoverContent = document.body.querySelector('.devui-popover__content');
    expect(popoverContent?.firstElementChild?.className).toContain('devui-popover__icon');
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
    await wrapper.find('.devui-button').trigger('mouseenter');
    setTimeout(() => {
      const popoverContent = document.body.querySelector('.devui-popover__content');
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
    const popoverContent = document.body.querySelector('.devui-popover__content');
    expect(popoverContent).toBeTruthy();
    wrapper.unmount();
  });

  it('show event', async () => {
    const show = jest.fn();
    const wrapper = mount({
      setup() {
        return () => <DPopover content="default" onShow={show}>{{ reference: () => <d-button>default</d-button> }}</DPopover>;
      },
    });
    const btn = wrapper.find('.devui-button');
    await btn.trigger('click');
    expect(show).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('hide event', async () => {
    const hide = jest.fn();
    const wrapper = mount({
      setup() {
        return () => <DPopover content="default" onHide={hide}>{{ reference: () => <d-button>default</d-button> }}</DPopover>;
      },
    });
    const btn = wrapper.find('.devui-button');
    await btn.trigger('click');
    await btn.trigger('click');
    expect(hide).toHaveBeenCalled();
    wrapper.unmount();
  });
});
