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

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

describe('Basic EditableSelect', () => {
  it('Should render basic editable select correctly.', async () => {
    const wrapper = mount({
      setup() {
        return () => <EditableSelect />;
      },
    });
    await nextTick();

    expect(wrapper.find(ns.b()).exists()).toBeTruthy();
    expect(wrapper.find(ns.e('arrow-icon')).isVisible()).toBeTruthy();
    expect(wrapper.find(ns.e('clear-icon')).isVisible()).toBeFalsy();
    expect(wrapper.find(ns.e('dropdown')).exists()).toBeFalsy();

    const input = wrapper.find(inputClasses.e('inner'));
    expect(input.attributes('placeholder')).toBe('Select');
    await wrapper.trigger('click');

    expect(wrapper.find(inputClasses.b()).classes()).toContain(inputClasses.m('open').slice(1));
    expect(wrapper.find(ns.e('dropdown')).exists()).toBeTruthy();

    wrapper.unmount();
  });

  it('Should render correct number of item and item content.', async () => {
    const data = createData();
    const wrapper = mount({
      setup() {
        return () => <EditableSelect options={data} />;
      },
    });

    await nextTick();

    await wrapper.trigger('click');

    const options = wrapper.findAll(ns.e('item'));
    expect(options).toHaveLength(data.length);

    const res = options.every((option, index) => {
      return option.text() === data[index].label;
    });

    expect(res).toBeTruthy();
    wrapper.unmount();
  });

  it('Should render correct default value.', async () => {
    const wrapper = mount({
      setup() {
        const value = ref(4);
        const data = createData();
        return () => {
          return <EditableSelect v-model={value.value} options={data} />;
        };
      },
    });

    await nextTick();
    expect((wrapper.find(inputClasses.e('inner')).element as HTMLInputElement).value).toBe('Option4');
  });

  it('The dropdown item should be highlighted when clicked.', async () => {
    const wrapper = mount({
      setup() {
        const data = createData();
        const value = ref(2);
        return () => {
          return <EditableSelect v-model={value.value} options={data} />;
        };
      },
    });
    await nextTick();

    await wrapper.trigger('click');
    await wrapper.findAll(ns.e('item'))[1].trigger('click');
    await wrapper.trigger('click');

    expect(wrapper.findAll(ns.e('item'))[1].classes()).toContain(ns.em('item', 'selected').slice(1));
    expect((wrapper.find(inputClasses.e('inner')).element as HTMLInputElement).value).toBe('Option1');

    wrapper.unmount();
  });

  it('keyboard operations', async () => {
    const wrapper = mount({
      setup() {
        const data = createData();
        const value = ref(1);
        return () => {
          return <EditableSelect v-model={value.value} options={data} />;
        };
      },
    });

    await nextTick();

    await wrapper.trigger('click');
    const input = wrapper.find(inputClasses.e('inner'));
    await input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(wrapper.findAll(ns.e('item'))[2].classes()).toContain(ns.em('item', 'hover').slice(1));
    await input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(wrapper.findAll(ns.e('item'))[1].classes()).toContain(ns.em('item', 'hover').slice(1));

    await input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(wrapper.find('input').element.value).toBe('Option1');

    await input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(wrapper.findComponent({ name: 'DEditableSelectDropdown' }).exists()).toBeFalsy();
    await input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(wrapper.findComponent({ name: 'DEditableSelectDropdown' }).exists()).toBeTruthy();

    await input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    expect(wrapper.findComponent({ name: 'DEditableSelectDropdown' }).exists()).toBeFalsy();

    wrapper.unmount();
  });
});
