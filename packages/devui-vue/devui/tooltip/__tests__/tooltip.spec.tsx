import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Tooltip from '../src/tooltip';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { transformOriginMap } from '../src/use-tooltip';
import { BasePlacement } from '../src/tooltip-types';

const ns = useNamespace('tooltip', true);
const buttonNs = useNamespace('button', true);

const buttonClass = buttonNs.b();
const tootipClass = ns.b();
const tooltipPositionClassMap: Record<BasePlacement, string> = {
  top: ns.m('top'),
  right: ns.m('right'),
  bottom: ns.m('bottom'),
  left: ns.m('left'),
};

describe('d-tooltip', () => {
  it('should render correctly', async () => {
    const wrapper = mount({
      setup() {
        return () => <Tooltip content="tips text">{{ default: () => <d-button>top</d-button> }}</Tooltip>;
      },
    });
    const btn = wrapper.find(buttonClass);
    expect(btn.exists()).toBeTruthy();

    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const tooltipContent = document.querySelector(tootipClass);
    expect(tooltipContent).toBeTruthy();
    expect(tooltipContent?.innerHTML).toContain('tips text');
    wrapper.unmount();
  });

  it('mouse enter delay & mouse leave delay', async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <Tooltip content="tips text" mouse-enter-delay={500} mouse-leave-delay={500}>
            {{ default: () => <d-button>top</d-button> }}
          </Tooltip>
        );
      },
    });
    const btn = wrapper.find(buttonClass);
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    const tooltipContent = document.querySelector(tootipClass);
    expect(tooltipContent).toBeTruthy();

    await btn.trigger('mouseleave');
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    expect(document.querySelector(tootipClass)).toBeFalsy();
    wrapper.unmount();
  });

  it('tooltip disabled work', async () => {
    const wrapper = mount(
      {
        setup() {
          return () => <Tooltip content="tips text">{{ default: () => <d-button>top</d-button> }}</Tooltip>;
        },
      },
      {
        props: {
          disabled: true,
        },
      }
    );

    const btn = wrapper.find(buttonClass);
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const tooltipContent = document.querySelector(tootipClass);
    expect(tooltipContent).toBeFalsy();

    await wrapper.setProps({
      disabled: false,
    });
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    expect(document.querySelector(tootipClass)).toBeTruthy();

    wrapper.unmount();
  });

  it('tooltip hide-after work', async () => {
    const wrapper = mount(
      {
        setup() {
          return () => <Tooltip content="tips text">{{ default: () => <d-button>top</d-button> }}</Tooltip>;
        },
      },
      {
        props: {
          'hide-after': 0,
        },
      }
    );

    const btn = wrapper.find(buttonClass);
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const tooltipContent = document.querySelector(tootipClass);
    expect(tooltipContent).toBeTruthy();
    await btn.trigger('mouseleave');
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });

    await wrapper.setProps({
      'hide-after': 1000,
    });
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    expect(document.querySelector(tootipClass)).toBeFalsy();

    wrapper.unmount();
  });

  it('mouse enter enterable', async () => {
    const wrapper = mount(
      {
        setup() {
          return () => <Tooltip content="tips text">{{ default: () => <d-button>top</d-button> }}</Tooltip>;
        },
      },
      {
        props: {
          enterable: true,
        },
      }
    );

    const btn = wrapper.find(buttonClass);
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const tooltipContent = document.querySelector(tootipClass);
    expect(tooltipContent).toBeTruthy();
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('mouseenter', true, true);
    const tooltip = document.querySelector(tootipClass) as HTMLElement;
    tooltip.dispatchEvent(evt);
    await nextTick();
    expect(document.querySelector(tootipClass)).toBeTruthy();

    await wrapper.setProps({
      enterable: false,
    });
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    expect(tooltipContent).toBeTruthy();
    tooltip.dispatchEvent(evt);
    await nextTick();
    expect(document.querySelector(tootipClass)).toBeFalsy();

    wrapper.unmount();
  });

  it('props position work well.', async () => {
    const wrapper = mount({
      setup() {
        return () => <Tooltip content="tips text">{{ default: () => <d-button>top</d-button> }}</Tooltip>;
      },
    });
    const btn = wrapper.find(buttonClass);
    expect(btn.exists()).toBeTruthy();

    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    let tooltipContent: HTMLElement | null = document.querySelector(tootipClass);
    expect(tooltipContent).toBeTruthy();
    // 默认为 top
    expect(tooltipContent?.classList.contains(tooltipPositionClassMap['top']));
    expect(tooltipContent?.style.transformOrigin).toBe(transformOriginMap['top']);
    await btn.trigger('mouseleave');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });

    await wrapper.setProps({
      position: 'top',
    });
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    tooltipContent = document.querySelector(tootipClass);
    expect(tooltipContent).toBeTruthy();
    expect(tooltipContent?.classList.contains(tooltipPositionClassMap['top']));
    expect(tooltipContent?.style.transformOrigin).toBe(transformOriginMap['top']);
    await btn.trigger('mouseleave');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });

    await wrapper.setProps({
      position: 'right',
    });
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    tooltipContent = document.querySelector(tootipClass);
    expect(tooltipContent).toBeTruthy();
    expect(tooltipContent?.classList.contains(tooltipPositionClassMap['right']));
    expect(tooltipContent?.style.transformOrigin).toBe(transformOriginMap['right']);
    await btn.trigger('mouseleave');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });

    await wrapper.setProps({
      position: 'bottom',
    });
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    tooltipContent = document.querySelector(tootipClass);
    expect(tooltipContent).toBeTruthy();
    expect(tooltipContent?.classList.contains(tooltipPositionClassMap['bottom']));
    expect(tooltipContent?.style.transformOrigin).toBe(transformOriginMap['bottom']);
    await btn.trigger('mouseleave');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });

    await wrapper.setProps({
      position: 'left',
    });
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    tooltipContent = document.querySelector(tootipClass);
    expect(tooltipContent).toBeTruthy();
    expect(tooltipContent?.classList.contains(tooltipPositionClassMap['left']));
    expect(tooltipContent?.style.transformOrigin).toBe(transformOriginMap['left']);

    wrapper.unmount();
  });
});
