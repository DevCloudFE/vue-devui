import { ComponentPublicInstance } from 'vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { Tree } from '../../';
import { checkableTreeData } from './checkable-tree-data';

describe('Checkable tree', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let childNodes: DOMWrapper<Element>[];

  beforeAll(() => {
    wrapper = mount({
      setup() {
        return () => {
          return <Tree data={checkableTreeData} checkable />;
        };
      },
    });

    childNodes = wrapper.findAll('.devui-tree-node');
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it.todo('Should render checkbox correctly.');

  it.todo('Should toggle the checked state of the node correctly.');

  it.todo('The checkbox should be checked when setting checked to true.');

  it.todo('The checkbox can\'t  be checked when setting disableCheck to true.');
});