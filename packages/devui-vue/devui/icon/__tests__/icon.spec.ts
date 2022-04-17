import { mount } from '@vue/test-utils';
import Icon from '../src/icon';

describe('d-icon', () => {
  it('name', () => {
    const wrapper = mount(Icon, {
      props: { name: 'add' },
    });
    expect(wrapper.find('.icon-add').exists()).toBeTruthy();
  });

  it('classPrefix', () => {
    const wrapper = mount(Icon, {
      props: { name: 'add', classPrefix: 'dev' },
    });
    expect(wrapper.find('.dev-add').exists()).toBeTruthy();
  });
  it('size', () => {
    const wrapper = mount(Icon, {
      props: { name: 'add', size: '80px' },
    });
    expect(wrapper.find('.icon-add').attributes('style').includes('font-size: 80px')).toBeTruthy();
  });
  it('color', () => {
    const wrapper = mount(Icon, {
      props: { name: 'add', color: 'red' },
    });
    expect(wrapper.find('.icon-add').attributes('style').includes('color: red')).toBeTruthy();
  });
});
