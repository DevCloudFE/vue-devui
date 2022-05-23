import { mount } from '@vue/test-utils';
import DSearch from '../src/search';
import { ref, nextTick } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';

const searchNs = useNamespace('search');
const dotSearchNs = useNamespace('search', true);

const searchClass = searchNs.b();
const smSearchClass = searchNs.m('sm');
const lgSearchClass = searchNs.m('lg');
const disableSearchClass = searchNs.m('disabled');
const dotSearchClass = dotSearchNs.b();
const dotClearSearchClass = dotSearchNs.e('clear');
const dotIconSearchClass = dotSearchNs.e('icon');

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
      },
    });
    expect(wrapper.classes()).toContain(searchClass);
    const search = wrapper.find(dotSearchClass);
    const input = search.find('input');
    expect(input.element.value).toBe('test');

    // test size
    expect(input.classes()).not.toContain(smSearchClass);
    expect(input.classes()).not.toContain(lgSearchClass);

    size.value = 'sm';
    await nextTick();
    expect(wrapper.classes()).toContain(smSearchClass);
    expect(wrapper.classes()).not.toContain(lgSearchClass);
    size.value = 'lg';
    await nextTick();
    expect(wrapper.classes()).not.toContain(smSearchClass);
    expect(wrapper.classes()).toContain(lgSearchClass);

    // test v-model
    await input.setValue('def');
    expect(value.value).toBe('def');

    value.value = 'change value';
    await nextTick();
    expect(input.element.value).toBe('change value');

    // test clear
    const clear = wrapper.find(dotClearSearchClass);
    await clear.trigger('click');
    expect(input.element.value).toBe('');
    expect(value.value).toBe('');

    // test disabled
    expect(input.attributes('disabled')).toBe(undefined);
    expect(wrapper.classes()).not.toContain(disableSearchClass);

    disabled.value = true;
    await nextTick();
    expect(wrapper.classes()).toContain(disableSearchClass);
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
          onSearch,
        };
      },
    });
    const search = wrapper.find(dotSearchClass);
    const searchBtn = search.find(dotIconSearchClass);
    await searchBtn.trigger('click');
    await onSearch((str) => {
      expect(str).toBe('test');
    });
    expect(onSearch).toBeCalledTimes(1);
  });
});
