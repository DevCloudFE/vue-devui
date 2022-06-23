import { mount } from '@vue/test-utils';
import { ref, nextTick, reactive } from 'vue';
import DSelect from '../src/select';
import DOption from '../src/components/option';
import DOptionGroup from '../src/components/option-group';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('select', true);
const notDotNs = useNamespace('select');

const baseClass = ns.b();
const dropdownCls = ns.e('dropdown');
const selectItemCls = ns.e('item');
const selectInputCls = ns.e('input');

const selectOptionGroupCls = ns.e('group');
const optionGroupTitleCls = ns.e('group-title');

describe('optionGroup', () => {
  it('select customize optionGroup work', async () => {
    const value = ref('');
    const items = new Array(6).fill(0).map((item, i) => {
      return {
        value: `Option ${i + 1}`,
        name: `Option ${i + 1}`,
      };
    });
    const items1 = new Array(6).fill(0).map((item, i) => {
      return {
        value: `Test ${i + 1}`,
        name: `Test ${i + 1}`,
      };
    });
    const options1 = ref(items);
    const options2 = ref(items1);
    const wrapper = mount({
      setup() {
        return () => (
          <DSelect v-model={value.value} allow-clear={true}>
            <DOptionGroup label="分组一">
              {options1.value.map((item, i) => (
                <DOption key={i} value={item.value} name={item.name}></DOption>
              ))}
            </DOptionGroup>
            <DOptionGroup label="分组二">
              {options2.value.map((item, i) => (
                <DOption key={i} value={item.value} name={item.name}></DOption>
              ))}
            </DOptionGroup>
          </DSelect>
        );
      },
    });

    const container = wrapper.find(baseClass);
    let dropdown = wrapper.find(dropdownCls);
    const listItems = wrapper.findAll(selectItemCls);
    const input = wrapper.find<HTMLInputElement>(selectInputCls);

    expect(container.exists()).toBeTruthy();
    expect(dropdown.isVisible()).toBeFalsy();
    expect(listItems.length).toBe(12);

    await input.trigger('click');
    await nextTick();
    // isVisible不会自动更新需要重新获取
    dropdown = wrapper.find(dropdownCls);
    expect(dropdown.isVisible()).toBeTruthy();
    const optionGroups = dropdown.findAll(selectOptionGroupCls);
    expect(optionGroups.length).toBe(2);

    const groupTitle = optionGroups[0].find(optionGroupTitleCls);
    expect(groupTitle.exists()).toBeTruthy();
    expect(groupTitle.text()).toBe('分组一');

    await listItems[2].trigger('click');
    expect(value.value).toBe('Option 3');
    wrapper.unmount();
  });

  it('select customize optionGroup disabled', async () => {
    const value = ref('');
    const items = new Array(6).fill(0).map((item, i) => {
      return {
        value: `Option ${i + 1}`,
        name: `Option ${i + 1}`,
      };
    });
    const items1 = new Array(6).fill(0).map((item, i) => {
      return {
        value: `Test ${i + 1}`,
        name: `Test ${i + 1}`,
      };
    });
    const options1 = ref(items);
    const options2 = ref(items1);
    const disabled = ref(true);
    const wrapper = mount({
      setup() {
        return () => (
          <DSelect v-model={value.value} allow-clear={true}>
            <DOptionGroup label="分组一">
              {options1.value.map((item, i) => (
                <DOption key={i} value={item.value} name={item.name}></DOption>
              ))}
            </DOptionGroup>
            <DOptionGroup label="分组二" disabled={disabled.value}>
              {options2.value.map((item, i) => (
                <DOption key={i} value={item.value} name={item.name}></DOption>
              ))}
            </DOptionGroup>
          </DSelect>
        );
      },
    });

    const container = wrapper.find(baseClass);
    const input = container.find<HTMLInputElement>(selectInputCls);

    await input.trigger('click');
    await nextTick();
    const dropdown = wrapper.find(dropdownCls);
    const optionGroups = dropdown.findAll(selectOptionGroupCls);
    expect(optionGroups.length).toBe(2);

    const group = optionGroups[1];
    const listItems = group.findAll('.disabled');
    expect(listItems.length).toBe(6);
    await listItems[2].trigger('click');
    expect(value.value).toBe('');

    wrapper.unmount();
  });
});
