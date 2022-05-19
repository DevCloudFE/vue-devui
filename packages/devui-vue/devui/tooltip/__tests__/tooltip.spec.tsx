import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Tooltip from '../src/tooltip';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('tooltip', true);
const buttonNs = useNamespace('button', true);

describe('d-tooltip', () => {
  it('should render correctly', async () => {
    const wrapper = mount({
      setup() {
        return () => <Tooltip content="tips text">{{ default: () => <d-button>top</d-button> }}</Tooltip>;
      },
    });
    const btn = wrapper.find(buttonNs.b());
    expect(btn.exists()).toBeTruthy();

    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const tooltipContent = document.querySelector(ns.b());
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
    const btn = wrapper.find(buttonNs.b());
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    const tooltipContent = document.querySelector(ns.b());
    expect(tooltipContent).toBeTruthy();

    await btn.trigger('mouseleave');
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    expect(document.querySelector(ns.b())).toBeFalsy();
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

    const btn = wrapper.find(buttonNs.b());
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const tooltipContent = document.querySelector(ns.b());
    expect(tooltipContent).toBeFalsy();

    await wrapper.setProps({
      disabled: false,
    });
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    expect(document.querySelector(ns.b())).toBeTruthy();

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

    const btn = wrapper.find(buttonNs.b());
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const tooltipContent = document.querySelector(ns.b());
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
    expect(document.querySelector(ns.b())).toBeFalsy();

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

    const btn = wrapper.find(buttonNs.b());
    await btn.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const tooltipContent = document.querySelector(ns.b());
    expect(tooltipContent).toBeTruthy();
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('mouseenter', true, true);
    const tooltip = document.querySelector(ns.b()) as HTMLElement;
    tooltip.dispatchEvent(evt);
    await nextTick();
    expect(document.querySelector(ns.b())).toBeTruthy();

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
    expect(document.querySelector(ns.b())).toBeFalsy();

    wrapper.unmount();
  });
});
