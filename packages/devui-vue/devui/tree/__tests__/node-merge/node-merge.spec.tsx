import { ComponentPublicInstance } from 'vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { Tree } from '../../';
import { nodeMergeData } from './node-merge-data';

describe('Tree node merge', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let childNodes: DOMWrapper<Element>[];

  beforeAll(() => {
    wrapper = mount({
      setup() {
        return () => {
          return <Tree data={nodeMergeData} />;
        };
      },
    });

    childNodes = wrapper.findAll('.devui-tree-node');
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('The parent nodes should be merged into one node when all parent nodes hava only one child node', () => {
    expect(childNodes).toHaveLength(2);
    expect(childNodes[0].text()).toBe('Parent node 1 / Parent node 1-1');
    expect(childNodes[1].text()).toBe('Leaf node 1-1-1');
  });
});
