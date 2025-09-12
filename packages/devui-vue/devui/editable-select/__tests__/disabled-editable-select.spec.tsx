import { reactive, ref } from 'vue';
import { mount } from '@vue/test-utils';
import EditableSelect from '../src/editable-select';
import { useNamespace } from '../../shared/hooks/use-namespace';

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

describe('Disabled EditableSelect', () => {
  it('disabled editable select', () => {
    const wrapper = mount({
      setup() {
        const value = ref(4);
        const data = createData();
        return () => {
          return <EditableSelect v-model={value.value} options={data} disabled />;
        };
      },
    });

    expect((wrapper.find(inputClasses.e('inner')).element as HTMLInputElement).disabled).toBeTruthy();
    wrapper.unmount();
  });

  it('disabled option', async () => {
    const wrapper = mount({
      setup() {
        const value = ref('label2');
        const data = reactive([
          {
            label: 'label0',
            value: 'label0',
          },
          {
            label: 'label1',
            value: 'label1',
            disabled: true,
          },
          {
            label: 'label2',
            value: 'label2',
          },
        ]);
        return () => {
          return <EditableSelect v-model={value.value} options={data} disabled-key="disabled" />;
        };
      },
    });

    await wrapper.trigger('click');

    const options = wrapper.findAll(ns.e('item'));
    expect(options[1].classes()).toContain(ns.em('item', 'disabled').slice(1));

    await options[0].trigger('click');

    expect((wrapper.find(inputClasses.e('inner')).element as HTMLInputElement).value).toBe('label0');

    await options[1].trigger('click');

    expect((wrapper.find(inputClasses.e('inner')).element as HTMLInputElement).value).toBe('label0');
    wrapper.unmount();
  });
});
