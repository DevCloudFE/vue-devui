import { mount } from '@vue/test-utils';
import { ref, reactive, nextTick } from 'vue';
import DSelect from '../src/select';
import { Form as DForm, FormItem as DFormItem } from '../../form';
import { Button } from '../../button';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('select', true);
const notDotNs = useNamespace('select');
const baseClass = ns.b();
const selectOpenCls = notDotNs.m('open');
const dropdownCls = ns.e('dropdown');
const selectItemCls = ns.e('item');
const selectInputCls = ns.e('input');
const clearCls = ns.e('clear');
const arrowCls = ns.e('arrow');
const selectSMCls = notDotNs.m('sm');
const selectLGCls = notDotNs.m('lg');
const selectUnderlinedCls = notDotNs.m('underlined');
const selectDisabledCls = notDotNs.m('disabled');
const multipleCls = ns.e('multiple');
const multipleInputCls = ns.em('multiple', 'input');
const dropdownEmptyCls = ns.em('dropdown', 'empty');

const tagNs = useNamespace('tag', true);
const tagBaseClass = tagNs.b();

const popoverNs = useNamespace('popover', true);
const popoverContentCls = popoverNs.e('content');

describe('select', () => {
  it('select render work', async () => {
    const value = ref(1);
    const options = reactive([1, 2, 'string']);
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options} placeholder="这是默认选择框"></DSelect>;
      },
    });

    const container = wrapper.find(baseClass);
    let dropdown = document.querySelector(dropdownCls);
    const input = wrapper.find<HTMLInputElement>(selectInputCls);
    const arrow = wrapper.find(arrowCls);

    expect(container.exists()).toBeTruthy();
    expect(dropdown).toBeFalsy();
    expect(arrow.isVisible()).toBeTruthy();
    expect(input.attributes('placeholder')).toBe('这是默认选择框');
    await nextTick();
    expect(input.element.value).toBe('1');

    await input.trigger('click');
    await nextTick();
    dropdown = document.querySelector(dropdownCls);
    expect(dropdown?.style.visibility).toBe('visible');
    expect(container.classes()).toContain(selectOpenCls);
    let listItems = document.querySelectorAll(selectItemCls);
    expect(listItems.length).toBe(3);
    expect(listItems[0].classList).toContain('active');

    await listItems[2].dispatchEvent(new Event('click'));
    await nextTick();

    dropdown = document.querySelector(dropdownCls);
    expect(value.value).toBe('string');
    expect(dropdown?.style?.visibility).toBe('hidden');
    expect(input.element.value).toBe('string');
    // class不会自动更新需要重新获取
    listItems = document.querySelectorAll(selectItemCls);
    expect(listItems[2].classList).toContain('active');
    wrapper.unmount();
  });

  it('select size and overview work', async () => {
    const wrapper = mount({
      setup() {
        return () => <DSelect size="sm" overview="underlined"></DSelect>;
      },
    });

    let container = wrapper.find(baseClass);
    expect(container.classes()).toContain(selectSMCls);
    expect(container.classes()).toContain(selectUnderlinedCls);

    await wrapper.setProps({
      size: 'lg',
      overview: 'border',
    });

    container = wrapper.find(baseClass);
    expect(container.classes()).toContain(selectLGCls);
    expect(container.classes()).not.toContain(selectUnderlinedCls);
    wrapper.unmount();
  });

  // select size priority
  it('select size priority', async () => {
    const dFormSize = ref('lg');
    const dSelectSize = ref('sm');
    const wrapper = mount({
      setup() {
        return () => (
          <DForm size={dFormSize.value}>
            <DFormItem>
              <DSelect size={dSelectSize.value}></DSelect>
            </DFormItem>
          </DForm>
        );
      },
    });

    let container = wrapper.find(baseClass);
    expect(container.classes()).toContain(selectSMCls);

    dSelectSize.value = '';
    await nextTick();

    container = wrapper.find(baseClass);
    expect(container.classes()).toContain(selectLGCls);

    dFormSize.value = '';
    await nextTick();

    container = wrapper.find(baseClass);
    expect(container.classes()).not.toContain(selectSMCls);
    expect(container.classes()).not.toContain(selectLGCls);

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

    const input = wrapper.find<HTMLInputElement>(selectInputCls);

    await input.trigger('focus');
    await input.trigger('blur');

    expect(onFocus).toBeCalledTimes(1);
    expect(onBlur).toBeCalledTimes(1);

    await input.trigger('click');

    expect(toggleChange).toBeCalledTimes(1);
    expect(valueChange).toBeCalledTimes(0);
    expect(value.value).toBe(2);

    const listItems = document.querySelectorAll(selectItemCls);
    await listItems[2].dispatchEvent(new Event('click'));

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

    const container = wrapper.find(baseClass);

    await container.trigger('click');
    const item = document.querySelectorAll(selectItemCls);
    await item[1].dispatchEvent(new Event('click'));
    expect(value.value).toBe(2);
    value.value = 1;
    await nextTick();
    const input = container.find<HTMLInputElement>(selectInputCls);
    expect(input.element.value).toBe('1');
    wrapper.unmount();
  });

  it('select disabled work', async () => {
    const wrapper = mount({
      setup() {
        return () => <DSelect disabled={true}></DSelect>;
      },
    });

    const container = wrapper.find(baseClass);
    expect(container.classes()).toContain(selectDisabledCls);

    const input = wrapper.find(selectInputCls);
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

    const container = wrapper.find(baseClass);

    await container.trigger('click');
    await nextTick();
    const item = document.querySelectorAll(selectItemCls);
    expect(item[1].classList).toContain('disabled');
    await item[1].dispatchEvent(new Event('click'));
    expect(value.value).toEqual([]);
    await item[0].dispatchEvent(new Event('click'));
    expect(value.value).toEqual([0]);
    wrapper.unmount();
  });

  it('select multiple and multiple-limit work', async () => {
    const value = ref([]);
    const options = reactive([0, 1, 2]);
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options} multiple={true} multipleLimit={3}></DSelect>;
      },
    });
    const container = wrapper.find(baseClass);

    await container.trigger('click');
    await nextTick();
    const item = document.querySelectorAll(selectItemCls);
    await item[0].dispatchEvent(new Event('click'));
    await item[1].dispatchEvent(new Event('click'));
    await item[2].dispatchEvent(new Event('click'));
    expect(value.value).toEqual([0, 1, 2]);
    // multiple-limit TODO，item的class没法动态更新

    wrapper.unmount();
  });

  it('select toggleChange work', async () => {
    const value = ref([]);
    const options = reactive([0]);
    const demoSelect = ref(null);
    const toggleChange = () => {
      demoSelect.value?.toggleChange(true);
    };
    const wrapper = mount({
      setup() {
        return () => (
          <div>
            <DSelect ref={demoSelect} v-model={value.value} options={options}></DSelect>
            <Button onClick={toggleChange}>展开</Button>
          </div>
        );
      },
    });
    let dropdown = document.querySelector(dropdownCls);
    expect(dropdown).toBeFalsy();

    const button = wrapper.find('button');
    button.trigger('click');
    await nextTick();
    dropdown = document.querySelector(dropdownCls);
    expect(dropdown?.style.width).toBe('100%');
    expect(dropdown?.style.visibility).toBe('visible');

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

    const container = wrapper.find(baseClass);
    const clearIcon = container.find(clearCls);

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

    const container = wrapper.find(baseClass);
    const section = wrapper.find(multipleCls);
    const multipleInput = wrapper.find(multipleInputCls);
    expect(section.exists()).toBeTruthy();
    expect(multipleInput.exists()).toBeTruthy();

    await container.trigger('click');
    await nextTick();
    const items = document.querySelectorAll(selectItemCls);
    await items[0].dispatchEvent(new Event('click'));
    expect(value.value).toStrictEqual([1]);
    const input = container.find<HTMLInputElement>(selectInputCls);
    expect(input.element.value).toBe('');

    const tags = wrapper.findAll(tagBaseClass);
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

    const container = wrapper.find(baseClass);

    await container.trigger('click');
    await nextTick();
    const items = document.querySelectorAll(selectItemCls);
    await items[0].dispatchEvent(new Event('click'));
    await items[1].dispatchEvent(new Event('click'));
    await items[2].dispatchEvent(new Event('click'));
    const tags = wrapper.findAll(tagBaseClass);
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
    const container = wrapper.find(baseClass);

    await container.trigger('click');
    await nextTick();
    const items = document.querySelectorAll(selectItemCls);
    await items[0].dispatchEvent(new Event('click'));
    await items[1].dispatchEvent(new Event('click'));
    await items[2].dispatchEvent(new Event('click'));
    const tags = wrapper.findAll(tagBaseClass);
    expect(tags.length).toBe(2);
    await tags[1].trigger('mouseenter');
    setTimeout(() => {
      const popoverContent = document.body.querySelector(popoverContentCls);
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
    const container = wrapper.find(baseClass);

    await container.trigger('click');
    await nextTick();
    const input = container.find<HTMLInputElement>(selectInputCls);
    await input.setValue('s');
    await input.trigger('input');
    setTimeout(() => {
      const items = wrapper.findAll(selectItemCls);
      expect(items[0].isVisible()).toBe(false);
    }, 300);

    await input.setValue('1');
    await input.trigger('input');
    setTimeout(() => {
      const items = wrapper.findAll(selectItemCls);
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
    const loading = ref(false);
    const filterFunc = (query: string) => {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          options.data = list.filter((item) => {
            return item.toLowerCase().includes(query.toLowerCase());
          }) as never[];
          loading.value = false;
        }, 200);
      } else {
        options.data = [];
      }
    };
    const wrapper = mount({
      setup() {
        return () => <DSelect v-model={value.value} options={options.data} filter={filterFunc} remote loading={loading.value}></DSelect>;
      },
    });
    const container = wrapper.find(baseClass);

    await container.trigger('click');
    await nextTick();
    const input = container.find<HTMLInputElement>(selectInputCls);
    await input.setValue('1');
    await input.trigger('input');
    setTimeout(() => {
      const noMachDataItem = wrapper.find(dropdownEmptyCls);
      expect(noMachDataItem.exists()).toBeTruthy();
      expect(noMachDataItem.text()).toBe('加载中');
      setTimeout(() => {
        const items = wrapper.findAll(selectItemCls);
        expect(items.length).toBe(1);
        expect(items[0].isVisible()).toBe(true);
      }, 200);
    }, 300);

    await input.setValue('1');
    await input.trigger('input');
    setTimeout(() => {
      const items = wrapper.findAll(selectItemCls);
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
    const input = wrapper.find(selectInputCls);

    await input.trigger('click');
    await nextTick();
    await input.setValue('test');
    await input.trigger('input');
    setTimeout(async () => {
      const items = wrapper.findAll(selectItemCls);
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
    const input = wrapper.find(selectInputCls);

    await input.trigger('click');
    await nextTick();
    const items = document.querySelectorAll(selectItemCls);
    expect(items.length).toBe(0);
    const noDataItem = document.querySelector(dropdownEmptyCls);
    expect(noDataItem).toBeTruthy();
    expect(noDataItem?.textContent).toBe('无数据');

    await wrapper.setProps({ options: list });
    const newItems = document.querySelectorAll(selectItemCls);
    expect(newItems.length).toBe(6);
    const newNoDataItem = wrapper.find(dropdownEmptyCls);
    expect(newNoDataItem.exists()).toBeFalsy();
    await input.setValue('test');
    await input.trigger('input');
    setTimeout(async () => {
      const lists = wrapper.findAll(selectItemCls);
      expect(lists.length).toBe(6);
      expect(lists[0].isVisible()).toBe(false);
      const noMachDataItem = wrapper.find(dropdownEmptyCls);
      expect(noMachDataItem.exists()).toBeTruthy();
      expect(noMachDataItem.text()).toBe('找不到相关记录');
    }, 300);
    wrapper.unmount();
  });

  it('select remote loading work', async () => {
    const value = ref([]);
    const list = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive({
      data: [],
    });
    const remoteLoading = ref(false);
    const toggleChange = (bool: boolean) => {
      if (bool) {
        remoteLoading.value = true;
        setTimeout(() => {
          options.data = list as never[];
          remoteLoading.value = false;
        }, 3000);
      }
    };
    const wrapper = mount({
      setup() {
        return () => (
          <DSelect v-model={value.value} options={options.data} loading={remoteLoading.value} onToggleChange={toggleChange}></DSelect>
        );
      },
    });
    const container = wrapper.find(baseClass);

    await container.trigger('click');
    await nextTick();
    const items = document.querySelectorAll(selectItemCls);
    expect(items.length).toBe(0);
    const remoteLoadingItem = document.querySelector(dropdownEmptyCls);
    expect(remoteLoadingItem).toBeTruthy();
    expect(remoteLoadingItem?.textContent).toBe('加载中...');
    setTimeout(() => {
      const newLoadingItem = wrapper.find(dropdownEmptyCls);
      expect(newLoadingItem.exists()).toBeFalsy();
      const remoteItems = wrapper.findAll(selectItemCls);
      expect(remoteItems.length).toBe(6);
    }, 3000);
    wrapper.unmount();
  });
});
