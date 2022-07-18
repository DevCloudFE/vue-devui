import type { ComponentPublicInstance, ComponentInternalInstance } from 'vue';
import { ref } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { Tree } from '../..';
import { Search } from '../../../search';
import { searchFilterData } from './search-filter-data';
import { useNamespace } from '../../../shared/hooks/use-namespace';

jest.mock('../../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const ns = useNamespace('tree', true);
const searchNs = useNamespace('search', true);

describe('Tree node search filter', () => {
  it('node search event', async () => {
    const wrapper: VueWrapper<ComponentPublicInstance> = mount({
      setup() {
        const treeRef = ref<ComponentInternalInstance | null>(null);
        const onSearch = (value) => {
          treeRef.value.treeFactory.searchTree(value, { isFilter: false });
        };
        return () => {
          return (
            <div>
              <Search delay={500} is-keyup-search onSearch={onSearch} placeholder="请输入"></Search>
              <Tree data={searchFilterData} ref={treeRef} />
            </div>
          );
        };
      },
    });
    expect(wrapper.findAll(ns.e('node'))).toHaveLength(5);
    expect(wrapper.findAll(ns.e('match-highlight'))).toHaveLength(0);
    const TREE_NODE_DICT = ['parent node 1', 'parent node 2', 'parent node 3', 'parent node 4', 'parent node 5'];
    const titleList = wrapper.findAll(ns.e('node-title'));
    TREE_NODE_DICT.forEach((item, index) => {
      expect(titleList[index].text()).toBe(item);
    });

    const search = wrapper.find(searchNs.b());
    expect(search.exists()).toBeTruthy();
    const input = search.find('input');
    expect(input.exists()).toBeTruthy();
    input.setValue('node 2');
    await input.trigger('input');

    await new Promise((resolve) => {
      setTimeout(resolve, 600);
    });

    expect(wrapper.findAll(ns.e('node'))).toHaveLength(11);
    expect(wrapper.findAll(ns.e('match-highlight'))).toHaveLength(7);

    const clear = wrapper.find(searchNs.e('clear'));
    expect(clear.exists()).toBeTruthy();
    await clear.trigger('click');
    expect(wrapper.findAll(ns.e('node'))).toHaveLength(11);
    expect(wrapper.findAll(ns.e('match-highlight'))).toHaveLength(0);
    wrapper.unmount();
  });

  it('node filter event', async () => {
    const wrapper: VueWrapper<ComponentPublicInstance> = mount({
      setup() {
        const treeRef = ref<ComponentInternalInstance | null>(null);
        const onSearch = (value) => {
          treeRef.value.treeFactory.searchTree(value, { isFilter: true });
        };
        return () => {
          return (
            <div>
              <Search delay={500} is-keyup-search onSearch={onSearch} placeholder="请输入"></Search>
              <Tree data={searchFilterData} ref={treeRef} />
            </div>
          );
        };
      },
    });
    expect(wrapper.findAll(ns.e('node'))).toHaveLength(5);
    expect(wrapper.findAll(ns.e('match-highlight'))).toHaveLength(0);
    const TREE_NODE_DICT = ['parent node 1', 'parent node 2', 'parent node 3', 'parent node 4', 'parent node 5'];
    const titleList = wrapper.findAll(ns.e('node-title'));
    TREE_NODE_DICT.forEach((item, index) => {
      expect(titleList[index].text()).toBe(item);
    });

    const search = wrapper.find(searchNs.b());
    expect(search.exists()).toBeTruthy();
    const input = search.find('input');
    expect(input.exists()).toBeTruthy();
    input.setValue('node 4-2');
    await input.trigger('input');

    await new Promise((resolve) => {
      setTimeout(resolve, 600);
    });

    expect(wrapper.findAll(ns.e('node'))).toHaveLength(2);
    expect(wrapper.findAll(ns.e('match-highlight'))).toHaveLength(1);

    const clear = wrapper.find(searchNs.e('clear'));
    expect(clear.exists()).toBeTruthy();
    await clear.trigger('click');
    expect(wrapper.findAll(ns.e('node'))).toHaveLength(7);
    expect(wrapper.findAll(ns.e('match-highlight'))).toHaveLength(0);
    wrapper.unmount();
  });
});
