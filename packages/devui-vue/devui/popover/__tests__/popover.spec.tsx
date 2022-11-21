import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import DPopover from '../src/popover';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('popover', true);
const buttonNs = useNamespace('button', true);
const buttonBaseClass = buttonNs.b();
const popoverContentClass = ns.e('content');
const popoverIconClass = useNamespace('popover').e('icon');

describe('d-popover', () => {
  beforeEach(() => {
    const popoverContent = document.body.querySelector(popoverContentClass);
    popoverContent && popoverContent.parentNode?.removeChild(popoverContent);
  });

  it('visible', async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default">
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    const btn = wrapper.find(buttonBaseClass);
    expect(btn.exists()).toBeTruthy();
    await btn.trigger('click');
    const popoverContent = document.body.querySelector(popoverContentClass);
    expect(popoverContent).toBeTruthy();
    expect(popoverContent?.firstElementChild?.innerHTML).toBe('default');
    wrapper.unmount();
  });

  it('pop-type', async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <DPopover content="info" pop-type="info">
            <d-button>info</d-button>
          </DPopover>
        );
      },
    });
    await wrapper.find(buttonBaseClass).trigger('click');
    const popoverContent = document.body.querySelector(popoverContentClass);
    expect(popoverContent?.firstElementChild?.className).toContain(popoverIconClass);
    wrapper.unmount();
  });

  it('trigger hover', async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" trigger="hover">
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    await wrapper.find(buttonBaseClass).trigger('mouseenter');
    await new Promise(resolve => setTimeout(resolve, 500));
    const popoverContent = document.body.querySelector(popoverContentClass);
    expect(popoverContent).toBeTruthy();
  });

  it('trigger manually', async () => {
    const isOpen = ref(false);
    const wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" is-open={isOpen.value} trigger="manually">
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    isOpen.value = true;
    await nextTick();
    const popoverContent = document.body.querySelector(popoverContentClass);
    expect(popoverContent).toBeTruthy();
    wrapper.unmount();
  });

  it('show event', async () => {
    const show = jest.fn();
    const wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" onShow={show}>
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    const btn = wrapper.find(buttonBaseClass);
    await btn.trigger('click');
    expect(show).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('hide event', async () => {
    const hide = jest.fn();
    const wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" onHide={hide}>
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    const btn = wrapper.find(buttonBaseClass);
    await btn.trigger('click');
    await btn.trigger('click');
    expect(hide).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('popover disabled work', async () => {
    const disabled = ref(false);
    const wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" trigger="hover" disabled={disabled.value}>
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    await wrapper.find(buttonBaseClass).trigger('mouseenter');
    await new Promise(resolve => setTimeout(resolve, 500));
    let popoverContent = document.body.querySelector(popoverContentClass);
    expect(popoverContent).toBeTruthy();
    disabled.value = true;
    await nextTick();
    popoverContent = document.body.querySelector(popoverContentClass);
    expect(popoverContent).toBeFalsy();
    wrapper.unmount();
  });

  it.todo('props position work well.');

  it.todo('props align work well.');

  it.todo('props offset work well.');

  it.todo('props mouse-enter-delay work well.');

  it.todo('props mouse-leave-delay work well.');
});
