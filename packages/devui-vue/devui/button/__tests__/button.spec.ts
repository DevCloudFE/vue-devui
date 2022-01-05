import { mount } from '@vue/test-utils';
import Button from '../src/button';

describe('d-button', () => {
  it('variant', () => {
    const wrapper = mount(Button, {
      props: { variant: 'danger' },
    });
    expect(wrapper.find('.devui-btn').classes()).toContain('devui-btn-danger');
  });

  it('size', () => {
    const wrapper = mount(Button, {
      props: { size: 'sm' },
    });
    expect(wrapper.find('.devui-btn-sm').exists()).toBeTruthy();
  });

  it('type', () => {
    const wrapper = mount(Button, {
      props: { type: 'submit' },
    }).find('button');
    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('click', async () => {
    const handleClick = jest.fn();
    const wrapper = mount(Button, {
      props: {
        showLoading: false,
        onClick: handleClick
      },
    });
    await wrapper.find('.devui-btn').trigger('click');
    expect(handleClick).toBeCalled();
  });

  // 目前还不支持 loading
  it('loading', async () => {
    const handleClick = jest.fn();
    const wrapper = mount(Button, {
      props: {
        showLoading: true,
        btnClick: handleClick
      },
    });
    await wrapper.trigger('click');
    expect(handleClick).not.toBeCalled();
  });

  it('disabled', async () => {
    const handleClick = jest.fn();
    const wrapper = mount(Button, {
      props: {
        showLoading: false,
        disabled: true,
        onClick: handleClick
      },
    });
    await wrapper.trigger('click');
    expect(handleClick).not.toBeCalled();
  });

  it('slot', () => {
    const btnText = 'vue3 devui';
    const wrapper = mount(Button, {
      slots: {
        default: btnText
      }
    });
    expect(wrapper.text()).toEqual(btnText);
  });
});
