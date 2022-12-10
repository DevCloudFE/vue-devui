import { reactive, ref, nextTick } from 'vue';
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

describe('Clearable EditableSelect', () => {
  it('editable select clear work ', async () => {
    const handleClear = jest.fn();
    const wrapper = mount({
      setup() {
        const value = ref(1);
        const data = createData();
        return () => {
          return <EditableSelect v-model={value.value} options={data} allow-clear onClear={handleClear} />;
        };
      },
    });

    await nextTick();
    expect(wrapper.find(ns.e('arrow-icon')).isVisible()).toBeTruthy();
    expect(wrapper.find(ns.e('clear-icon')).isVisible()).toBeFalsy();

    await wrapper.find(inputClasses.b()).trigger('mouseenter');

    expect(wrapper.find(ns.e('clear-icon')).isVisible()).toBeTruthy();
    expect(wrapper.find(ns.e('arrow-icon')).isVisible()).toBeFalsy();

    expect((wrapper.find(inputClasses.e('inner')).element as HTMLInputElement).value).toBe('Option1');
    await wrapper.find(ns.e('clear-icon')).trigger('click');
    expect(handleClear).toBeCalled();

    expect((wrapper.find(inputClasses.e('inner')).element as HTMLInputElement).value).toBe('');

    await wrapper.trigger('click');
    await wrapper.findAll(ns.e('item'))[1].trigger('click');

    expect((wrapper.find(inputClasses.e('inner')).element as HTMLInputElement).value).toBe('Option1');
    await wrapper.find(inputClasses.b()).trigger('mouseleave');

    expect(wrapper.find(ns.e('arrow-icon')).isVisible()).toBeTruthy();
    expect(wrapper.find(ns.e('clear-icon')).isVisible()).toBeFalsy();

    wrapper.unmount();
  });
});
