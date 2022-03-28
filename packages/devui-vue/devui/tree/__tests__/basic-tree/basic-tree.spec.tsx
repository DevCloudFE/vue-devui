import { ComponentPublicInstance, nextTick } from 'vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { Tree } from '../../';
import { basicData } from './basic-data';

describe('Basic tree should include rendering of nested nodes and responses to hover, click and expand/collapse events.', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let firstNode: Omit<DOMWrapper<Element>, 'exists'>;
  let lastNode: Omit<DOMWrapper<Element>, 'exists'>;

  beforeAll(() => {
    wrapper = mount({
      setup() {
        return () => {
          return <Tree data={basicData.value} />;
        };
      },
    });

    firstNode = wrapper.get('.devui-tree-node:first-child');
    lastNode = wrapper.get('.devui-tree-node:last-child');
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('Should render tree container correctly.', () => {
    expect(wrapper.classes()).toContain('devui-tree');
  });

  it('Should render correct number of child nodes.', () => {
    expect(wrapper.element.childElementCount).toBe(5);
  });

  it('Should render correct node content.', () => {
    expect(firstNode.text()).toBe('Parent node 1');
    expect(lastNode.text()).toBe('Leaf node 2');
  });

  it('Should render the style of child node correctly.', () => {
    const childNodeParent = wrapper.get('.devui-tree-node:nth-child(2)');
    const childNodeLeaf = wrapper.get('.devui-tree-node:nth-child(3)');

    expect(childNodeParent.attributes('style').indexOf('padding-left: 24px;') > -1).toBe(true);
    expect(childNodeLeaf.attributes('style').indexOf('padding-left: 24px;') > -1).toBe(true);
  });

  it.todo('Should render the style of node connection line correctly.');

  it.todo('The node should be highlighted when clicked.');

  it.todo('The node should be disabled and unclickable when disabled is set to true.');

  it('The node should expand and collapse correctly when the expand-collapse button is clicked.', async () => {
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

  it.todo('The node should be disabled and unclickable when disableToggle is set to true.');
});
