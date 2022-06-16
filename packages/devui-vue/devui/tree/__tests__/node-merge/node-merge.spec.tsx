import type { ComponentPublicInstance } from 'vue';
import { ref, onMounted } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { Tree } from '../../';
import { nodeMergeData } from './node-merge-data';

describe('Tree node merge', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  beforeAll(() => {
    wrapper = mount({
      setup() {
        const treeRef = ref<any>(null);
        onMounted(() => {
          treeRef.value.treeFactory.mergeTreeNodes();
          treeRef.value.treeFactory.expandAllNodes();
        });
        return () => {
          return <Tree data={nodeMergeData} ref={treeRef} />;
        };
      },
    });
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('The parent nodes should be merged into one node when all parent nodes hava only one child node', async () => {
    expect(wrapper.findAll('.devui-tree__node')).toHaveLength(9);
    const TREE_NODE_DICT = [
      'Parent node 1 / Parent node 1-1 / Parent node 1-1-1',
      'Parent node 1-1-1-1',
      'Parent node 2 / Parent node 2-1',
      'Leaf node 2-1-1',
      'Leaf node 2-1-2',
      'Parent node 3',
      'Leaf node 3-1 / Leaf node 3-1-1',
      'Leaf node 3-1-1-1',
      'Leaf node 3-2',
    ];
    const titleList = wrapper.findAll('.devui-tree__node-title');
    TREE_NODE_DICT.forEach((item, index) => {
      expect(titleList[index].text()).toBe(item);
    });
  });
});
