import { mount } from '@vue/test-utils';
import { Statistic } from '../index';
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
describe('statistic test', () => {
  it('should work with import on demand', () => {
    mount(Statistic);
  });
  it('should work with `title` prop', async () => {
    const wrapper = mount(Statistic, { props: { title: 'test' } });

    expect(wrapper.find('.devui-statistic-title').exists()).toBe(true);
    expect(wrapper.find('.devui-statistic-title').text()).toBe('test');
  });
  it('should work with `value` prop and typeof string value', async () => {
    const wrapper = mount(Statistic, { props: { value: 'im string' } });

    expect(wrapper.find('.devui-statistic--value').exists()).toBe(true);
    expect(wrapper.find('.devui-statistic--value').text()).toBe('im string');
  });
  it('should work with `value` prop and typeof number value', async () => {
    const wrapper = mount(Statistic, { props: { value: 666999 } });

    expect(wrapper.find('.devui-statistic--value').exists()).toBe(true);
    expect(wrapper.find('.devui-statistic--value').text()).toBe('666999');
  });
  it('should work with `group-separator` prop', async () => {
    const wrapper = mount(Statistic, { props: { groupSeparator: ',', value: '5201314' } });

    expect(wrapper.find('.devui-statistic--value').exists()).toBe(true);
    expect(wrapper.find('.devui-statistic--value').text()).toBe('5201314');
  });
  it('should work with `precision` prop', async () => {
    const wrapper = mount(Statistic, { props: { precision: 3, value: '53' } });

    expect(wrapper.find('.devui-statistic--value').exists()).toBe(true);
    expect(wrapper.find('.devui-statistic--value').text()).toBe('53');
  });
  it('should work with `suffix` prop', async () => {
    const wrapper = mount(Statistic, { props: { suffix: '%', value: '5201314' } });

    expect(wrapper.find('.devui-statistic--value').exists()).toBe(true);
    expect(wrapper.find('.devui-statistic--value').text()).toBe('5201314');
    expect(wrapper.find('.devui-statistic-suffix').text()).toBe('%');
  });
  it('should work with `prefix` prop', async () => {
    const wrapper = mount(Statistic, { props: { prefix: '%', value: '5201314' } });

    expect(wrapper.find('.devui-statistic--value').exists()).toBe(true);
    expect(wrapper.find('.devui-statistic--value').text()).toBe('5201314');
    expect(wrapper.find('.devui-statistic-prefix').text()).toBe('%');
  });
  it('should work with `prefix` slot', async () => {
    const wrapper = mount(Statistic, { slots: { prefix: () => 'test' } });

    expect(wrapper.find('.devui-statistic-prefix').exists()).toBe(true);
    expect(wrapper.find('.devui-statistic-prefix').text()).toBe('test');
  });
  it('should work with `suffix` slot', async () => {
    const wrapper = mount(Statistic, { slots: { suffix: () => 'test' } });

    expect(wrapper.find('.devui-statistic-suffix').exists()).toBe(true);
    expect(wrapper.find('.devui-statistic-suffix').text()).toBe('test');
  });
  it('should work with `extra` slot', async () => {
    const wrapper = mount(Statistic, { slots: { extra: () => 'test' } });

    expect(wrapper.find('.devui-statistic-extra').exists()).toBe(true);
    expect(wrapper.find('.devui-statistic-extra').text()).toBe('test');
  });
  it('should work with `valueFrom` prop', async () => {
    const wrapper = mount(Statistic, {
      props: { valueFrom: 0, value: 1100, animation: true },
    });

    expect(wrapper.text()).toBe('0');
    wrapper.unmount();
  });
  it('should work with `duration` prop', async () => {
    const wrapper = mount(Statistic, {
      props: { valueFrom: 0, value: 999, animationDuration: 2000, animation: true },
    });
    expect(wrapper.text()).not.toBe('999');

    await sleep(2000);
    expect(wrapper.text()).toBe('999');
    wrapper.unmount();
  });
});
