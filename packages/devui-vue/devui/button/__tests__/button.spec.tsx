import { mount } from '@vue/test-utils';
import { Button } from '..';

describe('d-button', () => {
  it('variant', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'solid'
      },
      slots: {
        default: 'I am sure'
      }
    });
    expect(wrapper.find('.devui-button').classes()).toContain('devui-button--solid');
  });

  it('size', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'sm'
      },
      slots: {
        default: 'I am sure'
      }
    });
    expect(wrapper.find('.devui-button--sm').exists()).toBeTruthy();
  });

  it('type', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'submit'
      },
      slots: {
        default: 'I am sure'
      }
    });
    expect(wrapper.find('button').attributes('type')).toBe('submit');
  });

  it('click', async () => {
    const onClick = jest.fn();
    const wrapper = mount(Button, {
      props: {
        onClick
      },
      slots: {
        default: 'I am sure'
      }
    });
    await wrapper.find('.devui-button').trigger('click');
    expect(onClick).toBeCalled();
  });

  // 目前还不支持 loading
  it('loading', async () => {
    const onClick = jest.fn();
    const wrapper = mount(Button, {
      props: {
        onClick,
        loading: true
      },
      slots: {
        default: 'I am sure'
      }
    });
    await wrapper.trigger('click');
    expect(onClick).not.toBeCalled();
  });

  it('disabled', async () => {
    const onClick = jest.fn();
    const wrapper = mount(Button, {
      props: {
        onClick,
        disabled: true
      },
      slots: {
        default: 'I am sure'
      }
    });
    await wrapper.trigger('click');
    expect(onClick).not.toBeCalled();
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
