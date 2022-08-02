import { mount } from '@vue/test-utils';
import { ref, nextTick, reactive } from 'vue';
import DSelect from '../src/select';
import DOption from '../src/components/option';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('select', true);
const notDotNs = useNamespace('select');

const baseClass = ns.b();
const selectOpenCls = notDotNs.m('open');
const dropdownCls = ns.e('dropdown');
const selectItemCls = ns.e('item');
const selectInputCls = ns.e('input');

describe('option', () => {
  it('select customize option work', async () => {
    const value = ref('');
    const items = new Array(6).fill(0).map((item, i) => {
      return {
        value: `Option ${i + 1}`,
        name: `Option ${i + 1}`,
      };
    });
    const options = ref(items);
    const wrapper = mount({
      setup() {
        return () => (
          <DSelect v-model={value.value} allow-clear={true}>
            {options.value.map((item, i) => (
              <DOption key={i} value={item.value} name={item.name}></DOption>
            ))}
          </DSelect>
        );
      },
    });

    const container = wrapper.find(baseClass);
    let dropdown = document.querySelector(dropdownCls);

    const input = wrapper.find<HTMLInputElement>(selectInputCls);

    expect(container.exists()).toBeTruthy();
    expect(dropdown).toBeFalsy();

    await input.trigger('click');
    await nextTick();
    dropdown = document.querySelector(dropdownCls);
    expect(dropdown).toBeTruthy();
    expect(container.classes()).toContain(selectOpenCls);
    const listItems = document.querySelectorAll(selectItemCls);
    expect(listItems.length).toBe(6);

    await listItems[2].dispatchEvent(new Event('click'));
    expect(value.value).toBe('Option 3');
    wrapper.unmount();
  });

  it('option items data changed work', async () => {
    const value = ref('');
    const items = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive({
      data: items,
    });
    const wrapper = mount({
      setup() {
        return () => (
          <DSelect v-model={value.value} allow-clear={true}>
            {options.data.map((item, i) => (
              <DOption key={i} value={item}></DOption>
            ))}
          </DSelect>
        );
      },
    });
    const container = wrapper.find(baseClass);

    await container.trigger('click');
    await nextTick();
    let listItems = document.querySelectorAll(selectItemCls);
    expect(listItems.length).toBe(6);
    await listItems[2].dispatchEvent(new Event('click'));
    expect(value.value).toBe('Option 3');

    options.data = new Array(3).fill(0).map((item, i) => `Test ${i + 1}`);
    await nextTick();
    listItems = document.querySelectorAll(selectItemCls);
    expect(listItems.length).toBe(3);
    await listItems[0].dispatchEvent(new Event('click'));
    expect(value.value).toBe('Test 1');
    wrapper.unmount();
  });

  it('option item disabled work', async () => {
    const value = ref('');
    const items = new Array(6).fill(0).map((item, i) => {
      return {
        name: `Option ${i + 1}`,
        value: `Option ${i + 1}`,
        disabled: i % 2 === 0,
      };
    });
    const options = reactive(items);
    const wrapper = mount({
      setup() {
        return () => (
          <DSelect v-model={value.value} allow-clear={true}>
            {options.map((item, i) => (
              <DOption key={i} value={item.value} name={item.name} disabled={item.disabled}></DOption>
            ))}
          </DSelect>
        );
      },
    });
    const container = wrapper.find(baseClass);

    await container.trigger('click');
    const listItems = document.querySelectorAll(selectItemCls);
    await listItems[1].dispatchEvent(new Event('click'));
    expect(value.value).toBe('Option 2');
    await listItems[0].dispatchEvent(new Event('click'));
    expect(value.value).toBe('Option 2');
    wrapper.unmount();
  });
});
