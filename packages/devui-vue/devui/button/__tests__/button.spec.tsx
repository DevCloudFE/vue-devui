import { mount } from '@vue/test-utils';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Button } from '..';

const ns = useNamespace('button', true);

const baseClass = ns.b();
const solidClass = ns.m('solid');
const smClass = ns.m('sm');
const roundClass = ns.m('round');
const circleClass = ns.m('circle');
const iconClass = '.icon';

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
    expect(wrapper.find(solidClass).exists()).toBeTruthy();
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
    expect(wrapper.find(smClass).exists()).toBeTruthy();
  });

  it('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'like'
      },
      slots: {
        default: 'I am sure'
      }
    });

    expect(wrapper.find(iconClass).exists()).toBeTruthy();
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
    await wrapper.find(baseClass).trigger('click');
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

  it('测试圆角按钮(shape=round)', () => {
    const wrapper = mount(Button, {
      props: {
        shape: 'round'
      },
      slots: {
        default: 'I am sure'
      }
    });
    expect(wrapper.find(roundClass).exists()).toBeTruthy();
  });

  it('测试圆形图标按钮(shape=circle)', () => {
    const wrapper = mount(Button, {
      props: {
        shape: 'circle'
      },
      slots: {
        default: 'I am sure'
      }
    });
    expect(wrapper.find(circleClass).exists()).toBeTruthy();
  });
});
