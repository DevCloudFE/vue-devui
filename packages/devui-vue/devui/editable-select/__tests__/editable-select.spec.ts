import { mount } from '@vue/test-utils';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { reactive, ref } from 'vue';
import { EditableSelect, OptionObjectItem } from '../index';
const ns = useNamespace('editable-select', true);

const createData = (len = 5) => {
  return reactive(
    Array.from({ length: len }).map((_, index) => {
      return {
        label: `label${index}`,
        value: index,
      };
    })
  );
};

describe('editable-select test', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('create', () => {
    const wrapper = mount(EditableSelect);

    expect(wrapper.find(`${ns.b()}`).exists()).toBe(true);
  });

  test('should render correctly', async () => {
    const wrapper = mount({
      components: {
        'editable-select': EditableSelect,
      },
      template: `<editable-select v-model="value" :options="options"></editable-select>`,
      setup() {
        const value = '';
        const options = createData();
        return {
          value,
          options,
        };
      },
    });

    const input = wrapper.find('input');
    expect(wrapper.find('.devui-dropdown-item').exists()).toBeFalsy();

    await input.trigger('click');
    const flexibleOverlay = wrapper.getComponent({ name: 'DFlexibleOverlay' });

    expect(flexibleOverlay.find(`.devui-dropdown-item`).exists()).toBeTruthy();
    expect(wrapper.classes()).toContain('devui-editable-select--open');

    const options = flexibleOverlay.findAll(`.devui-dropdown-item`);

    expect(options.length).toBe(5);
  });

  test('select on click ', async () => {
    const wrapper = mount({
      components: {
        'editable-select': EditableSelect,
      },
      template: `<editable-select v-model="value" :options="options"></editable-select>`,
      setup() {
        const value = ref('');
        const options = createData();
        return {
          value,
          options,
        };
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');

    const flexibleOverlay = wrapper.getComponent({ name: 'DFlexibleOverlay' });

    const options = flexibleOverlay.find(`.devui-dropdown-item`);

    await options.trigger('click');

    expect(wrapper.find('input').element.value).toBe('label0');
    expect(wrapper.vm.value).toBe('0');
  });

  test('disabled select', async () => {
    const wrapper = mount({
      components: {
        'editable-select': EditableSelect,
      },
      template: `<editable-select disabled></editable-select>`,
    });
    expect(wrapper.find('input').element.disabled).toBe(true);
  });

  test('disabled option', async () => {
    const wrapper = mount({
      components: {
        'editable-select': EditableSelect,
      },
      template: `<editable-select v-model="value" :options="options" disabled-key="disabled"></editable-select>`,
      setup() {
        const value = ref('');
        const options = reactive([
          {
            label: 'label0',
            value: 0,
          },
          {
            label: 'label1',
            value: 1,
            disabled: true,
          },
          {
            label: 'label2',
            value: 2,
            disabled: false,
          },
        ]);
        return {
          value,
          options,
        };
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');

    const flexibleOverlay = wrapper.getComponent({ name: 'DFlexibleOverlay' });
    const options = flexibleOverlay.findAll(`.devui-dropdown-item`);

    expect(options[1].classes()).toContain('disabled');

    await options[1].trigger('click');

    expect(wrapper.find('input').element.value).toBe('');
    expect(wrapper.vm.value).toBe('');

    await options[2].trigger('click');

    expect(wrapper.find('input').element.value).toBe('label2');
    expect(wrapper.vm.value).toBe('2');
  });

  test('search', async () => {
    const handleSearch = jest.fn();
    const wrapper = mount({
      components: {
        'editable-select': EditableSelect,
      },
      template: `<editable-select v-model="value" :options="options" @search="handleSearch"></editable-select>`,
      setup() {
        const value = ref('');
        const options = createData();
        return {
          value,
          options,
          handleSearch,
        };
      },
    });
    const input = wrapper.find('input');
    await input.setValue('label');
    await input.trigger('input');
    expect(handleSearch).toBeCalled();
  });

  test('filter option', async () => {
    const wrapper = mount({
      components: {
        'editable-select': EditableSelect,
      },
      template: `<editable-select v-model="value" :options="options" filter-option></editable-select>`,
      setup() {
        const value = ref('');
        const options = createData();
        return {
          value,
          options,
        };
      },
    });
    const input = wrapper.find('input');
    await input.setValue('label0');
    await input.trigger('click');
    const flexibleOverlay = wrapper.getComponent({ name: 'DFlexibleOverlay' });
    expect(flexibleOverlay.findAll(`.devui-dropdown-item`).length).toBe(1);
  });

  test('custom filter options', async () => {
    const wrapper = mount(EditableSelect, {
      components: {
        'editable-select': EditableSelect,
      },
      template: `<editable-select v-model="value" :options="options" :filter-option="filterOption"></editable-select>`,
      setup() {
        const value = ref('');
        const options = createData();
        const filterOption = (inputValue: string, option: OptionObjectItem) => option.label.indexOf(inputValue) > -1;
        return {
          value,
          options,
          filterOption,
        };
      },
    });
    const input = wrapper.find('input');

    input.setValue('label0');

    await input.trigger('click');
    const flexibleOverlay = wrapper.getComponent({ name: 'DFlexibleOverlay' });
    expect(flexibleOverlay.findAll(`.devui-dropdown-item`).length).toBe(1);

    expect(flexibleOverlay.find(`.devui-dropdown-item`).text()).toBe('label0');
  });

  test('render slot', async () => {
    const wrapper = mount({
      components: {
        'editable-select': EditableSelect,
      },
      template: `<editable-select v-model="value" :options="options">
                    <template #item="slotProps">
                      <div>
                        第{{slotProps.index}}项: {{slotProps.item}}
                      </div>
                    </template>
                    <template #noResultItem>
                      <div id="noResultItemTemplate">暂无数据</div>
                    </template>
                  </editable-select>`,
      setup() {
        const value = ref('');
        const options = createData();
        return {
          value,
          options,
        };
      },
    });
    const input = wrapper.find('input');
    await input.trigger('click');
    const flexibleOverlay = wrapper.getComponent({ name: 'DFlexibleOverlay' });
    const options = flexibleOverlay.findAll(`.devui-dropdown-item`);
    expect(options.length).toBe(5);
    await input.setValue('aaa');
    expect(flexibleOverlay.find('#noResultItemTemplate').element.textContent).toBe('暂无数据');
  });

  test('load more ', async () => {
    const loadmore = jest.fn();
    const makeScroll = async (dom: Element, name: 'scrollTop', offset: number) => {
      const eventTarget = dom === document.documentElement ? window : dom;
      dom[name] = offset;
      const evt = new CustomEvent('scroll', {
        detail: {
          target: {
            [name]: offset,
          },
        },
      });
      eventTarget.dispatchEvent(evt);
    };
    const wrapper = mount({
      components: {
        'editable-select': EditableSelect,
      },
      template: `<editable-select v-model="value"  enable-lazy-load  :options="options" @loadMore="handleLoad" :maxHeight="300" >
      </editable-select>`,
      setup() {
        const value = ref('');
        const options = createData(20);
        return {
          value,
          options,
          handleLoad: loadmore,
        };
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');
    const flexibleOverlay = wrapper.getComponent({ name: 'DFlexibleOverlay' });
    const ul = flexibleOverlay.find(`.devui-editable-select__list--unstyled`);
    await makeScroll(ul.element, 'scrollTop', 300);

    expect(loadmore).toBeCalled();
  });

  test('keyboard operations', async () => {
    const wrapper = mount({
      components: {
        'editable-select': EditableSelect,
      },
      template: `<editable-select v-model="value" :options="options"></editable-select>`,
      setup() {
        const value = ref('');
        const options = createData();
        return {
          value,
          options,
        };
      },
    });
    const input = wrapper.find('input');
    await input.trigger('click');
    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'Enter' });
    expect(input.element.value).toBe('label2');
    expect(wrapper.vm.value).toBe('2');
  });

  test('allow-clear', async () => {
    const wrapper = mount({
      components: {
        'editable-select': EditableSelect,
      },
      template: `<editable-select v-model="value" :options="options"></editable-select>`,
      setup() {
        const value = ref('');
        const options = createData();
        return {
          value,
          options,
        };
      },
    });

    const input = wrapper.find('input');
    await input.trigger('click');

    const flexibleOverlay = wrapper.getComponent({ name: 'DFlexibleOverlay' });

    const options = flexibleOverlay.findAll(`.devui-dropdown-item`);

    await options[0].trigger('click');

    expect(wrapper.find('input').element.value).toBe('label0');
    expect(wrapper.vm.value).toBe('0');

    const removeIcon = wrapper.find('.icon-remove');
    await removeIcon.trigger('click');

    expect(wrapper.find('input').element.value).toBe('');
    expect(wrapper.vm.value).toBe('');

    await options[1].trigger('click');
    expect(wrapper.find('input').element.value).toBe('label1');
    expect(wrapper.vm.value).toBe('1');

    await removeIcon.trigger('click');

    expect(wrapper.find('input').element.value).toBe('');
    expect(wrapper.vm.value).toBe('');
  });
});
