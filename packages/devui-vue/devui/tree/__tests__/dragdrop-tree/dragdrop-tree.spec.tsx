import { ref, nextTick } from 'vue';
import type { DOMWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { Tree, TreeProps } from '../..';
import { dragdropTreeData } from './dragdrop-tree-data';
import { useNamespace } from '../../../shared/hooks/use-namespace';

const ns = useNamespace('tree', true);

const startDragging = async (dragNode: DOMWrapper<Element>, dropNode: DOMWrapper<Element>, offset: number) => {
  // Map as storage place
  const testStorage = new Map();
  // Mock of the drop Event
  const dataTransfer = {
    setData: (key: string, value: unknown) => testStorage.set(key, value),
    getData: (key: string) => testStorage.get(key)
  };
  await dragNode.trigger('dragstart', {
    stopPropagation: jest.fn(),
    dataTransfer,
  });
  await dropNode.trigger('dragover', {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    dataTransfer,
    clientY: offset,
  });
  await dropNode.trigger('dragleave', {
    stopPropagation: jest.fn(),
    currentTarget: dropNode.element,
  });
  await dropNode.trigger('drop', {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    currentTarget: dropNode.element,
    dataTransfer,
  });
  await nextTick();
};

const getDraggableTree = (dragdrop: TreeProps['dragdrop'] = true) => {
  return mount({
    setup() {
      return () => {
        const data = ref(dragdropTreeData);
        return (
          <>
            <Tree data={data.value} dragdrop={dragdrop} />
          </>
        );
      };
    }
  });
};

describe('Draggable tree', () => {

  it('Basic default node drag.', async () => {
    const wrapper = getDraggableTree();

    await nextTick();
    let childNodeList = wrapper.findAll(ns.e('node-content'));
    expect(childNodeList).toHaveLength(15);
    expect(childNodeList[0].text()).toBe('parent node 1');
    expect(childNodeList[1].text()).toBe('parent node 2');
    expect(childNodeList[2].text()).toBe('leaf node 2-1');
    expect(childNodeList[3].text()).toBe('leaf node 2-1-1');
    const dragNode = childNodeList[12];
    const dropNode = childNodeList[0];
    await startDragging(dragNode, dropNode, 10);
    childNodeList = wrapper.findAll(ns.e('node-content'));
    expect(childNodeList[0].text()).toBe('parent node 1');
    expect(childNodeList[1].text()).toBe('parent node 5');
    expect(childNodeList[2].text()).toBe('leaf node 5-1');
    expect(childNodeList[3].text()).toBe('leaf node 5-2');
    expect(childNodeList[4].text()).toBe('parent node 2');
  });

  it('Basic sortable node drag.', async () => {
    // test dropPrev
    let wrapper = getDraggableTree({ dropPrev: true, dropNext: true, dropInner: true });
    await nextTick();
    let childNodeList = wrapper.findAll(ns.e('node-content'));
    const dragNode = childNodeList[14];
    const dropNode = childNodeList[0];
    await startDragging(dragNode, dropNode, -1);
    childNodeList = wrapper.findAll(ns.e('node-content'));
    expect(childNodeList[0].text()).toBe('leaf node 5-2');
    wrapper.unmount();

    // test dropInner
    wrapper = getDraggableTree({ dropPrev: true, dropNext: true, dropInner: true });
    await nextTick();
    let childNodeList1 = wrapper.findAll(ns.e('node-content'));
    const dragNode1 = childNodeList1[14];
    const dropNode1 = childNodeList1[0];
    await startDragging(dragNode1, dropNode1, 3);
    childNodeList1 = wrapper.findAll(ns.e('node-content'));
    expect(childNodeList1[1].text()).toBe('leaf node 5-2');
  });

  it.todo('Is the tree drag event available');

});
