import { mount } from '@vue/test-utils';
import DSearch from '../src/search';
import { ref, nextTick } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Form as DForm, FormItem as DFormItem } from '../../form';

const searchNs = useNamespace('search');
const dotSearchNs = useNamespace('search', true);

const searchClass = searchNs.b();
const smSearchClass = searchNs.m('sm');
const lgSearchClass = searchNs.m('lg');
const disableSearchClass = searchNs.m('disabled');
const dotSearchClass = dotSearchNs.b();
const dotClearSearchClass = dotSearchNs.e('clear');
const dotIconSearchClass = dotSearchNs.e('icon');
const leftIconPositionClass = searchNs.m('left');
const rightIconPositionClass = searchNs.m('right');
const noBorderClass = searchNs.m('no-border');

describe('search test', () => {
  it('should render correctly', async () => {
    const value = ref('test');
    const wrapper = mount({
      components: { DSearch },
      template: `
        <d-search
          v-model="value"
        ></d-search>
      `,
      setup() {
        return {
          value,
        };
      },
    });
    expect(wrapper.classes()).toContain(searchClass);
    const search = wrapper.find(dotSearchClass);
    const input = search.find('input');
    expect(input.element.value).toBe('test');

    wrapper.unmount();
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
    await onSearch((str: string) => {
      expect(str).toBe('test');
    });
    expect(onSearch).toBeCalledTimes(1);

    // test input focus after trigger search button
    // TODO: 在单元测试环境中，input虽然处于focus状态，但是无法通过document.activeElement获取到
    // expect(input.element === document.activeElement).toBe(true);
    wrapper.unmount();
  });

  it('props v-model should work well.', async () => {
    const value = ref('test');

    const wrapper = mount({
      components: { DSearch },
      template: `
        <d-search
          v-model="value"
        ></d-search>
      `,
      setup() {
        return {
          value,
        };
      },
    });

    const search = wrapper.find(dotSearchClass);
    const input = search.find('input');
    expect(input.element.value).toBe('test');

    // test v-model
    await input.setValue('def');
    expect(value.value).toBe('def');

    value.value = 'change value';
    await nextTick();
    expect(input.element.value).toBe('change value');

    wrapper.unmount();
  });

  it('props size(sm/md/lg) should work well.', async () => {
    const size = ref('');

    const wrapper = mount({
      components: { DSearch },
      template: `
        <d-search
          :size="size"
        ></d-search>
      `,
      setup() {
        return {
          size,
        };
      },
    });

    const search = wrapper.find(dotSearchClass);
    const input = search.find('input');

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

    wrapper.unmount();
  });

  it('props size priority', async () => {
    const dFormSize = ref('lg');
    const dSearchSize = ref('sm');

    const wrapper = mount({
      components: {DSearch, DForm, DFormItem},
      template: `
        <DForm :size="dFormSize">
          <DFormItem>
            <d-search
              :size="dSearchSize"
            ></d-search>
          </DFormItem>
        </DForm>`,
      setup() {
        return {
          dFormSize,
          dSearchSize
        };
      },
    });

    const dSearch = wrapper.find(dotSearchClass);
    // form 与 元素同时存在size 属性，以元素为准。
    expect(dSearch.classes()).toContain(smSearchClass);

    dSearchSize.value = '';
    await nextTick();

    // 元素不存在 size ，form 存在，以表单为准
    expect(dSearch.classes()).toContain(lgSearchClass);

    dFormSize.value = '';
    await nextTick();

    // form 与 元素都不存在 size 属性，使用默认值。
    expect(dSearch.classes()).not.toContain(smSearchClass);
    expect(dSearch.classes()).not.toContain(lgSearchClass);

    wrapper.unmount();
  });

  it('clear operation should work well.', async () => {
    const value = ref('test');
    const wrapper = mount({
      components: { DSearch },
      template: `
        <d-search
          v-model="value"
        ></d-search>
      `,
      setup() {
        return {
          value,
        };
      },
    });

    const search = wrapper.find(dotSearchClass);
    const input = search.find('input');
    expect(input.element.value).toBe('test');

    // test clear
    const clear = wrapper.find(dotClearSearchClass);
    await clear.trigger('click');
    expect(input.element.value).toBe('');
    expect(value.value).toBe('');

    wrapper.unmount();
  });

  it('props disabled should work well.', async () => {
    const disabled = ref(false);
    const wrapper = mount({
      components: { DSearch },
      template: `
        <d-search
          :disabled="disabled"
        ></d-search>
      `,
      setup() {
        return {
          disabled,
        };
      },
    });
    const search = wrapper.find(dotSearchClass);
    const input = search.find('input');

    // test disabled
    expect(input.attributes('disabled')).toBe(undefined);
    expect(wrapper.classes()).not.toContain(disableSearchClass);

    disabled.value = true;
    await nextTick();
    expect(wrapper.classes()).toContain(disableSearchClass);
    expect(input.attributes('disabled')).toBe('');

    wrapper.unmount();
  });

  it('props icon-position(right/left) should work well.', async () => {
    const wrapper = mount(DSearch);

    const iconSearch = wrapper.find(dotIconSearchClass);

    expect(iconSearch.exists()).toBe(true);

    expect(wrapper.classes()).toContain(rightIconPositionClass);

    await wrapper.setProps({
      iconPosition: 'left',
    });
    expect(wrapper.classes()).toContain(leftIconPositionClass);

    await wrapper.setProps({
      iconPosition: 'right',
    });
    expect(wrapper.classes()).toContain(rightIconPositionClass);

    wrapper.unmount();
  });

  it('props no-border should work well.', async () => {
    const wrapper = mount(DSearch);

    expect(wrapper.classes()).not.toContain(noBorderClass);

    await wrapper.setProps({
      noBorder: true,
    });

    expect(wrapper.classes()).toContain(noBorderClass);

    wrapper.unmount();
  });

  it.todo('props placeholder should work well.');

  it.todo('props auto-focus should work well.');

  it.todo('props is-keyup-search should work well.');

  it.todo('props delay should work well.');

  it.todo('props max-length should work well.');
});
