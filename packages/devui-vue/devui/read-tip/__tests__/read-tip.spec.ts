import { mount } from '@vue/test-utils';
import { ReadTip, } from '../index';
import { nextTick } from 'vue';
import Template from '../src/read-tip-template';

describe('read-tip test', () => {
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.className = 'readtip-target';
    document.body.appendChild(el);
  });

  afterEach(() => {
    // clean up
    document.body.outerHTML = '';
  });
  it('read-tip init render', async () => {
    // 基础用法
    const readTipOptions = {
      trigger: 'hover',
      rules: {
        trigger: 'click',
        position: 'top',
        appendToBody: false,
        selector: '.readtip-target',
        title: 'Name: Jack',
        content: 'This is Jack\'s profile',
      },
    };
    const wrapper = mount(ReadTip, {
      props: {
        readTipOptions
      },
      slots: {
        default: `<span class="readtip-target">@Jack</span>`
      }
    });

    expect(wrapper.find('.readtip-target').classes()).toContain('readtip-target');

    // dom元素被点击 template会进行展示
    await wrapper.find('.readtip-target').trigger('click');
    await nextTick();

    let template = wrapper.findComponent(Template);

    expect(template.exists()).toBe(true);
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1);

    // body元素被点击 template会消失
    await document.body.click();
    await nextTick();

    template = wrapper.findComponent(Template);
    expect(template.exists()).toBe(false);
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1);
  });

  it('read-tip more show tip', async () => {
    // 基础用法
    const readTipOptions = {
      trigger: 'hover',
      rules: {
        trigger: 'hover',
        selector: '.readtip-target',
        title: 'Name: Jack',
        content: 'This is Jack\'s profile',
      },
    };
    const wrapper = mount(ReadTip, {
      props: {
        readTipOptions
      },
      slots: {
        default: `
        <span class="readtip-target">@Jack</span>
        <span class="readtip-target">@Mary</span>
        `
      }
    });


    // dom元素被移入 template会进行展示
    await wrapper.find('.readtip-target').trigger('mouseover');

    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2);

    // dom元素被移出 template会消失
    await wrapper.find('.readtip-target').trigger('mouseout');
    await nextTick();

    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2);

  });
});
