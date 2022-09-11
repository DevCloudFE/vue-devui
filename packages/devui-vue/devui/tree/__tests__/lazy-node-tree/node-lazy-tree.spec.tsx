import type { ComponentPublicInstance, ComponentInternalInstance } from 'vue';
import { ref } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { Tree } from '../..';
import { lazyTreeData, LoadingTreeData } from './lazy-tree-data';
import { useNamespace } from '../../../shared/hooks/use-namespace';

jest.mock('../../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const ns = useNamespace('tree', true);
const loadingNs = useNamespace('loading-children', true);

describe('Tree node lazyLoad', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  beforeAll(() => {
    wrapper = mount({
      setup() {
        const treeRef = ref<ComponentInternalInstance | null>(null);
        const onLazyLoad = (node, callback) => {
          setTimeout(() => {
            callback({
              treeItems: LoadingTreeData,
              node,
            });
          }, 500);
        };
        return () => {
          return <Tree data={lazyTreeData} ref={treeRef} onLazyLoad={onLazyLoad} />;
        };
      },
    });
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('node dynamic loading', async () => {
    expect(wrapper.findAll(ns.e('node'))).toHaveLength(2);
    const TREE_NODE_DICT = ['Parent node 1', 'Leaf node 2 - dynamic loading'];
    const titleList = wrapper.findAll(ns.e('node-title'));
    TREE_NODE_DICT.forEach((item, index) => {
      expect(titleList[index].text()).toBe(item);
    });

    const nodeContents = wrapper.findAll(ns.e('node-content'));
    expect(nodeContents.length).toBe(2);
    const loadingItem = nodeContents[1];
    const icon = loadingItem.find(ns.e('node-folder'));
    await icon.trigger('click');

    const loadingContent = wrapper.findAll(ns.e('node-content'))[1].find(loadingNs.b());
    expect(loadingContent.exists()).toBeTruthy();

    await new Promise((resolve) => {
      setTimeout(resolve, 600);
    });
    expect(wrapper.findAll(ns.e('node'))).toHaveLength(6);
    const NEW_TREE_NODE_DICT = [
      'Parent node 1',
      'Leaf node 2 - dynamic loading',
      'child node 1',
      'child node 1-1',
      'child node 1-2',
      'child node 2',
    ];
    const newTitleList = wrapper.findAll(ns.e('node-title'));
    NEW_TREE_NODE_DICT.forEach((item, index) => {
      expect(newTitleList[index].text()).toBe(item);
    });
  });
});
