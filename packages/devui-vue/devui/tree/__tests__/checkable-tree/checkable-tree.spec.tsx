import type { ComponentPublicInstance } from 'vue';
import { onMounted, ref } from 'vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { Tree } from '../../';
import { checkableTreeData } from './checkable-tree-data';

describe('Checkable tree', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  beforeAll(() => {
    wrapper = mount({
      setup() {
        const treeRef = ref<any>(null);
        onMounted(() => {
          treeRef.value.treeFactory.expandAllNodes();
        });
        return () => {
          return <Tree data={checkableTreeData} checkable ref={treeRef} />;
        };
      },
    });
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('Should render checkbox correctly.', () => {
    const childNodeList = wrapper.findAll('.devui-checkbox > label');
    childNodeList.forEach((item) => {
      expect(item.exists()).toBe(true);
      expect(item.classes()).toContain('unchecked');
    });
  });

  it('Should toggle the checked state of the node correctly.', async () => {
    const childNodeList = wrapper.findAll('.devui-checkbox > label');
    childNodeList.forEach(async (item) => {
      expect(item.classes()).toContain('unchecked');
      await item.trigger('click');
      expect(item.classes()).toContain('active');
    });
  });

  it.todo('The checkbox should be checked when setting checked to true.');

  it.todo('The checkbox can\'t  be checked when setting disableCheck to true.');
});
