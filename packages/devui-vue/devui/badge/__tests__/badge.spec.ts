import { mount } from '@vue/test-utils';
import DBadge from '../src/badge';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('badge', true);

const contentClass = ns.e('content');
const dotClass = ns.m('dot');
const dotHiddenClass = ns.m('hidden');
const dotShowClass = ns.m('show');

const SLOT = 'This is a slot test';

describe('badge', () => {
  it('badge base', () => {
    const wrapper = mount(DBadge, {
      props: { count: 80 },
      slots: { default: SLOT },
    });
    expect(wrapper.vm.count).toEqual(80);
  });

  it('badge dot', () => {
    const wrapper = mount(DBadge, {
      props: { showDot: true },
      slots: { default: SLOT },
    });
    expect(wrapper.find(contentClass + dotClass).exists()).toBe(true);
  });

  it('badge max', () => {
    const wrapper = mount(DBadge, {
      props: { count: 100 },
    });
    expect(wrapper.find(contentClass).text()).toBe('99+');

    const wrapper2 = mount(DBadge, {
      props: { count: 100, maxCount: 1000 },
    });
    expect(wrapper2.find(contentClass).text()).toBe('100');
  });

  it('badge bgColor', () => {
    const wrapper = mount(DBadge, {
      props: { bgColor: 'red' },
      slots: { default: SLOT },
    });
    expect(wrapper.find(contentClass).attributes().style).toBe('background: red;');
  });

  it('badge offsetXY', () => {
    const wrapper = mount(DBadge, {
      props: { offset: [-10, 10], position: 'top-right' },
      slots: { default: SLOT },
    });
    // TODO: 未覆盖 position
    expect(wrapper.find(contentClass).attributes().style).toBe('top: 10px; right: -10px;');
  });

  it('badge hidden', async () => {
    const wrapper = mount(DBadge, {
      props: { hidden: false },
      slots: { default: SLOT },
    });
    expect(wrapper.find(dotHiddenClass).exists()).toBe(false);
    expect(wrapper.find(dotShowClass).exists()).toBe(true);

    await wrapper.setProps({
      hidden: true,
    });

    expect(wrapper.find(dotHiddenClass).exists()).toBe(true);
    expect(wrapper.find(dotShowClass).exists()).toBe(false);
  });

  it.todo('props status work well.');

  it.todo('props show-dot work well.');

  it.todo('props position work well.');
});
