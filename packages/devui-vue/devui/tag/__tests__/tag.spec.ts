import { mount } from '@vue/test-utils';
import { Tag } from '../index';
import { ref } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('tag', true);
const baseClass = ns.b();
const itemClass = ns.e('item');

const nsNoDot = useNamespace('tag', false);
const primaryClass = nsNoDot.m('primary');
const lgClass = nsNoDot.m('lg');

describe('tag test', () => {
  it('init render', async () => {
    const wrapper = mount(Tag);
    expect(wrapper.find(baseClass).exists()).toBeTruthy();
  });
  it('props type', () => {
    const wrapper = mount(Tag, {
      propsData: {
        type: 'primary',
      },
    });
    const itemTag = wrapper.find(itemClass);
    expect(itemTag.classes()).toContain(primaryClass);
  });
  it('props color', () => {
    const wrapper = mount(Tag, {
      propsData: {
        color: 'red-w98', // #f66f6a rgb(246, 111, 106)
      },
    });
    expect(wrapper.find(itemClass).attributes('style')).toContain('rgb(246, 111, 106)');
  });
  it('props color custom', () => {
    const wrapper = mount(Tag, {
      propsData: {
        color: '#aa2116', // rgb(170, 33, 22)
      },
    });
    expect(wrapper.find(itemClass).attributes('style')).toContain('rgb(170, 33, 22)');
  });
  it('props titleContent', () => {
    const titleContent = 'tagTitle test';
    const wrapper = mount(Tag, {
      props: { titleContent },
    });
    expect(wrapper.get(itemClass).attributes('title')).toBe(titleContent);
  });
  it('props deletable show', async () => {
    const wrapper = mount(Tag, {
      propsData: {
        deletable: false,
      },
    });
    expect(wrapper.find('.remove-button').exists()).toBeFalsy();
    await wrapper.setProps({ deletable: true });
    expect(wrapper.find('.remove-button').exists()).toBeTruthy();
  });
  it('props deletable hide and event tagDelete', async () => {
    const wrapper = mount({
      components: { Tag },
      template: `
        <tag v-if="showTag" deletable @tagDelete="tagDelete">标签</tag>
      `,
      setup() {
        const showTag = ref(true);
        const tagDelete = () => {
          showTag.value = false;
        };
        return {
          showTag,
          tagDelete,
        };
      },
    });
    const btn = wrapper.find('.remove-button');
    expect(btn.exists()).toBeTruthy();
    await btn.trigger('click');
    expect(wrapper.find('.devui-tag').exists()).toBeFalsy();
  });

  it('props checked', async () => {
    const wrapper = mount(Tag, {
      propsData: {
        color: 'red-w98', // 对应颜色：rgb(246, 111, 106)
      },
    });
    expect(wrapper.find(itemClass).attributes('style')).toContain('color: rgb(246, 111, 106);');
    await wrapper.setProps({ checked: true });
    expect(wrapper.find(itemClass).attributes('style')).toContain('background-color: rgb(246, 111, 106);');
    expect(wrapper.emitted('checkedChange').length).toBeGreaterThan(0);
  });
  it('event checkedChange', async () => {
    const wrapper = mount(Tag);
    await wrapper.setProps({ checked: true });
    expect(wrapper.emitted('checkedChange').length).toBeGreaterThan(0);
    expect(wrapper.emitted('checkedChange')[0]).toEqual([true]);
    await wrapper.setProps({ checked: false });
    expect(wrapper.emitted('checkedChange').length).toBeGreaterThan(1);
    expect(wrapper.emitted('checkedChange')[1]).toEqual([false]);
  });

  it('event click', async () => {
    const wrapper = mount(Tag);
    await wrapper.find('.devui-tag').trigger('click');
    expect(wrapper.emitted('click').length).toBeGreaterThan(0);
  });
  it('slot default string', async () => {
    const wrapper = mount(Tag, {
      slots: {
        default: 'default slot test',
      },
    });
    expect(wrapper.text()).toContain('default slot test');
  });
  it('slot default component', async () => {
    const wrapper = mount(Tag, {
      slots: {
        default: ['<d-icon name="like"></d-icon>', 'icon component test'],
      },
    });
    expect(wrapper.find('i').classes()).toContain('icon-like');
  });

  it('Tag size work', () => {
    const wrapper = mount(Tag, {
      propsData: {
        size: 'lg',
      },
    });
    const itemTag = wrapper.find(itemClass);
    expect(itemTag.classes()).toContain(lgClass);
  });
});
