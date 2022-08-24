import { mount } from '@vue/test-utils';
import { Result } from '../index';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('result', true);

const titleClass = ns.e('title');
const descClass = ns.e('desc');

describe('result test', () => {
  it('result init render', async () => {
    const wrapper = mount(Result);
    expect(wrapper.classes()).toContain('devui-result');
  });

  it('icon', async () => {
    const wrapper = mount(Result, { props: { icon: 'info' } });

    let firstChild: Element = wrapper.element.firstElementChild;
    expect(firstChild.classList).toContain('devui-result__icon-info');

    await wrapper.setProps({ icon: 'success' });
    firstChild = wrapper.element.firstElementChild;
    expect(firstChild.classList).toContain('devui-result__icon-success');

    await wrapper.setProps({ icon: 'danger' });
    firstChild = wrapper.element.firstElementChild;
    expect(firstChild.classList).toContain('devui-result__icon-danger');

    await wrapper.setProps({ icon: 'warning' });
    firstChild = wrapper.element.firstElementChild;
    expect(firstChild.classList).toContain('devui-result__icon-warning');
  });

  it('slot', async ()=>{
    const wrapper = mount(Result, {
      slots: {
        icon: 'This is icon slot',
        title: 'This is title slot',
        desc: 'This is desc slot',
        extra: 'This is extra slot'
      }
    });

    expect(wrapper.element.children[0].innerHTML).toEqual('This is icon slot');
    expect(wrapper.element.children[1].innerHTML).toEqual('This is title slot');
    expect(wrapper.element.children[2].innerHTML).toEqual('This is desc slot');
    expect(wrapper.element.children[3].innerHTML).toEqual('This is extra slot');
  });

  it('props title', async () => {
    const wrapper = mount(Result);
    expect(wrapper.find(titleClass).exists()).toBe(true);
    // 测试不传入值的情况
    expect(wrapper.find(titleClass).text()).toBe('');
    await wrapper.setProps({
      title: '标题-测试title',
    });
    expect(wrapper.find(titleClass).text()).toBe('标题-测试title');
  });

  it('props desc', async () => {
    const wrapper = mount(Result);
    expect(wrapper.find(titleClass).exists()).toBe(true);
    // 测试不传入值的情况
    expect(wrapper.find(titleClass).text()).toBe('');
    expect(wrapper.find(descClass).text()).toBe('');
    await wrapper.setProps({
      title: '标题-测试desc',
      desc: '描述-测试desc',
    });
    expect(wrapper.find(titleClass).text()).toBe('标题-测试desc');
    expect(wrapper.find(descClass).text()).toBe('描述-测试desc');
  });
});
