import type { ComponentPublicInstance } from 'vue';
import { onMounted, ref } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { Tree } from '../../';
import { checkableTreeData } from './checkable-tree-data';

describe('Checkable tree', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let wrapper2: VueWrapper<ComponentPublicInstance>;

  beforeAll(() => {
    const mountData = {
      setup() {
        const treeRef = ref<any>(null);
        const data = ref(checkableTreeData);
        onMounted(() => {
          treeRef.value.treeFactory.expandAllNodes();
        });
        const onChangeCheck = () => {
          const obj = [...data.value];
          obj[0].checked = true;
          data.value = obj;
        };
        const onChangeDisableCheck = () => {
          const obj = [...data.value];
          obj[0].disableCheck = true;
          data.value = obj;
        };
        return () => {
          return (
            <>
              <Tree data={data.value} check ref={treeRef} />
              <button class="check" onClick={onChangeCheck}>click</button>
              <button class="disable" onClick={onChangeDisableCheck}>click</button>
            </>
          );
        };
      },
    };
    wrapper = mount(mountData);
    wrapper2 = mount(mountData);
  });

  afterAll(() => {
    wrapper.unmount();
    wrapper2.unmount();
  });

  it('Should render checkbox correctly.', () => {
    const childNodeList = wrapper.findAll('.devui-checkbox');
    childNodeList.forEach((item) => {
      expect(item.exists()).toBe(true);
      expect(item.classes()).toContain('unchecked');
    });
  });

  it('Should toggle the checked state of the node correctly.', async () => {
    const childNodeList = wrapper.findAll('.devui-checkbox');
    childNodeList.forEach(async (item) => {
      expect(item.classes()).toContain('unchecked');
      await item.get('label').trigger('click');
      expect(item.classes()).toContain('active');
    });
  });

  it('The checkbox should be checked when setting checked to true.', async () => {
    expect(wrapper2.findAll('.devui-checkbox')[0].classes()).toContain('unchecked');
    await wrapper2.get('.check').trigger('click');
    expect(wrapper2.findAll('.devui-checkbox')[0].classes()).toContain('active');
  });

  it('The checkbox can\'t  be checked when setting disableCheck to true.', async () => {
    expect(wrapper2.findAll('.devui-checkbox')[0].classes()).toContain('active');
    await wrapper2.get('.disable').trigger('click');
    expect(wrapper2.findAll('.devui-checkbox')[0].classes()).toContain('active');
  });
});
