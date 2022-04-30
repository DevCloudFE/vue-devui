import { mount } from '@vue/test-utils';
import DSearch from '../src//search';
import { ref, nextTick } from 'vue';

describe('search test', () => {
  it('should render correctly', async () => {
    const value = ref('test');
    const size = ref('');
    const disabled = ref(false);
    const wrapper = mount({
      components: { DSearch },
      template: `
        <d-search
          :size="size"
          :disabled="disabled"
          v-model="value"
        ></d-search>
      `,
      setup() {
        return {
          value,
          size,
          disabled,
        };
      }
    });
    expect(wrapper.classes()).toContain('devui-search');
    const search = wrapper.find('.devui-search');
    const input = search.find('input');
    expect(input.element.value).toBe('test');

    // test size
    expect(input.classes()).not.toContain('devui-input-sm');
    expect(input.classes()).not.toContain('devui-input-lg');

    size.value = 'sm';
    await nextTick();
    expect(wrapper.classes()).toContain(`devui-search__sm`);
    expect(wrapper.classes()).not.toContain('devui-search__lg');
    size.value = 'lg';
    await nextTick();
    expect(wrapper.classes()).not.toContain('devui-search__sm');
    expect(wrapper.classes()).toContain(`devui-search__lg`);

    // test v-model
    await input.setValue('def');
    expect(value.value).toBe('def');

    value.value = 'change value';
    await nextTick();
    expect(input.element.value).toBe('change value');

    // test clear
    const clear = wrapper.find('.devui-search__clear');
    await clear.trigger('click');
    expect(input.element.value).toBe('');
    expect(value.value).toBe('');

    // test disabled
    expect(input.attributes('disabled')).toBe(undefined);
    expect(wrapper.classes()).not.toContain('devui-search__disbaled');

    disabled.value = true;
    await nextTick();
    expect(wrapper.classes()).toContain('devui-search__disbaled');
    expect(input.attributes('disabled')).toBe('');
  });

  it('should event correctly', async () => {
    const value = ref('test');
    const onSearch = jest.fn();
    const wrapper = mount({
      components: { DSearch },
      template: `
        <d-search
          v-model="value"
          @onSearch="onSearch"
        ></d-search>
      `,
      setup() {
        return {
          value,
          onSearch
        };
      }
    });
    const search = wrapper.find('.devui-search');
    const searchBtn = search.find('.devui-search__icon');
    await searchBtn.trigger('click');
    await onSearch((str) => {
      expect(str).toBe('test');
    });
    expect(onSearch).toBeCalledTimes(1);
  });
});
