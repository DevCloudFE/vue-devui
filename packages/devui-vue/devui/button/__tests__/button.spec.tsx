import { mount } from '@vue/test-utils';
import { Button } from '..';

describe('d-button', () => {
  it('variant', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return <Button variant="solid">确定</Button>;
        };
      }
    });
    expect(wrapper.find('.devui-button').classes()).toContain('devui-button--solid');
  });

  it('size', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return <Button size="sm">确定</Button>;
        };
      }
    });
    expect(wrapper.find('.devui-button--sm').exists()).toBeTruthy();
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
    await wrapper.find('.devui-button').trigger('click');
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
    expect(wrapper.find('.devui-button--round').exists()).toBeTruthy();
  });

  it('测试圆形图标按钮(shape=circle)', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return <Button shape="circle">确定</Button>;
        };
      }
    });
    expect(wrapper.find('.devui-button--circle').exists()).toBeTruthy();
  });
});
