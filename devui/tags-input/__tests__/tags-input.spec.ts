import { mount } from '@vue/test-utils';
import { reactive, nextTick } from 'vue';
import DTagsInput from '../src/tags-input';

const customMount = (state) => mount({
  components: { DTagsInput },
  template: `
    <d-tags-input
      v-model:tags="state.tags"
      v-model:suggestionList="state.suggestionList"
      displayProperty="cname"></d-tags-input>
  `,
  setup () {
    return {
      state
    };
  }
});

describe('DTagsInput', () => {
  it('tags-input render work', async () => {
    const state = reactive({
      tags: [
        { cname: 'Y.Chen' },
        { cname: 'b' },
        { cname: 'c' }
      ],
      suggestionList: [
        { cname: 'd' },
        { cname: 'e' },
        { cname: 'f' },
      ]
    });
    const wrapper = customMount(state);

    expect(wrapper.find('.devui-tags-host').exists()).toBe(true);
    expect(wrapper.find('.devui-tags').exists()).toBe(true);
    expect(wrapper.find('.devui-tag-list').exists()).toBe(true);
    expect(wrapper.find('.devui-input').exists()).toBe(true);

    const itemA = wrapper.find('.devui-tag-item');
    expect(itemA.exists()).toBe(true);
    expect(itemA.text()).toBe('Y.Chen');

    state.tags[0] = { cname: 'X.Zhang' };
    await nextTick();
    expect(itemA.text()).toBe('X.Zhang');
  });

  it('tags-input show suggestion work', async () => {
    const state = reactive({
      tags: [
        { cname: 'a' },
      ],
      suggestionList: [
        { cname: 'b' },
      ]
    });
    const wrapper = customMount(state);
    const input = wrapper.find('input.devui-input');

    expect(wrapper.find('.devui-suggestion-list').exists()).toBe(false);
    await input.trigger('focus');
    expect(wrapper.find('.devui-suggestion-list').exists()).toBe(true);
  });

  it('tags-input disabled work', async () => {
    const tags = reactive([
      { cname: 'a' },
    ]);
    const suggestionList = reactive([
      { cname: 'b' },
    ]);
    const wrapper = mount(DTagsInput, {
      props: {
        tags,
        suggestionList,
        disabled: false
      }
    });

    expect(wrapper.find('.devui-disabled').exists()).toBe(false);
    expect(wrapper.find('.devui-input').isVisible()).toBe(true);

    await wrapper.setProps({
      disabled: true
    });
    expect(wrapper.find('.devui-disabled').exists()).toBe(true);
    expect(wrapper.find('.devui-input').isVisible()).toBe(false);
    expect(wrapper.find('.remove-button').exists()).toBe(false);
  });

  it('tags-input maxTags work', () => {
    const tags = reactive([
      { cname: 'a' },
      { cname: 'b' },
    ]);
    const suggestionList = reactive([
      { cname: 'c' },
    ]);
    const wrapper = mount(DTagsInput, {
      props: {
        tags,
        suggestionList,
        maxTags: 1
      }
    });

    expect(wrapper.find('input').attributes('disabled')).toBe('');
  });

  it('tags-input removeTag work', async () => {
    const state = reactive({
      tags: [
        { cname: 'a' },
        { cname: 'b' },
      ],
      suggestionList: [
        { cname: 'c' },
      ]
    });
    const wrapper = customMount(state);
    const removeSvg = wrapper.find('.remove-button');
    await removeSvg.trigger('mousedown');
    expect(wrapper.findAll('.devui-tag-item').length).toBe(1);
    expect(state.tags.length).toBe(1);
    expect(state.suggestionList.length).toBe(2);
  });

  it('tags-input keydown work', async () => {
    const state = reactive({
      tags: [
        { cname: 'a' },
        { cname: 'b' },
      ],
      suggestionList: [
        { cname: 'c' },
        { cname: 'xyz' }
      ]
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
  });

  it('tags-input filter suggestion work', async () => {
    const state = reactive({
      tags: [
        { cname: 'a' },
        { cname: 'b' },
      ],
      suggestionList: [
        { cname: 'x' },
        { cname: 'xy' },
        { cname: 'xyz' }
      ]
    });
    const wrapper = customMount(state);
    const input = wrapper.find('input');

    await input.trigger('focus');
    expect(wrapper.findAll('.devui-suggestion-item').length).toBe(3);

    await input.setValue('xy');
    await input.trigger('input');
    expect(wrapper.findAll('.devui-suggestion-item').length).toBe(2);

    await input.setValue('xxx');
    await input.trigger('input');
    expect(wrapper.findAll('.devui-suggestion-item.devui-disabled').length).toBe(1);
  });

  it('tags-input click suggestion work', async () => {
    const state = reactive({
      tags: [
        { cname: 'a' },
        { cname: 'b' },
      ],
      suggestionList: [
        { cname: 'x' },
        { cname: 'yyy' },
        { cname: 'xyz' }
      ]
    });
    const wrapper = customMount(state);
    await wrapper.find('input').trigger('focus');
    const yyy = wrapper.findAll('.devui-suggestion-item')[1];

    await yyy.trigger('mousedown');
    expect(state.tags.length).toBe(3);
    expect(state.tags[2].cname).toBe('yyy');
    expect(state.suggestionList.length).toBe(2);
  });

  it('tags-input arrow work', async () => {
    const state = reactive({
      tags: [
        { cname: 'a' },
        { cname: 'b' },
      ],
      suggestionList: [
        { cname: 'x' },
        { cname: 'yyy' },
        { cname: 'xyz' }
      ]
    });
    const wrapper = customMount(state);
    const input = wrapper.find('input');
    await input.trigger('focus');

    expect(wrapper.findAll('.devui-suggestion-item')[0].classes()).toContain('selected');

    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.findAll('.devui-suggestion-item')[1].classes()).toContain('selected');

    await input.trigger('keydown', { key: 'ArrowUp' });
    await input.trigger('keydown', { key: 'ArrowUp' });
    expect(wrapper.findAll('.devui-suggestion-item')[2].classes()).toContain('selected');

    await input.trigger('keydown', { key: 'Enter' });
    expect(state.tags[2].cname).toBe('xyz');
    expect(state.suggestionList.length).toBe(2);
  });
});
