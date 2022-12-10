import { reactive, ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import EditableSelect from '../src/editable-select';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { wait } from '../../shared/utils';


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

describe('Filter EditableSelect', () => {
  it('filter option', async () => {
    const wrapper = mount({
      setup() {
        const value = ref('');
        const data = createData();
        return () => {
          return <EditableSelect v-model={value.value} options={data} />;
        };
      },
    });

    await nextTick();
    await wrapper.trigger('click');

    expect((wrapper.find(inputClasses.e('inner')).element as HTMLInputElement).value).toBe('');
    await wrapper.find(inputClasses.e('inner')).setValue('Option2');

    const options = wrapper.findAll(ns.e('item'));
    expect(options.length).not.toBe(0);

    const res = options.some((option) => {
      return option.text() === 'Option2';
    });

    expect(res).toBeTruthy();
    wrapper.unmount();
  });

  it('should call filter method', async () => {
    const filterMethod = jest.fn();
    const wrapper = mount({
      setup() {
        const value = ref('');
        const data = createData();
        return () => {
          return <EditableSelect v-model={value.value} options={data} filter-method={filterMethod} />;
        };
      },
    });
    await nextTick();
    await wrapper.trigger('click');
    await wrapper.find(inputClasses.e('inner')).setValue('Option2');
    expect(filterMethod).toBeCalled();
    wrapper.unmount();
  });

  test('should call remote method', async () => {
    const remoteMethod = jest.fn();
    const wrapper = mount({
      setup() {
        const value = ref('');
        const data = createData();
        return () => {
          return <EditableSelect v-model={value.value} options={data} remote remote-method={remoteMethod} />;
        };
      },
    });
    await nextTick();
    await wrapper.trigger('click');
    await wrapper.find(inputClasses.e('inner')).setValue('Option2');
    await wait(300);
    expect(remoteMethod).toBeCalled();
    wrapper.unmount();
  });
});
