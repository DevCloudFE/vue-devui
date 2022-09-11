import type { ComponentPublicInstance, ComponentInternalInstance } from 'vue';
import { onMounted, ref, nextTick } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { Tree, ICheck } from '../../';
import { checkableTreeData, disabledCheckableTreeData } from './checkable-tree-data';
import { useNamespace } from '../../../shared/hooks/use-namespace';

type ITreeFactory = { expandAllNodes: () => void };
const ns = useNamespace('tree', true);
const checkBoxNs = useNamespace('checkbox', true);

describe('Checkable tree', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;
  let wrapper2: VueWrapper<ComponentPublicInstance>;

  beforeAll(() => {
    const mountData = {
      setup() {
        const treeRef = ref<(ComponentInternalInstance & { treeFactory: ITreeFactory }) | null>(null);
        const check = ref<ICheck>('none');
        const data = ref(checkableTreeData);
        onMounted(() => {
          treeRef.value?.treeFactory.expandAllNodes();
        });
        const onChangeCheck = () => {
          const obj = [...data.value];
          obj[0].checked = true;
          data.value = obj;
        };
        const onChangeCheckMode = (mode: ICheck) => {
          check.value = mode;
        };
        const onChangeDisableCheck = () => {
          const obj = [...data.value];
          obj[0].disableCheck = true;
          data.value = obj;
        };
        return () => {
          return (
            <>
              <Tree data={data.value} check={check.value} ref={treeRef} />
              <button class="check" onClick={onChangeCheck}>
                click
              </button>
              <button class="both" onClick={() => onChangeCheckMode('both')}>
                both
              </button>
              <button class="downward" onClick={() => onChangeCheckMode('downward')}>
                downward
              </button>
              <button class="upward" onClick={() => onChangeCheckMode('upward')}>
                upward
              </button>
              <button class="disable" onClick={onChangeDisableCheck}>
                click
              </button>
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
    const childNodeList = wrapper.findAll(checkBoxNs.b());
    childNodeList.forEach((item) => {
      expect(item.exists()).toBe(true);
      expect(item.classes()).toContain('unchecked');
    });
  });

  it('In the none mode, the selected state of the node should be switched correctly.', async () => {
    const childNodeList = wrapper.findAll(checkBoxNs.b());
    for await (const item of childNodeList) {
      expect(item.classes()).toContain('unchecked');
      await item.get('label').trigger('click');
      expect(item.classes()).toContain('active');
      await item.get('label').trigger('click');
      expect(item.classes()).toContain('unchecked');
    }
  });

  it('In the upward mode, the selected state of the node should be switched correctly.', async () => {
    await wrapper.get('.upward').trigger('click');
    const childNodeList = wrapper.findAll(checkBoxNs.b());
    await childNodeList[4].get('label').trigger('click');
    expect(childNodeList[4].classes()).toContain('active');
    expect(childNodeList[0].classes()).toContain('half-checked');
    await childNodeList[3].get('label').trigger('click');
    expect(childNodeList[0].classes()).toContain('half-checked');
    expect(childNodeList[1].classes()).toContain('half-checked');
    await childNodeList[2].get('label').trigger('click');
    expect(childNodeList[0].classes()).toContain('active');
    expect(childNodeList[1].classes()).toContain('active');
    expect(childNodeList[0].classes()).not.toContain('half-checked');
    expect(childNodeList[1].classes()).not.toContain('half-checked');
    await childNodeList[4].get('label').trigger('click');
    await childNodeList[3].get('label').trigger('click');
    await childNodeList[2].get('label').trigger('click');
    for (const item of childNodeList.slice(0, 4)) {
      expect(item.classes()).toContain('unchecked');
    }
  });

  it('In the downward mode, the selected state of the node should be switched correctly.', async () => {
    await wrapper.get('.downward').trigger('click');
    const childNodeList = wrapper.findAll(checkBoxNs.b());
    expect(childNodeList[0].classes()).toContain('unchecked');
    await childNodeList[0].get('label').trigger('click');
    for (const item of childNodeList.slice(0, 5)) {
      expect(item.classes()).toContain('active');
    }
    await childNodeList[0].get('label').trigger('click');
    for (const item of childNodeList.slice(0, 5).reverse()) {
      expect(item.classes()).toContain('unchecked');
    }
    await childNodeList[0].get('label').trigger('click');
    await childNodeList[4].get('label').trigger('click');
    expect(childNodeList[4].classes()).toContain('unchecked');
    for await (const item of childNodeList.slice(0, 4).reverse()) {
      expect(item.classes()).toContain('active');
      await item.get('label').trigger('click');
      expect(item.classes()).toContain('unchecked');
    }
  });
  it('In the both mode, the selected state of the node should be switched correctly.', async () => {
    await wrapper.get('.both').trigger('click');
    const childNodeList = wrapper.findAll(checkBoxNs.b());
    await childNodeList[1].get('label').trigger('click');
    expect(childNodeList[0].classes()).toContain('half-checked');
    expect(childNodeList[1].classes()).toContain('active');
    expect(childNodeList[2].classes()).toContain('active');
    expect(childNodeList[3].classes()).toContain('active');
    await childNodeList[1].get('label').trigger('click');
    expect(childNodeList[0].classes()).toContain('unchecked');
    expect(childNodeList[1].classes()).toContain('unchecked');
    expect(childNodeList[2].classes()).toContain('unchecked');
    expect(childNodeList[3].classes()).toContain('unchecked');
  });

  it('The checkbox should be checked when setting checked to true.', async () => {
    expect(wrapper2.findAll(checkBoxNs.b())[0].classes()).toContain('unchecked');
    await wrapper2.get('.check').trigger('click');
    expect(wrapper2.findAll(checkBoxNs.b())[0].classes()).toContain('active');
  });

  it("The checkbox can't  be checked when setting disableCheck to true.", async () => {
    expect(wrapper2.findAll(checkBoxNs.b())[0].classes()).toContain('active');
    await wrapper2.get('.disable').trigger('click');
    expect(wrapper2.findAll(checkBoxNs.b())[0].classes()).toContain('active');
  });

  it("When the parent node is checked, the child node in disabled status should not be checked", async () => {
    const curWrapper = mount({
      setup() {
        const data = ref(disabledCheckableTreeData);
        return () => {
          return (
            <>
              <Tree data={data.value} check />
            </>
          );
        };
      }
    });
    await nextTick();
    const nodes = curWrapper.findAll(ns.e('node'));
    const checkbox = checkBoxNs.b();
    expect(nodes).toHaveLength(4);
    expect(nodes[0].find(checkbox).classes()).toContain('unchecked');
    expect(nodes[1].find(checkbox).classes()).toContain('unchecked');
    expect(nodes[2].find(checkbox).classes()).toContain('unchecked');
    await nodes[0].get('label').trigger('click');
    expect(nodes[0].find(checkbox).classes()).toContain('active');
    expect(nodes[1].find(checkbox).classes()).toContain('unchecked');
    expect(nodes[2].find(checkbox).classes()).toContain('unchecked');
    curWrapper.unmount();
  });
});
