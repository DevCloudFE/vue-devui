import { mount } from '@vue/test-utils';
import DBadge from '../src/badge';

const SLOT = 'This is a slot test';

describe('badge', () => {
  it('badge base', () => {
    const wrapper = mount(DBadge, {
      props: { count: 80 },
      slots: { default: SLOT }
    });
    expect(wrapper.vm.count).toEqual(80);
  });

  it('badge dot', () => {
    const wrapper = mount(DBadge, {
      props: { showDot: true },
      slots: { default: SLOT }
    });
    expect(wrapper.find('.devui-badge-content.devui-badge-content-dot').exists()).toBe(true);
  });

  it('badge max', () => {
    const wrapper = mount(DBadge, {
      props: { count: 100 }
    });
    expect(wrapper.find('.devui-badge-content').text()).toBe('99+');

    const wrapper2 = mount(DBadge, {
      props: { count: 100, maxCount: 1000 }
    });
    expect(wrapper2.find('.devui-badge-content').text()).toBe('100');
  });

  it('badge bgColor', () => {
    const wrapper = mount(DBadge, {
      props: { bgColor: 'red' },
      slots: { default: SLOT }
    });
    expect(wrapper.find('.devui-badge-content').attributes().style).toBe('background: red;');
  });

  it('badge offsetXY', () => {
    const wrapper = mount(DBadge, {
      props: { offsetXY: [-10, 10], badgePos: 'top-right' },
      slots: { default: SLOT }
    });
    expect(wrapper.find('.devui-badge-content').attributes().style).toBe('top: 10px; right: -10px;');
  });
});
