import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import DSkeleton from '../src/skeleton';

describe('skeleton 组件', () => {
  it('render basic skeleton successfully', () => {
    const row = ref(4);
    const wrapper = mount({
      components: { DSkeleton },
      template: `<d-skeleton :row="row" />`,
      setup() {
        return {
          row
        };
      },
    });

    expect(wrapper.classes()).toContain('devui-skeleton')
    expect(wrapper.classes()).toContain('devui-skeleton-animated')
    expect(wrapper.element.childElementCount).toBe(1)
    // 渲染个数应当与传入的 row 的数量相同
    expect(wrapper.element.children[0].childElementCount).toBe(4)
  })

  it('render skeleton without animate', () => {
    const animate = ref(false);
    const wrapper = mount({
      components: { DSkeleton },
      template: `<d-skeleton :animate="animate" />`,
      setup() {
        return {
          animate
        };
      },
    });

    expect(wrapper.classes()).toContain('devui-skeleton-no-animated')
  })

  it('render skeleton with avatar', () => {
    const avatar = ref(true);
    const wrapper = mount({
      components: { DSkeleton },
      template: `<d-skeleton :avatar="avatar" />`,
      setup() {
        return {
          avatar
        };
      },
    });

    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.element.children[0].innerHTML).toBe('<div class="avatar"></div>')
  })

  it('hide skeleton and show real content', () => {
    const row = ref(4);
    const loading = ref(false);
    const wrapper = mount({
      components: { DSkeleton },
      template: `
      <d-skeleton :row="4" :loading="loading">
        <div>
          <div>content1</div>
          <div>content2</div>
          <div>content3</div>
          <div>content4</div>
        </div>
      </d-skeleton>`,
      setup() {
        return {
          row,
          loading
        };
      },
    });

    expect(wrapper.classes()).toContain('devui-skeleton')
    expect(wrapper.element.children[0].innerHTML).toBe('<div>content1</div><div>content2</div><div>content3</div><div>content4</div>')
  })
})