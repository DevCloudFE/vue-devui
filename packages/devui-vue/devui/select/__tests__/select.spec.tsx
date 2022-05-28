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
    await nextTick();
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
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const wrapper = mount({
      setup() {
        return () => (
          <DSelect
            v-model={value.value}
            options={options}
            onToggleChange={toggleChange}
            onValueChange={valueChange}
            onFocus={onFocus}
            onBlur={onBlur}></DSelect>
        );
      },
    });

    const input = wrapper.find<HTMLInputElement>('.devui-select__input');

    await input.trigger('focus');
    await input.trigger('blur');

    expect(onFocus).toBeCalledTimes(1);
    expect(onBlur).toBeCalledTimes(1);

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
    // todo 此处遗留，如果继续点击第二个或者更多选项，得到的value.value依然是[]; 原因为下拉面板使用Transition组件导致。
    await item[0].trigger('click');
    expect(value.value).toEqual([0]);
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

  it('select multiple tag work', async () => {
    const value = ref([]);
    const options = reactive([1, 2, 'test']);
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options} multiple={true}></DSelect>;
      },
    });

    const container = wrapper.find('.devui-select');
    const items = container.findAll('.devui-select__item');
    const section = wrapper.find('.devui-select__multiple');
    const multipleInput = wrapper.find('.devui-select__multiple--input');
    expect(section.exists()).toBeTruthy();
    expect(multipleInput.exists()).toBeTruthy();

    await container.trigger('click');
    await nextTick();
    await items[0].trigger('click');
    expect(value.value).toStrictEqual([1]);
    const input = container.find<HTMLInputElement>('.devui-select__input');
    expect(input.element.value).toBe('');

    const tags = wrapper.findAll('.devui-tag');
    expect(tags.length).toBe(1);
    const tag = tags[0].find('.remove-button');
    await tag.trigger('click');
    expect(value.value).toStrictEqual([]);
    wrapper.unmount();
  });

  it('select multiple collapse tags work', async () => {
    const value = ref([]);
    const list = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive(list);
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options} multiple={true} collapseTags={true}></DSelect>;
      },
    });

    const container = wrapper.find('.devui-select');
    const items = container.findAll('.devui-select__item');

    await container.trigger('click');
    await nextTick();
    await items[0].trigger('click');
    await items[1].trigger('click');
    await items[2].trigger('click');
    const tags = wrapper.findAll('.devui-tag');
    expect(tags.length).toBe(2);
    const tag1 = tags[0].find('.remove-button');
    const tag2 = tags[1].find('.remove-button');
    expect(tag1.isVisible()).toBeTruthy();
    expect(tag2.exists()).toBeFalsy();
    wrapper.unmount();
  });

  it('select multiple collapse tags tooltip work', async () => {
    const value = ref([]);
    const list = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive(list);
    const wrapper = mount({
      setup() {
        return () => (
          <DSelect v-model={value.value} options={options} multiple={true} collapseTags={true} collapseTagsTooltip={true}></DSelect>
        );
      },
    });
    const container = wrapper.find('.devui-select');
    const items = container.findAll('.devui-select__item');

    await container.trigger('click');
    await nextTick();
    await items[0].trigger('click');
    await items[1].trigger('click');
    await items[2].trigger('click');
    const tags = wrapper.findAll('.devui-tag');
    expect(tags.length).toBe(2);
    await tags[1].trigger('mouseenter');
    setTimeout(() => {
      const popoverContent = document.body.querySelector('.devui-popover__content');
      expect(popoverContent).toBeTruthy();
      wrapper.unmount();
    }, 150);
    wrapper.unmount();
  });

  it('select filter work', async () => {
    const value = ref([]);
    const list = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive(list);
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options} filter={true}></DSelect>;
      },
    });
    const container = wrapper.find('.devui-select');

    await container.trigger('click');
    await nextTick();
    const input = container.find<HTMLInputElement>('.devui-select__input');
    await input.setValue('s');
    await input.trigger('input');
    setTimeout(() => {
      const items = wrapper.findAll('.devui-select__item');
      expect(items[0].isVisible()).toBe(false);
    }, 300);

    await input.setValue('1');
    await input.trigger('input');
    setTimeout(() => {
      const items = wrapper.findAll('.devui-select__item');
      expect(items[0].isVisible()).toBe(true);
    }, 300);
    wrapper.unmount();
  });

  it('select remote search work', async () => {
    const value = ref([]);
    const list = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive({
      data: [],
    });
    const filterFunc = (query: string, callback?: () => void) => {
      if (query) {
        setTimeout(() => {
          options.data = list.filter((item) => {
            return item.toLowerCase().includes(query.toLowerCase());
          });
          if (callback) {
            callback();
          }
        }, 200);
      } else {
        options.data = [];
        if (callback) {
          callback();
        }
      }
    };
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options.data} filter={filterFunc} remote></DSelect>;
      },
    });
    const container = wrapper.find('.devui-select');

    await container.trigger('click');
    await nextTick();
    const input = container.find<HTMLInputElement>('.devui-select__input');
    await input.setValue('1');
    await input.trigger('input');
    setTimeout(() => {
      const noMachDataItem = wrapper.find('.devui-select__dropdown--empty');
      expect(noMachDataItem.exists()).toBeTruthy();
      expect(noMachDataItem.text()).toBe('Loading');
      setTimeout(() => {
        const items = wrapper.findAll('.devui-select__item');
        expect(items.length).toBe(1);
        expect(items[0].isVisible()).toBe(true);
      }, 200);
    }, 300);

    await input.setValue('1');
    await input.trigger('input');
    setTimeout(() => {
      const items = wrapper.findAll('.devui-select__item');
      expect(items[0].isVisible()).toBe(true);
    }, 200);
    wrapper.unmount();
  });

  it('select allow create work', async () => {
    const value = ref([]);
    const list = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive(list);
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options} multiple={true} filter={true}></DSelect>;
      },
    });
    const input = wrapper.find('.devui-select__input');

    await input.trigger('click');
    await nextTick();
    await input.setValue('test');
    await input.trigger('input');
    setTimeout(async () => {
      const items = wrapper.findAll('.devui-select__item');
      await items[0].trigger('click');
      expect(value.value).toStrictEqual(['test']);
    }, 300);
    wrapper.unmount();
  });
  it('select no-data-text no-match-text work', async () => {
    const value = ref([]);
    const list = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive([]);
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options} multiple={true} filter={true}></DSelect>;
      },
    });
    const input = wrapper.find('.devui-select__input');

    await input.trigger('click');
    await nextTick();
    const items = wrapper.findAll('.devui-select__item');
    expect(items.length).toBe(0);
    const noDataItem = wrapper.find('.devui-select__dropdown--empty');
    expect(noDataItem.exists()).toBeTruthy();
    expect(noDataItem.text()).toBe('No data');

    await wrapper.setProps({ options: list });
    const newItems = wrapper.findAll('.devui-select__item');
    expect(newItems.length).toBe(6);
    const newNoDataItem = wrapper.find('.devui-select__dropdown--empty');
    expect(newNoDataItem.exists()).toBeFalsy();
    await input.setValue('test');
    await input.trigger('input');
    setTimeout(async () => {
      const lists = wrapper.findAll('.devui-select__item');
      expect(lists.length).toBe(6);
      expect(lists[0].isVisible()).toBe(false);
      const noMachDataItem = wrapper.find('.devui-select__dropdown--empty');
      expect(noMachDataItem.exists()).toBeTruthy();
      expect(noMachDataItem.text()).toBe('No matching data');
    }, 300);
    wrapper.unmount();
  });
});
