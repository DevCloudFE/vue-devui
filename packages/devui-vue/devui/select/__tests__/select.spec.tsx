import { mount } from '@vue/test-utils';
import { ref, reactive, nextTick } from 'vue';
import DSelect from '../src/select';

describe('select', () => {
  it('select render work', async () => {
    const value = ref(1);
    const options = reactive([1, 2, 'string']);
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options} placeholder="这是默认选择框"></DSelect>;
      },
    });
    const container = wrapper.find('.devui-select');
    let dropdown = wrapper.find('.devui-select__dropdown');
    let listItems = wrapper.findAll('.devui-select__item');
    const input = wrapper.find<HTMLInputElement>('.devui-select__input');
    const arrow = wrapper.find('.devui-select__arrow');

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
    dropdown = wrapper.find('.devui-select__dropdown');
    expect(dropdown.isVisible()).toBeTruthy();
    expect(container.classes()).toContain('devui-select--open');

    await listItems[2].trigger('click');
    await nextTick();

    // isVisible不会自动更新需要重新获取
    dropdown = wrapper.find('.devui-select__dropdown');
    expect(value.value).toBe('string');
    expect(dropdown.isVisible()).toBeFalsy();
    expect(input.element.value).toBe('string');
    // class不会自动更新需要重新获取
    listItems = wrapper.findAll('.devui-select__item');
    expect(listItems[2].classes()).toContain('active');
    wrapper.unmount();
  });

  it('select size and overview work', async () => {
    const wrapper = mount({
      setup() {
        return () => <DSelect size="sm" overview="underlined"></DSelect>;
      },
    });

    let container = wrapper.find('.devui-select');
    expect(container.classes()).toContain('devui-select--sm');
    expect(container.classes()).toContain('devui-select--underlined');

    await wrapper.setProps({
      size: 'lg',
      overview: 'border',
    });

    container = wrapper.find('.devui-select');
    expect(container.classes()).toContain('devui-select--lg');
    expect(container.classes()).not.toContain('devui-select--underlined');
    wrapper.unmount();
  });

  it('select events work', async () => {
    const value = ref(2);
    const options = reactive([6, 2, 'test']);
    const toggleChange = jest.fn();
    const valueChange = jest.fn();
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options} onToggleChange={toggleChange} onValueChange={valueChange}></DSelect>;
      },
    });

    const input = wrapper.find<HTMLInputElement>('.devui-select__input');
    await input.trigger('click');

    expect(toggleChange).toBeCalledTimes(1);
    expect(valueChange).toBeCalledTimes(0);
    expect(value.value).toBe(2);

    const listItems = wrapper.findAll('.devui-select__item');
    await listItems[2].trigger('click');

    expect(toggleChange).toBeCalledTimes(2);
    expect(valueChange).toBeCalledTimes(1);
    expect(value.value).toBe('test');
    wrapper.unmount();
  });

  it('select v-model work', async () => {
    const value = ref();
    const options = reactive([1, 2, 3]);
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options}></DSelect>;
      },
    });

    const container = wrapper.find('.devui-select');
    const item = container.findAll('.devui-select__item');

    await container.trigger('click');
    await item[1].trigger('click');
    expect(value.value).toBe(2);
    value.value = 1;
    await nextTick();
    const input = container.find<HTMLInputElement>('.devui-select__input');
    expect(input.element.value).toBe('1');
    wrapper.unmount();
  });

  it('select disabled work', async () => {
    const wrapper = mount({
      setup() {
        return () => <DSelect disabled={true}></DSelect>;
      },
    });

    const container = wrapper.find('.devui-select');
    expect(container.classes()).toContain('devui-select--disabled');

    const input = wrapper.find('.devui-select__input');
    expect(input.attributes()).toHaveProperty('disabled');
    wrapper.unmount();
  });

  it('select item disabled work', async () => {
    const value = ref([]);
    const options = reactive([
      {
        name: '多选',
        value: 0,
      },
      {
        name: '多选很重要呢',
        value: 1,
        disabled: true,
      },
      {
        name: '多选真的很重要呢',
        value: 2,
        disabled: false,
      },
    ]);
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options} multiple={true} option-disabled-key="disabled"></DSelect>;
      },
    });

    const container = wrapper.find('.devui-select');
    const item = container.findAll('.devui-select__item');

    await container.trigger('click');
    await nextTick();
    expect(item[1].classes()).toContain('disabled');
    await item[1].trigger('click');
    expect(value.value).toEqual([]);
    await item[0].trigger('click');
    expect(value.value).toEqual([0]);
    // todo 此处遗留，如果继续点击第三个选项，得到的value.value依然是[0]; 后续继续跟进原因。
    wrapper.unmount();
  });

  it('select clear work', async () => {
    const value = ref(1);
    const options = reactive([1, 2, 3]);
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options} allow-clear={true}></DSelect>;
      },
    });

    const container = wrapper.find('.devui-select');
    const clearIcon = container.find('.devui-select__clear');

    expect(clearIcon.exists()).toBeTruthy();
    await clearIcon.trigger('click');
    expect(value.value).toBe('');
    wrapper.unmount();
  });
});
