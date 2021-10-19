import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import DSkeleton from '../src/skeleton';

describe('skeleton 组件', () => {
  it('render basic skeleton', () => {
    const row = ref(4)
    const wrapper = mount({
      components: { DSkeleton },
      template: `<d-skeleton :row="row" />`,
      setup() {
        return {
          row
        }
      },
    })

    expect(wrapper.classes()).toContain('devui-skeleton')
    expect(wrapper.classes()).toContain('devui-skeleton-animated')
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.element.children[1].children[1].childElementCount).toBe(4)
  })

  it('render skeleton without animate', () => {
    const animate = ref(false)
    const wrapper = mount({
      components: { DSkeleton },
      template: `<d-skeleton :animate="animate" />`,
      setup() {
        return {
          animate
        }
      },
    })

    expect(wrapper.classes()).toEqual(['devui-skeleton'])
  })

  it('render skeleton without title and paragraph', () => {
    const title = ref(false)
    const paragraph = ref(false)
    const wrapper = mount({
      components: { DSkeleton },
      template: `<d-skeleton :title="title" :paragraph="paragraph" />`,
      setup() {
        return {
          title,
          paragraph
        }
      },
    })
    
    expect(wrapper.element.children[1].childElementCount).toBe(2)
  })

  it('hide skeleton and show real content', () => {
    const row = ref(4)
    const loading = ref(false)
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
        }
      },
    })

    expect(wrapper.classes()).toContain('devui-skeleton')
    expect(wrapper.element.children[0].innerHTML).toBe('<div>content1</div><div>content2</div><div>content3</div><div>content4</div>')
  })
})