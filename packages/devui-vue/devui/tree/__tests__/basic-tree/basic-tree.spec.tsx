import type { ComponentPublicInstance, ComponentInternalInstance } from 'vue';
import { ref, onMounted } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { Tree } from '../../';
import { basicTreeData } from './basic-tree-data';
import { useNamespace } from '../../../shared/hooks/use-namespace';

jest.mock('../../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const ns = useNamespace('tree', true);
const noDotNs = useNamespace('tree');
type ITreeFactory = { expandAllNodes: () => void };

describe('Basic tree', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  beforeAll(() => {
    wrapper = mount({
      setup() {
        const treeRef = ref<(ComponentInternalInstance & { treeFactory: ITreeFactory }) | null>(null);
        const data = ref(basicTreeData);
        onMounted(() => {
          treeRef.value?.treeFactory.expandAllNodes();
        });
        const onDisable = () => {
          const obj = [...data.value];
          obj[0].disableToggle = true;
          data.value = obj;
        };
        return () => {
          return (
            <>
              <Tree data={data.value} ref={treeRef} />
              <button onClick={onDisable}>click</button>
            </>
          );
        };
      },
    });
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('Should render tree container correctly.', () => {
    expect(wrapper.find(ns.b()).exists()).toBe(true);
  });

  it('Should render correct number of child nodes.', () => {
    expect(wrapper.findAll(ns.e('node'))).toHaveLength(5);
  });

  it('Should render correct node content.', () => {
    const TREE_NODE_DICT = ['Parent node 1', 'Parent node 1-1', 'Leaf node 1-1-1', 'Leaf node 1-2', 'Leaf node 2'];
    const titleList = wrapper.findAll(ns.e('node-title'));
    TREE_NODE_DICT.forEach((item, index) => {
      expect(titleList[index].text()).toBe(item);
    });
  });

  it('Should render expand-collapse button correctly.', () => {
    const nodes = wrapper.findAll(ns.e('node'));
    nodes.slice(0, 2).forEach((item) => {
      const curNode = item.find(`${ns.e('node-folder')} > svg`);
      expect(curNode.exists()).toBe(true);
      expect(curNode.classes()).toContain('svg-icon-close');
    });
  });

  it('Should render the style of child node correctly.', () => {
    const nodes = wrapper.findAll(ns.e('node'));
    expect(nodes[0].attributes('style')).toContain('padding-left: 0px');
    expect(nodes[0].find(`${ns.e('node-folder')} > ${ns.e('node-indent')}`).exists()).toBe(false);

    expect(nodes[1].attributes('style')).toContain('padding-left: 24px');
    expect(nodes[1].find(`${ns.e('node-folder')} > ${ns.e('node-indent')}`).exists()).toBe(false);

    expect(nodes[2].attributes('style')).toContain('padding-left: 48px');
    expect(nodes[2].find(`${ns.e('node-folder')} > ${ns.e('node-indent')}`).exists()).toBe(true);

    expect(nodes[nodes.length - 1].attributes('style')).toContain('padding-left: 0px');
    expect(nodes[nodes.length - 1].find(`${ns.e('node-folder')} > ${ns.e('node-indent')}`).exists()).toBe(true);
  });

  it('The node should be highlighted when clicked.', async () => {
    const nodes = wrapper.findAll(ns.e('node'));
    // 可点击且非高亮的的节点，点击之后应该高亮
    expect(nodes[1].find(ns.e('node-content')).classes()).not.toContain('active');
    await nodes[1].find(ns.e('node-content')).trigger('click');
    expect(nodes[1].find(ns.e('node-content')).classes()).toContain('active');

    // 点击非高亮节点，该节点高亮，已高亮节点应该取消高亮
    expect(nodes[2].find(ns.e('node-content')).classes()).not.toContain('active');
    await nodes[2].find(ns.e('node-content')).trigger('click');
    expect(nodes[2].find(ns.e('node-content')).classes()).toContain('active');
    expect(nodes[1].find(ns.e('node-content')).classes()).not.toContain('active');
  });

  it('The node should be disabled and unclickable when disabled is set to true.', async () => {
    const nodes = wrapper.findAll(ns.e('node'));
    // 设置了 disabled: true 的节点为禁用态，不可点击
    expect(nodes[0].find(ns.e('node-title')).classes()).toContain('select-disabled');
    expect(nodes[0].find(ns.e('node-content')).classes()).not.toContain('active');
    await nodes[0].trigger('click');
    expect(nodes[0].find(ns.e('node-content')).classes()).not.toContain('active');
  });

  it('The node should expand and collapse correctly when the expand-collapse button is clicked.', async () => {
    const nodes = wrapper.findAll(ns.e('node'));
    // 初始状态，节点是展开的
    expect(nodes[0].classes()).toContain(noDotNs.em('node', 'open'));

    // 点击之后，节点收起
    await nodes[0].get(ns.e('node-folder')).trigger('click');
    expect(wrapper.findAll(ns.e('node'))[0].classes()).not.toContain(noDotNs.em('node', 'open'));

    // // 再次点击，节点展开
    await nodes[0].get(ns.e('node-folder')).trigger('click');
    expect(wrapper.findAll(ns.e('node'))[0].classes()).toContain(noDotNs.em('node', 'open'));
  });

  it('Should render the style of node connection line correctly.', () => {
    const nodes = wrapper.findAll(ns.e('node'));

    expect(nodes).toHaveLength(5);

    expect(nodes[0].find(`${ns.e('node-folder')} > svg`).exists()).toBe(true);
    expect(nodes[0].find(ns.e('node-vline')).exists()).not.toBe(true);
    expect(nodes[0].find(ns.e('node-hline')).exists()).not.toBe(true);

    expect(nodes[1].find(`${ns.e('node-folder')} > svg`).exists()).toBe(true);
    expect(nodes[1].find(ns.e('node-vline')).exists()).toBe(true);
    expect(nodes[1].find(ns.e('node-hline')).exists()).toBe(true);

    expect(nodes[2].find(`${ns.e('node-folder')} > svg`).exists()).not.toBe(true);
    const vline2 = nodes[2].findAll(ns.e('node-vline'));
    expect(vline2).toHaveLength(2);
    expect(vline2[1].attributes().style).toBe('height: 30px; left: 9px; top: 0px;');
    expect(vline2[0].attributes().style).toBe('height: 15px; left: 33px; top: 0px;');
    expect(nodes[2].find(ns.e('node-hline')).exists()).toBe(true);

    expect(nodes[3].find(`${ns.e('node-folder')} > svg`).exists()).not.toBe(true);
    const vline3 = nodes[3].findAll(ns.e('node-vline'));
    expect(vline3).toHaveLength(1);
    expect(vline3[0].attributes().style).toBe('height: 15px; left: 9px; top: 0px;');
    expect(nodes[3].find(ns.e('node-hline')).exists()).toBe(true);

    expect(nodes[4].find(`${ns.e('node-folder')} > svg`).exists()).not.toBe(true);
    expect(nodes[4].find(ns.e('node-vline')).exists()).not.toBe(true);
    expect(nodes[4].find(ns.e('node-hline')).exists()).not.toBe(true);
  });

  it('The node should be disabled and unclickable when disableToggle is set to true.', async () => {
    await wrapper.get('button').trigger('click');
    expect(wrapper.find('.toggle-disabled').exists()).toBe(true);
  });
});
