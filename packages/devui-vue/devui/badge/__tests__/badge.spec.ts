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

  it('props status work well.', async () => {
    // 不传递status时，默认为info
    const wrapper = mount(DBadge, {
      slots: { default: SLOT },
    });
    expect(wrapper.find(contentClass).classes('devui-badge--info')).toBe(true);

    await wrapper.setProps({
      status: 'danger',
    });
    expect(wrapper.find(contentClass).classes('devui-badge--danger')).toBe(true);

    await wrapper.setProps({
      status: 'warning',
    });
    expect(wrapper.find(contentClass).classes('devui-badge--warning')).toBe(true);

    await wrapper.setProps({
      status: 'waiting',
    });
    expect(wrapper.find(contentClass).classes('devui-badge--waiting')).toBe(true);

    await wrapper.setProps({
      status: 'success',
    });
    expect(wrapper.find(contentClass).classes('devui-badge--success')).toBe(true);

    await wrapper.setProps({
      status: 'info',
    });
    expect(wrapper.find(contentClass).classes('devui-badge--info')).toBe(true);

    await wrapper.setProps({
      status: 'common',
    });
    expect(wrapper.find(contentClass).classes('devui-badge--common')).toBe(true);
  });

  it('props show-dot work well.', async () => {
    // 不传递show-dot时，默认为基本徽章
    const wrapper = mount(DBadge, {
      slots: { default: SLOT },
    });
    expect(wrapper.find(contentClass + dotClass).exists()).toBe(false);

    await wrapper.setProps({
      props: { showDot: false },
    });
    expect(wrapper.find(contentClass + dotClass).exists()).toBe(false);
  });

  it('props position work well.', async () => {
    const wrapper = mount(DBadge, {
      props: { position: 'top-left' },
      slots: { default: SLOT },
    });
    expect(wrapper.find(contentClass).classes('devui-badge--top-left')).toBe(true);

    await wrapper.setProps({
      position: 'top-right',
    });
    expect(wrapper.find(contentClass).classes('devui-badge--top-right')).toBe(true);

    await wrapper.setProps({
      position: 'bottom-left',
    });
    expect(wrapper.find(contentClass).classes('devui-badge--bottom-left')).toBe(true);

    await wrapper.setProps({
      position: 'bottom-right',
    });
    expect(wrapper.find(contentClass).classes('devui-badge--bottom-right')).toBe(true);

    await wrapper.setProps({
      status: 'bottom-right',
    });
    expect(wrapper.find(contentClass).classes('devui-badge--bottom-right')).toBe(true);
  });
});
