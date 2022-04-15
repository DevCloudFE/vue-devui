import { mount } from '@vue/test-utils';
import Tooltip from '../src/tooltip';

describe('d-tooltip', () => {
  it('should render correctly', async () => {
    const wrapper = mount({
      setup() {
        return () => <Tooltip content="tips text">{{ default: () => <d-button>top</d-button> }}</Tooltip>;
      },
    });
    const btn = wrapper.find('.devui-btn');
    const reference = wrapper.find('.devui-tooltip-reference');
    expect(reference.exists()).toBeTruthy();
    expect(btn.exists()).toBeTruthy();

    await reference.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 150);
    });
    const tooltipContent = document.querySelector('.devui-tooltip');
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
    const reference = wrapper.find('.devui-tooltip-reference');
    await reference.trigger('mouseenter');
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    const tooltipContent = document.querySelector('.devui-tooltip');
    expect(tooltipContent).toBeTruthy();

    await reference.trigger('mouseleave');
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    expect(document.querySelector('.devui-tooltip')).toBeFalsy();
    wrapper.unmount();
  });
});
