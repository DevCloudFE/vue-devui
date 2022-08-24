import { mount } from '@vue/test-utils';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Button } from '..';
import type { IButtonVariant, IButtonColor } from '..';

const ns = useNamespace('button', true);

const baseClass = ns.b();
const solidClass = ns.m('solid');
const smClass = ns.m('sm');
const roundClass = ns.m('round');
const circleClass = ns.m('circle');
const iconClass = '.icon';
const genColorClass = (variant: IButtonVariant, color: IButtonColor) => {
  return `${ns.m(variant)}--${color}`;
};

describe('d-button', () => {
  it('variant', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return <Button variant="solid">确定</Button>;
        };
      },
    });

    expect(wrapper.find(solidClass).exists()).toBeTruthy();
  });

  it('color', async () => {
    // 不设置color和variant时，表现为 outline 下的 secondary
    const wrapper = mount({
      setup() {
        return () => {
          return <Button>确定</Button>;
        };
      },
    });
    expect(wrapper.find(genColorClass('outline', 'secondary')).exists()).toBeTruthy();

    await wrapper.setProps({
      color: 'primary',
    });
    expect(wrapper.find(genColorClass('outline', 'primary')).exists()).toBeTruthy();

    await wrapper.setProps({
      variant: 'outline',
      color: 'danger',
    });
    expect(wrapper.find(genColorClass('outline', 'danger')).exists()).toBeTruthy();

    await wrapper.setProps({
      variant: 'solid',
      color: 'secondary',
    });
    expect(wrapper.find(genColorClass('solid', 'secondary')).exists()).toBeTruthy();

    await wrapper.setProps({
      variant: 'text',
      color: 'primary',
    });
    expect(wrapper.find(genColorClass('text', 'primary')).exists()).toBeTruthy();

    await wrapper.setProps({
      variant: 'solid',
      color: 'secondary',
    });
    expect(wrapper.find(genColorClass('solid', 'secondary')).exists()).toBeTruthy();

    await wrapper.setProps({
      variant: 'text',
      color: 'primary',
    });
    expect(wrapper.find(genColorClass('text', 'primary')).exists()).toBeTruthy();
  });

  it('size', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return <Button size="sm">确定</Button>;
        };
      }
    });
    expect(wrapper.find(smClass).exists()).toBeTruthy();
  });

  it('icon', () => {
    const wrapper = mount(Button, {
      setup() {
        return () => {
          return <Button icon="like">确定</Button>;
        };
      }
    });

    expect(wrapper.find(iconClass).exists()).toBeTruthy();
  });

  it('type', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return <Button type="submit">确定</Button>;
        };
      }
    });
    expect(wrapper.find('button').attributes('type')).toBe('submit');
  });

  it('click', async () => {
    const handleClick = jest.fn();
    const wrapper = mount({
      setup() {
        return () => {
          return <Button onClick={handleClick}>确定</Button>;
        };
      }
    });
    await wrapper.find(baseClass).trigger('click');
    expect(handleClick).toBeCalled();
  });

  // 目前还不支持 loading
  it('loading', async () => {
    const handleClick = jest.fn();
    const wrapper = mount({
      setup() {
        return () => {
          return <Button loading={true} onClick={handleClick}>确定</Button>;
        };
      }
    });
    await wrapper.trigger('click');
    expect(handleClick).not.toBeCalled();
  });

  it('disabled', async () => {
    const handleClick = jest.fn();
    const wrapper = mount({
      setup() {
        return () => {
          return <Button disabled onClick={handleClick}>确定</Button>;
        };
      }
    });
    await wrapper.trigger('click');
    expect(handleClick).not.toBeCalled();
  });

  it('slot', () => {
    const btnText = 'vue3 devui';
    const wrapper = mount({
      setup() {
        return () => {
          return <Button>{btnText}</Button>;
        };
      }
    });
    expect(wrapper.text()).toEqual(btnText);
  });

  it('测试圆角按钮(shape=round)', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return <Button shape="round">确定</Button>;
        };
      }
    });
    expect(wrapper.find(roundClass).exists()).toBeTruthy();
  });

  it('测试圆形图标按钮(shape=circle)', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return <Button shape="circle">确定</Button>;
        };
      }
    });
    expect(wrapper.find(circleClass).exists()).toBeTruthy();
  });
});
