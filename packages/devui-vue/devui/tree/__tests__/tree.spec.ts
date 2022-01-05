import { mount, VueWrapper } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import DTree from '../src/tree'

describe('tree', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    const data = ref([
      {
        label: 'parent node 1 - expanded',
        open: true,
        disabled: true,
        level: 1,
        children: [
          {
            label: 'parent node 11 - folded',
            level: 2,
            children: [
              {
                label: 'leaf node 111',
                level: 3,
              },
              {
                label: 'leaf node 112',
                level: 3,
              },
              {
                label: 'leaf node 113',
                level: 3,
              },
              {
                label: 'leaf node 114',
                level: 3,
              }
            ]
          },
          {
            label: 'parent node 12 - folded',
            disableToggle: true,
            level: 2,
            children: [
              {
                label: 'leaf node 121',
                level: 3,
              },
              {
                label: 'leaf node 122',
                level: 3,
              },
              {
                label: 'leaf node 123',
                level: 3,
              },
              {
                label: 'leaf node 124',
                level: 3,
              }
            ]
          },
          {
            label: 'parent node 13 - without children - dynamic loading',
            isParent: true,
            level: 2,
          }
        ]
      },
      {
        label: 'parent node 2 - folded',
        level: 1,
        children: [
          {
            label: 'parent node 21 - expanded',
            open: true,
            level: 2,
            children: [
              {
                label: 'leaf node 211',
                level: 3,
              },
              {
                label: 'leaf node 212',
                level: 3,
              },
              {
                label: 'leaf node 213',
                level: 3,
              },
              {
                label: 'leaf node 214',
                level: 3,
              }
            ]
          },
          {
            label: 'parent node 22 - folded',
            level: 2,
            children: [
              {
                label: 'leaf node 221',
                level: 3,
              },
              {
                label: 'leaf node 222',
                level: 3,
              },
              {
                label: 'leaf node 223',
                level: 3,
              },
              {
                label: 'leaf node 224',
                level: 3,
              }
            ]
          },
          {
            label: 'parent node 23 - folded',
            level: 2,
            children: [
              {
                label: 'leaf node 231',
                level: 3,
              },
              {
                label: 'leaf node 232',
                level: 3,
              },
              {
                label: 'leaf node 233',
                level: 3,
              },
              {
                label: 'leaf node 234',
                level: 3,
              }
            ]
          }
        ]
      },
      {
        id: 'dynamicNode',
        label: 'parent node 3 - without children - dynamic loading',
        isParent: true,
        level: 1,
        data: {
          id: 'newChildNode',
          name: 'new child node'
        }
      }
    ])

    wrapper = mount({
      components: { DTree },
      template: `
        <d-tree :data="data"></d-tree>
      `,
      setup () {
        return {
          data,
        }
      }
    })
  })

  it('should render correctly', () => {
    expect(wrapper.classes()).toContain('devui-tree')
    expect(wrapper.element.childElementCount).toBe(6)
  })

  it('should expand and collapse correctly', async () => {
    const firstNode = wrapper.get('.devui-tree-node:first-child')

    // 初始状态，节点是展开的
    expect(firstNode.classes()).toContain('devui-tree-node__open')
    
    // 点击之后，节点收起
    await wrapper.get('.devui-tree-node__folder:first-child').trigger('click')
    await nextTick()
    expect(firstNode.classes()).not.toContain('devui-tree-node__open')

    // 再次点击，节点展开
    await wrapper.get('.devui-tree-node__folder:first-child').trigger('click')
    await nextTick()
    expect(firstNode.classes()).toContain('devui-tree-node__open')
  })
})
