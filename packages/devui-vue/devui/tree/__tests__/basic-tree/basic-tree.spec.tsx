import { ComponentPublicInstance } from 'vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { Tree } from '../../';
import { basicTreeData } from './basic-tree-data';

describe('Basic tree', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let childNodes: DOMWrapper<Element>[];

  beforeAll(() => {
    wrapper = mount({
      setup() {
        return () => {
          return <Tree data={basicTreeData} />;
        };
      },
    });

    childNodes = wrapper.findAll('.devui-tree-node');
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('Should render tree container correctly.', () => {
    expect(wrapper.find('.devui-tree').exists()).toBe(true);
  });

  it('Should render correct number of child nodes.', () => {
    expect(childNodes).toHaveLength(5);
  });

  it('Should render correct node content.', () => {
    expect(childNodes[0].text()).toBe('Parent node 1');
    expect(childNodes[childNodes.length - 1].text()).toBe('Leaf node 2');
  });

  it('Should render expand-collapse button correctly.', () => {
    expect(childNodes[0].find('.devui-tree-node__folder > svg').exists()).toBe(true);
    expect(childNodes[0].find('.devui-tree-node__folder > svg').classes()).toContain('svg-icon');
    expect(childNodes[0].find('.devui-tree-node__folder > svg').classes()).toContain('svg-icon-close');

    expect(childNodes[1].find('.devui-tree-node__folder > svg').exists()).toBe(true);
    expect(childNodes[1].find('.devui-tree-node__folder > svg').classes()).toContain('svg-icon');
    expect(childNodes[1].find('.devui-tree-node__folder > svg').classes()).not.toContain('svg-icon-close');
  });

  it('Should render the style of child node correctly.', () => {
    expect(childNodes[0].attributes('style')).toContain('padding-left: 0px');
    expect(childNodes[0].find('.devui-tree-node__folder > .devui-tree-node__indent').exists()).toBe(false);

    expect(childNodes[1].attributes('style')).toContain('padding-left: 24px');
    expect(childNodes[1].find('.devui-tree-node__folder > .devui-tree-node__indent').exists()).toBe(false);

    expect(childNodes[2].attributes('style')).toContain('padding-left: 24px');
    expect(childNodes[2].find('.devui-tree-node__folder > .devui-tree-node__indent').exists()).toBe(true);

    expect(childNodes[childNodes.length - 1].attributes('style')).toContain('padding-left: 0px');
    expect(childNodes[childNodes.length - 1].find('.devui-tree-node__folder > .devui-tree-node__indent').exists()).toBe(true);
  });

  it('The node should be highlighted when clicked.', async () => {
    // 可点击且非高亮的的节点，点击之后应该高亮
    expect(childNodes[1].find('.devui-tree-node__content').classes()).not.toContain('active');
    await childNodes[1].find('.devui-tree-node__content').trigger('click');
    expect(childNodes[1].find('.devui-tree-node__content').classes()).toContain('active');

    // 点击非高亮节点，该节点高亮，已高亮节点应该取消高亮
    expect(childNodes[2].find('.devui-tree-node__content').classes()).not.toContain('active');
    await childNodes[2].find('.devui-tree-node__content').trigger('click');
    expect(childNodes[2].find('.devui-tree-node__content').classes()).toContain('active');
    expect(childNodes[1].find('.devui-tree-node__content').classes()).not.toContain('active');
  });

  it('The node should be disabled and unclickable when disabled is set to true.', async () => {
    // 设置了 disabled: true 的节点为禁用态，不可点击
    expect(childNodes[0].find('.devui-tree-node__title').classes()).toContain('select-disabled');
    expect(childNodes[0].find('.devui-tree-node__content').classes()).not.toContain('active');
    await childNodes[0].trigger('click');
    expect(childNodes[0].find('.devui-tree-node__content').classes()).not.toContain('active');
  });

  it('The node should expand and collapse correctly when the expand-collapse button is clicked.', async () => {
    // 初始状态，节点是展开的
    expect(childNodes[0].classes()).toContain('devui-tree-node__open');

    // 点击之后，节点收起
    await childNodes[0].get('.devui-tree-node__folder').trigger('click');
    expect(childNodes[0].classes()).not.toContain('devui-tree-node__open');

    // 再次点击，节点展开
    await childNodes[0].get('.devui-tree-node__folder').trigger('click');
    expect(childNodes[0].classes()).toContain('devui-tree-node__open');
  });

  it.todo('Should render the style of node connection line correctly.');

  it.todo('The node should be disabled and unclickable when disableToggle is set to true.');
});
