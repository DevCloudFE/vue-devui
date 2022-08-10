import { mount } from '@vue/test-utils';
import DBadge from '../src/badge';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('badge', true);

const contentClass = ns.e('content');
const dotClass = ns.m('dot');
const dotHiddenClass = ns.m('hidden');
const dotShowClass = ns.m('show');
const infoStatusClass = ns.m('info');
const dangerStatusClass = ns.m('danger');
const warningStatusClass = ns.m('warning');
const waitingStatusClass = ns.m('waiting');
const successStatusClass = ns.m('success');
const commonStatusClass = ns.m('common');
const topLeftPositionClass = ns.m('top-left');
const topRightPositionClass = ns.m('top-right');
const bottomLeftPositionClass = ns.m('bottom-left');
const bottomRightPositionClass = ns.m('bottom-right');

const SLOT = 'This is a slot test';

describe('badge', () => {
  it('badge base', () => {
    const wrapper = mount(DBadge, {
      props: { count: 80 },
      slots: { default: SLOT },
    });
    expect(wrapper.vm.count).toEqual(80);
  });

  it('badge dot', async () => {
    // 不传递show-dot时，默认为基本徽章(即show-dot为默认的false)
    const wrapper = mount(DBadge, {
      slots: { default: SLOT },
    });
    expect(wrapper.find(contentClass + dotClass).exists()).toBe(false);
    await wrapper.setProps({
      showDot: true,
    });
    expect(wrapper.find(contentClass + dotClass).exists()).toBe(true);
    await wrapper.setProps({
      showDot: false,
    });
    expect(wrapper.find(contentClass + dotClass).exists()).toBe(false);
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
    expect(wrapper.find(contentClass + infoStatusClass).exists()).toBe(true);

    await wrapper.setProps({
      status: 'danger',
    });
    expect(wrapper.find(contentClass + dangerStatusClass).exists()).toBe(true);

    await wrapper.setProps({
      status: 'warning',
    });
    expect(wrapper.find(contentClass + warningStatusClass).exists()).toBe(true);

    await wrapper.setProps({
      status: 'waiting',
    });
    expect(wrapper.find(contentClass + waitingStatusClass).exists()).toBe(true);

    await wrapper.setProps({
      status: 'success',
    });
    expect(wrapper.find(contentClass + successStatusClass).exists()).toBe(true);

    await wrapper.setProps({
      status: 'info',
    });
    expect(wrapper.find(contentClass + infoStatusClass).exists()).toBe(true);

    await wrapper.setProps({
      status: 'common',
    });
    expect(wrapper.find(contentClass + commonStatusClass).exists()).toBe(true);
  });

  it('props position work well.', async () => {
    const wrapper = mount(DBadge, {
      props: { position: 'top-left' },
      slots: { default: SLOT },
    });
    expect(wrapper.find(contentClass + topLeftPositionClass).exists()).toBe(true);

    await wrapper.setProps({
      position: 'top-right',
    });
    expect(wrapper.find(contentClass + topRightPositionClass).exists()).toBe(true);

    await wrapper.setProps({
      position: 'bottom-left',
    });
    expect(wrapper.find(contentClass + bottomLeftPositionClass).exists()).toBe(true);

    await wrapper.setProps({
      position: 'bottom-right',
    });
    expect(wrapper.find(contentClass + bottomRightPositionClass).exists()).toBe(true);
  });
});
