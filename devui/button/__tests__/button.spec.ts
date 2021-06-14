import { mount } from '@vue/test-utils';
import Button from '../button';

describe('d-button', () => {
  it('bsStyle', () => {
    const wrapper = mount(Button, {
      props: { bsStyle: 'danger' },
    });
    expect(wrapper.classes()).toContain('devui-btn-danger');
  });

  it('bsSize', () => {
    const wrapper = mount(Button, {
      props: { bsSize: 'sm' },
    });
    expect(wrapper.find('.devui-btn-sm').exists()).toBeTruthy();
  });

  it('type', () => {
    const wrapper = mount(Button, {
      props: { type: 'submit' },
    });
    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('click', async () => {
    const handleClick = jest.fn();
    const wrapper = mount(Button, {
      props: {
        showLoading: false,
        btnClick: handleClick
      },
    });
    await wrapper.trigger('click');
    expect(handleClick).toBeCalled();
  });

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
        btnClick: handleClick
      },
    });
    await wrapper.trigger('click');
    expect(handleClick).not.toBeCalled();
  });

  it('slot', () => {
    const btnText = 'vue3 devui';
    const wrapper = mount(Button, {
      slots:  {
        default: btnText
      }
    });
    expect(wrapper.text()).toEqual(btnText);
  });
});
