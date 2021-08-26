import { mount } from '@vue/test-utils';
import { ref, reactive, nextTick } from 'vue';
import DSelect from '../src/select';

describe('select', () => {
  it('select render work', async () => {
    const value = ref(1);
    const options = reactive([1, 2, 'string']);
    const wrapper = mount({
      components: { DSelect },
      template: `<d-select v-model="value" :options="options" placeholder="这是默认选择框"></d-select>`,
      setup() {
        return {
          value,
          options,
        };
      },
    });
    const container = wrapper.find('.devui-select');
    let dropdown = wrapper.find('.devui-select-dropdown');
    let listItems = wrapper.findAll('.devui-select-item');
    const input = wrapper.find<HTMLInputElement>('.devui-select-input');
    const arrow = wrapper.find('.devui-select-arrow');

    expect(container.exists()).toBeTruthy();
    expect(dropdown.isVisible()).toBeFalsy();
    expect(arrow.isVisible()).toBeTruthy();
    expect(listItems.length).toBe(3);
    expect(listItems[0].classes()).toContain('active');
    expect(input.attributes('placeholder')).toBe('这是默认选择框');
    expect(input.element.value).toBe('1');

    await input.trigger('click');
    await nextTick();
    // isVisible不会自动更新需要重新获取
    dropdown = wrapper.find('.devui-select-dropdown');
    expect(dropdown.isVisible()).toBeTruthy();
    expect(container.classes()).toContain('devui-select-open');

    await listItems[2].trigger('click');
    await nextTick();

    // isVisible不会自动更新需要重新获取
    dropdown = wrapper.find('.devui-select-dropdown');
    expect(value.value).toBe('string');
    expect(dropdown.isVisible()).toBeFalsy();
    expect(input.element.value).toBe('string');
    // class不会自动更新需要重新获取
    listItems = wrapper.findAll('.devui-select-item');
    expect(listItems[2].classes()).toContain('active');
  });

  it('select size and overview work', async () => {
    const wrapper = mount(DSelect, {
      props: {
        size: 'sm',
        overview: 'underlined',
      },
    });

    let container = wrapper.find('.devui-select');
    expect(container.classes()).toContain('devui-select-sm');
    expect(container.classes()).toContain('devui-select-underlined');

    await wrapper.setProps({
      size: 'lg',
      overview: 'border',
    });

    container = wrapper.find('.devui-select');
    expect(container.classes()).toContain('devui-select-lg');
    expect(container.classes()).not.toContain('devui-select-underlined');
  });

  it('select events work', async () => {
    const value = ref(2);
    const options = reactive([6, 2, 'test']);
    const toggleChange = jest.fn();
    const valueChange = jest.fn();
    const wrapper = mount({
      components: { DSelect },
      template: `
        <d-select
          v-model="value"
          :options="options"
          @toggle-change="toggleChange"
          @value-change="valueChange"
        ></d-select>
      `,
      setup() {
        return {
          value,
          options,
          toggleChange,
          valueChange,
        };
      },
    });

    const input = wrapper.find<HTMLInputElement>('.devui-select-input');
    await input.trigger('click');

    expect(toggleChange).toBeCalledTimes(1);
    expect(valueChange).toBeCalledTimes(0);
    expect(value.value).toBe(2);

    const listItems = wrapper.findAll('.devui-select-item');
    await listItems[2].trigger('click');

    expect(toggleChange).toBeCalledTimes(2);
    expect(valueChange).toBeCalledTimes(1);
    expect(value.value).toBe('test');
  });
});
