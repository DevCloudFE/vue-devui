import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import DPopover from '../src/popover';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Placement } from '../src/popover-types';
import { wait } from '../../shared/utils';

const ns = useNamespace('popover', true);
const buttonNs = useNamespace('button', true);
const buttonBaseClass = buttonNs.b();
const popoverContentClass = ns.e('content');
const popoverIconClass = useNamespace('popover').e('icon');
const popoverArrowClass = '.devui-flexible-overlay__arrow';

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
    await wait(500);
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
    await wait(500);
    let popoverContent = document.body.querySelector(popoverContentClass);
    expect(popoverContent).toBeTruthy();
    disabled.value = true;
    await nextTick();
    popoverContent = document.body.querySelector(popoverContentClass);
    expect(popoverContent).toBeFalsy();
    wrapper.unmount();
  });

  it('props position work well.', async () => {
    let position = ref<Array<Placement>>(['top']);
    let wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" trigger="click" position={position.value}>
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    await wrapper.find(buttonBaseClass).trigger('click');
    await wait(500);
    expect(document.querySelector(popoverArrowClass)?.style.bottom).toBe('-4px');
    const popoverContent = document.querySelector(popoverContentClass);
    expect(popoverContent?.getAttribute('style')?.includes('transform-origin: 50% calc(100% + 8px)')).toBe(true);
    wrapper.unmount();

    position = ref<Array<Placement>>(['bottom']);
    wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" trigger="click" position={position.value}>
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    await wrapper.find(buttonBaseClass).trigger('click');
    await wait(500);
    expect(document.querySelector(popoverArrowClass)?.style.top).toBe('-4px');
    expect(document.querySelector(popoverContentClass)?.getAttribute('style')?.includes('transform-origin: 50% -8px')).toBe(true);
    wrapper.unmount();

    position = ref<Array<Placement>>(['left']);
    wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" trigger="click" position={position.value}>
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    await wrapper.find(buttonBaseClass).trigger('click');
    await wait(500);
    expect(document.querySelector(popoverArrowClass)?.style.right).toBe('-4px');
    expect(document.querySelector(popoverContentClass)?.getAttribute('style')?.includes('transform-origin: calc(100% + 8px)')).toBe(true);
    wrapper.unmount();

    position = ref<Array<Placement>>(['right']);
    wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" trigger="click" position={position.value}>
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    await wrapper.find(buttonBaseClass).trigger('click');
    await wait(500);
    expect(document.querySelector(popoverArrowClass)?.style.left).toBe('-4px');
    expect(document.querySelector(popoverContentClass)?.getAttribute('style')?.includes('transform-origin: -8px 50%')).toBe(true);
    wrapper.unmount();

    position = ref<Array<Placement>>(['right-start']);
    wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" trigger="click" position={position.value} align="start">
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    await wrapper.find(buttonBaseClass).trigger('click');
    await wait(500);
    expect(document.querySelector(popoverArrowClass)?.style.left).toBe('-4px');
    expect(document.querySelector(popoverContentClass)?.getAttribute('style')?.includes('transform-origin: -8px 50%')).toBe(true);
    wrapper.unmount();

    position = ref<Array<Placement>>(['right-end']);
    wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" trigger="click" position={position.value} align="end">
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    await wrapper.find(buttonBaseClass).trigger('click');
    await wait(500);
    expect(document.querySelector(popoverArrowClass)?.style.left).toBe('-4px');
    expect(document.querySelector(popoverContentClass)?.getAttribute('style')?.includes('transform-origin: -8px 50%')).toBe(true);
    wrapper.unmount();
  });

  it.todo('props align work well.');

  it('props mouse-enter-delay work well.', async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" trigger="hover" mouse-enter-delay={1500}>
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    await wrapper.find(buttonBaseClass).trigger('mouseenter');
    await wait(500);
    expect(document.querySelector(popoverContentClass)).toBeFalsy();
    await wait(1100);
    expect(document.querySelector(popoverContentClass)).toBeTruthy();
    wrapper.unmount();
  });

  it('props mouse-leave-delay work well.', async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <DPopover content="default" trigger="hover" mouse-leave-delay={1500}>
            <d-button>default</d-button>
          </DPopover>
        );
      },
    });
    await wrapper.find(buttonBaseClass).trigger('mouseenter');
    await wait(500);
    expect(document.querySelector(popoverContentClass)).toBeTruthy();
    await wrapper.find(buttonBaseClass).trigger('mouseleave');
    await wait(500);
    expect(document.querySelector(popoverContentClass)).toBeTruthy();
    await wait(1100);
    expect(document.querySelector(popoverContentClass)).toBeFalsy();
    wrapper.unmount();
  });
});
