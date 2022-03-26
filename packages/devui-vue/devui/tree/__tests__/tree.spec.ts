import { mount, VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';
import { ref, nextTick } from 'vue';
import DTree from '../src/tree';

describe('tree', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

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
    ]);

    wrapper = mount({
      components: { DTree },
      template: `
        <d-tree :data="data"></d-tree>
      `,
      setup () {
        return {
          data,
        };
      }
    });
  });

  /**
   * 测试树节点的基本渲染是否正常：
   * 1. 节点数量和内容
   * 2. 节点的嵌套层级
   * 3. 节点的展开/收起状态
   * 4. 节点的禁用状态
   * 5. 展开/收起按钮禁用状态
   * 6. 连接线样式
   */
  it('should render correctly', () => {
    expect(wrapper.classes()).toContain('devui-tree');
    expect(wrapper.element.childElementCount).toBe(6);
  });

  /**
   * 测试节点的 hover 和 click 事件是否能正常响应
   */
  it('should response to hover and click event', () => {

  });

  /**
   * 测试节点是否能正常展开/收起
   */
  it('should expand and collapse correctly', async () => {
    const firstNode = wrapper.get('.devui-tree-node:first-child');

    // 初始状态，节点是展开的
    expect(firstNode.classes()).toContain('devui-tree-node__open');

    // 点击之后，节点收起
    await wrapper.get('.devui-tree-node__folder:first-child').trigger('click');
    await nextTick();
    expect(firstNode.classes()).not.toContain('devui-tree-node__open');

    // 再次点击，节点展开
    await wrapper.get('.devui-tree-node__folder:first-child').trigger('click');
    await nextTick();
    expect(firstNode.classes()).toContain('devui-tree-node__open');
  });

  /**
   * 测试节点懒加载功能是否正常
   */
  it('should loading child nodes dynamicly when click open button', () => {

  });

  /**
   * 当节点下只有一个子节点时，应该合并这些节点
   */
  it('should merge nodes when there is only one child node', () => {

  });

  /**
   * 节点的勾选功能正常
   * 勾选复选框的禁用状态正常
   * 父子check控制功能正常
   * 自定义图标功能正常
   * 节点的增删改（操作按钮）功能正常
   * loading模板功能正常
   * 搜索过滤功能正常
   * 自定义树中显示和搜索的关键字功能正常
   * 拖拽排序功能正常
   * 虚拟滚动功能正常
   * 无动画功能正常
   */
});
