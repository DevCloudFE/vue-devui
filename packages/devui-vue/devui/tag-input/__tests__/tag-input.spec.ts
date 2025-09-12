import { mount } from '@vue/test-utils';
import { reactive, nextTick } from 'vue';
import DTagInput from '../src/tag-input';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Suggestion } from '../src/tag-input-types';

interface StateType {
  tags: Array<Suggestion>;
  suggestionList: Array<Suggestion>;
}

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const ns = useNamespace('tag-input', true);
const suggestionListCls = ns.e('suggestion-list');
const suggestionListItemCls = ns.e('suggestion-list__item');
const tagsItemCls = ns.e('tags__item');
const inputCls = ns.e('input');

const customMount = (state: StateType) => mount({
  components: { DTagInput },
  template: `
    <d-tag-input
      v-model="state.tags"
      v-model:suggestionList="state.suggestionList"
      displayProperty="cname"
    ></d-tag-input>
  `,
  setup() {
    return {
      state,
    };
  },
});

describe('DTagInput', () => {
  it('tag-input render work', async () => {
    const state = reactive({
      tags: [
        { cname: 'Y.Chen' },
        { cname: 'b' },
        { cname: 'c' },
      ],
      suggestionList: [
        { cname: 'd' },
        { cname: 'e' },
        { cname: 'f' },
      ],
    });
    const wrapper = customMount(state);
    expect(wrapper.find(ns.b()).exists()).toBe(true);
    expect(wrapper.find(ns.e('tags')).exists()).toBe(true);
    expect(wrapper.find(inputCls).exists()).toBe(true);

    const itemA = wrapper.find(tagsItemCls);
    expect(itemA.exists()).toBe(true);
    expect(itemA.text()).toBe('Y.Chen');

    state.tags[0] = { cname: 'X.Zhang' };
    await nextTick();
    expect(itemA.text()).toBe('X.Zhang');

    wrapper.unmount();
  });

  it('tag-input show suggestion work', async () => {
    const state = reactive({
      tags: [
        { cname: 'a' },
      ],
      suggestionList: [
        { cname: 'b' },
      ],
    });
    const wrapper = customMount(state);
    const input = wrapper.find(inputCls);

    expect(wrapper.find(suggestionListCls).exists()).toBe(false);
    await input.trigger('focus');

    // 是否存在 devui-suggestion-list
    const suggestionList = !!document.querySelectorAll(suggestionListCls)[0];
    expect(suggestionList).toBe(true);

    wrapper.unmount();
  });

  it('tag-input disabled work', async () => {
    const tags = reactive([
      { cname: 'a' },
    ]);
    const suggestionList = reactive([
      { cname: 'b' },
    ]);
    const wrapper = mount(DTagInput, {
      props: {
        tags,
        suggestionList,
        disabled: false,
      },
    });

    expect(wrapper.find('.is-disabled').exists()).toBe(false);
    expect(wrapper.find(inputCls).isVisible()).toBe(true);

    await wrapper.setProps({
      disabled: true,
    });

    expect(wrapper.find('.is-disabled').exists()).toBe(true);
    // 禁用状态下不显示input
    expect(wrapper.find(ns.e('input_hide')).exists()).toBe(true);
    expect(wrapper.find('.remove-button').exists()).toBe(false);

    wrapper.unmount();
  });

  it('tag-input maxTags work', () => {
    const tags = reactive([
      { cname: 'a' },
      { cname: 'b' },
    ]);
    const suggestionList = reactive([
      { cname: 'c' },
    ]);
    const wrapper = mount(DTagInput, {
      props: {
        modelValue: tags,
        suggestionList,
        maxTags: 1,
      },
    });

    expect(wrapper.find('input').attributes('disabled')).toBe('');

    wrapper.unmount();
  });

  it('tag-input removeTag work', () => {
    const state = reactive({
      tags: [
        { cname: 'a' },
        { cname: 'b' },
      ],
      suggestionList: [
        { cname: 'c' },
      ],
    });
    const wrapper = customMount(state);

    // todo 使用await报错 The provided value is not of type 'Element'
    wrapper.find('.remove-button').trigger('click');

    nextTick(() => {
      expect(wrapper.findAll(tagsItemCls).length).toBe(1);
      expect(state.tags.length).toBe(1);
      expect(state.suggestionList.length).toBe(2);

      wrapper.unmount();
    });
  });

  it('tag-input keydown work', async () => {
    const state = reactive({
      tags: [
        { cname: 'a' },
        { cname: 'b' },
      ],
      suggestionList: [
        { cname: 'c' },
        { cname: 'xyz' },
      ],
    });
    const wrapper = customMount(state);
    const input = wrapper.find('input');
    await input.setValue('dfg');
    await input.trigger('keydown', { key: 'Enter' });
    expect(state.tags.length).toBe(3);
    expect(state.suggestionList.length).toBe(2);

    await input.setValue('yz');
    await input.trigger('keydown', { key: 'Enter' });
    expect(state.tags.length).toBe(4);
    expect(state.tags[3].cname).toBe('xyz');
    expect(state.suggestionList.length).toBe(1);

    wrapper.unmount();
  });

  it('tag-input filter suggestion work', async () => {
    const state = reactive({
      tags: [
        { cname: 'a' },
        { cname: 'b' },
      ],
      suggestionList: [
        { cname: 'x' },
        { cname: 'xy' },
        { cname: 'xyz' },
      ],
    });
    const wrapper = customMount(state);
    const input = wrapper.find('input');

    await input.trigger('focus');
    let suggestionList = document.querySelectorAll(suggestionListItemCls);
    expect(suggestionList.length).toBe(3);

    await input.setValue('xy');
    await input.trigger('input');
    suggestionList = document.querySelectorAll(suggestionListItemCls);
    expect(suggestionList.length).toBe(2);

    await input.setValue('xxx');
    await input.trigger('input');
    suggestionList = document.querySelectorAll(suggestionListItemCls);
    expect(suggestionList.length).toBe(1);

    wrapper.unmount();
  });

  it('tag-input click suggestion work', async () => {
    const state = reactive({
      tags: [
        { cname: 'a' },
        { cname: 'b' },
      ],
      suggestionList: [
        { cname: 'x' },
        { cname: 'yyy' },
        { cname: 'xyz' },
      ],
    });
    const wrapper = customMount(state);
    await wrapper.find('input').trigger('focus');
    const suggestionList = document.querySelectorAll(suggestionListItemCls);
    const yyy = suggestionList[1];
    yyy.dispatchEvent(new Event('click'));

    expect(state.tags.length).toBe(3);
    expect(state.tags[2].cname).toBe('yyy');
    expect(state.suggestionList.length).toBe(2);

    wrapper.unmount();
  });

  it('tag-input arrow work', async () => {
    const state = reactive({
      tags: [
        { cname: 'a' },
        { cname: 'b' },
      ],
      suggestionList: [
        { cname: 'x' },
        { cname: 'yyy' },
        { cname: 'xyz' },
      ],
    });
    const wrapper = customMount(state);
    const input = wrapper.find('input');
    await input.trigger('focus');
    let suggestionList = document.querySelectorAll(suggestionListItemCls);
    // 获取焦点默认第一个选中
    expect(suggestionList[0].className).toContain('selected');

    // 按下 下箭头，选中第二个数组第一个
    await input.trigger('keydown', { key: 'ArrowDown' });
    suggestionList = document.querySelectorAll(suggestionListItemCls);
    expect(suggestionList[1].className).toContain('selected');

    await input.trigger('keydown', { key: 'ArrowUp' });
    await input.trigger('keydown', { key: 'ArrowUp' });
    suggestionList = document.querySelectorAll(suggestionListItemCls);
    expect(suggestionList[2].className).toContain('selected');

    // 按下Enter选中数据
    await input.trigger('keydown', { key: 'Enter' });
    expect(state.tags[2].cname).toBe('xyz');
    expect(state.suggestionList.length).toBe(2);

    wrapper.unmount();
  });
});
