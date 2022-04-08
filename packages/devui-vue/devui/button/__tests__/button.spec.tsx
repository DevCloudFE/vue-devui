import { mount } from '@vue/test-utils';
import { Button } from '..';

describe('d-button', () => {
  it('variant', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return <Button variant="solid">确定</Button>;
        }
      }
    });
    expect(wrapper.find('.devui-btn').classes()).toContain('devui-btn-solid');
  });

  it('size', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return <Button size="sm">确定</Button>;
        }
      }
    });
    expect(wrapper.find('.devui-btn-sm').exists()).toBeTruthy();
  });

  it('type', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return <Button type="submit">确定</Button>;
        }
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
        }
      }
    });
    await wrapper.find('.devui-btn').trigger('click');
    expect(handleClick).toBeCalled();
  });

  // 目前还不支持 loading
  it('loading', async () => {
    const handleClick = jest.fn();
    const wrapper = mount({
      setup() {
        return () => {
          return <Button loading={true} onClick={handleClick}>确定</Button>;
        }
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
        }
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
        }
      }
    });
    expect(wrapper.text()).toEqual(btnText);
  });
});
