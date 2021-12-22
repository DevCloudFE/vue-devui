import { mount, VueWrapper } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import DAccordion from '../src/accordion'
import DAccordionMenu from '../src/accordion-menu'
import DAccordionItem from '../src/accordion-item'
import DAccordionList from '../src/accordion-list'

describe('accordion', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    const restrictOneOpen = ref(false)
    const accordionTypeEmbed = ref(false)
    const menu = ref([{
      title: 'Content 1',
      children: [
      {title: 'Child Content 1'},
      {title: 'Child Content 2'},
      {title: 'Child Content '},
      ]
  }, {
      title: 'Content 2（This is a long sentence for option display.）',
      children: [
      {title: 'Child Content 1 (This is a long sentence for option display.)'},
      {title: 'Child Content 2'},
      {title: 'Child Content 3'},
      ]
  }, {
      title: 'Content 3 (Default Open)',
      open: true,
      children: [
      {title: 'Child Content 1 (Disabled)', disabled: true},
      {title: 'Child Content 2 (Default Active)', active: true},
      {title: 'Child Content 3'},
      ]
  }, {
      title: 'Content 4 (No Child)',
      children: []
  }, {
      title: 'Content 5 (Disabled)',
      disabled: true,
      children: [
      ]
  }, {
      title: 'Content 6 (Dynamic Content)',
      needLoadChildren: true,
      loading: false,
      children: [
      ]
  }])

    wrapper = mount({
      components: { DAccordion },
      template: `
        <d-accordion 
          :data="menu" 
          :restrictOneOpen="restrictOneOpen" 
          :accordionTypeEmbed="accordionTypeEmbed"
        >
        </d-accordion>
      `,
      setup () {
        return {
          menu,
          restrictOneOpen,
          accordionTypeEmbed
        }
      }
    })
  })

  it('should render correctly', async () => {
    expect(wrapper.classes()).toContain('devui-accordion-menu-normal')
    expect(wrapper.text()).toContain('Content 6 (Dynamic Content)')
    await wrapper.setProps({
      accordionType: 'embed'
    })
    expect(wrapper.classes()).not.toContain('devui-accordion-menu-normal')
    expect(wrapper.findAll('.open')).toHaveLength(1)
    expect(wrapper.findAll('.devui-accordion-menu-item')).toHaveLength(6)
  })

  it('should expand and collapse correctly', async () => {
    expect(wrapper.classes()).toContain('devui-accordion-menu-normal')
    // 初始状态，有默认激活的节点
    expect(wrapper.findAll('.active')).toHaveLength(2)
    // expect(firstNode.classList).toContain('devui-tree-node__open')

    // 点击之后，节点收起
    await wrapper.find('.open').trigger('click')
    expect(wrapper.findAll('.open')).toHaveLength(0)

    // // 再次点击，节点展开
    await wrapper.find('.active').trigger('click')
    expect(wrapper.findAll('.open')).toHaveLength(1)
  })

  it('emits an event when clicked', async () => {
    await wrapper.find('.active').trigger('click')
    // await wrapper.get('[title="Content 3 (Default Open)"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('itemClick')
  })
})