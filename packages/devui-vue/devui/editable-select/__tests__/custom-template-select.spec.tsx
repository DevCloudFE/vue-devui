import { reactive, ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import EditableSelect from '../src/editable-select';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Option } from '../src/editable-select-types';

interface SlotPropsType {
  option: Option;
  index: number;
}

const ns = useNamespace('editable-select', true);
const inputClasses = useNamespace('editable-select-input', true);

const createData = (len = 5) => {
  return reactive(
    Array.from({ length: len }).map((_, index) => {
      return {
        label: `Option${index}`,
        value: index,
      };
    })
  );
};

describe('Custom EditableSelect', () => {
  it('custom editable select item renderer', async () => {
    const wrapper = mount({
      setup() {
        const value = ref();
        const data = createData();
        return () => {
          return (
            <EditableSelect v-model={value.value} options={data}>
              {{
                item: (slotProps: SlotPropsType) => {
                  return <div>{`第${slotProps.index}项:${slotProps.option.label}`}</div>;
                },
              }}
            </EditableSelect>
          );
        };
      },
    });

    await nextTick();
    await wrapper.trigger('click');
    await wrapper.findAll(ns.e('item'))[0].trigger('click');
    expect((wrapper.find(inputClasses.e('inner')).element as HTMLInputElement).value).toBe('Option0');
    wrapper.unmount();
  });

  it('custom editable select no result item renderer.', async () => {
    const wrapper = mount({
      setup() {
        const value = ref('option1');
        return () => {
          return (
            <EditableSelect v-model={value.value}>
              {{
                noResultItem: () => {
                  {
                    return <div>{`没有匹配项`}</div>;
                  }
                },
              }}
            </EditableSelect>
          );
        };
      },
    });

    await nextTick();
    await wrapper.trigger('click');
    expect(wrapper.find(ns.em('item', 'no-data-tip')).text()).toContain('没有匹配项');
    wrapper.unmount();
  });
});
