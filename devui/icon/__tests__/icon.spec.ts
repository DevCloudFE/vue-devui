import { mount } from '@vue/test-utils';
import Icon from '../src/icon';

describe('d-icon', () => {
    it('name', () => {
        const wrapper = mount(Icon, {
          props: { name:'test' },
        });
        expect(wrapper.find('.icon-test').exists()).toBeTruthy();
      });

    it('classPrefix', () => {
        const wrapper = mount(Icon, {
          props: { name:'test',classPrefix:'dev' },
        });
        expect(wrapper.find('.dev-test').exists()).toBeTruthy();
    });
    it('size', () => {
        const wrapper = mount(Icon, {
          props: { name:'test',size:'80px'},
        });
        expect(wrapper.find('.icon-test').attributes('style').includes('font-size: 80px')).toBeTruthy();
    });
    it('color', () => {
        const wrapper = mount(Icon, {
          props: { name:'test',color:'red'},
        });
        expect(wrapper.find('.icon-test').attributes('style').includes('color: red')).toBeTruthy();
    });
})