import { mount } from '@vue/test-utils';
import { ref, reactive } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Collapse, CollapseItem } from '../index';

const ns = useNamespace('collapse', true);

const baseClass = ns.b();
const collapseItemClass = ns.e('item');
const itemTitleClass = ns.e('item-title');
const itemOpenClass = ns.m('open');
const itemContentClass = ns.e('item-content');
const itemDisabledClass = ns.em('item', 'disabled');

describe('d-collapse', () => {
  it('collapse render work', () => {
    const value = ref(['Item1']);
    const items = ['Item1', 'Item2', 'Item3'];
    const options = reactive(items);
    const wrapper = mount({
      setup() {
        return () => (
          <Collapse v-model={value.value}>
            {options.map((item, index) => (
              <CollapseItem title={item} key={index} name={item}>
                {item}
              </CollapseItem>
            ))}
          </Collapse>
        );
      },
    });

    expect(wrapper.find(baseClass).exists()).toBeTruthy();
    const collapseItems = wrapper.findAll(collapseItemClass);
    expect(collapseItems.length).toBe(3);
    const itemTitle = collapseItems[0].find(itemTitleClass);
    expect(itemTitle.exists()).toBeTruthy();
    const itemOpen = collapseItems[0].find(itemOpenClass);
    expect(itemOpen.exists()).toBeTruthy();
    const itemContent = collapseItems[0].find(itemContentClass);
    expect(itemContent.isVisible()).toBeTruthy();

    const itemOpen1 = collapseItems[1].find(itemOpenClass);
    expect(itemOpen1.exists()).toBeFalsy();
    const itemContent1 = collapseItems[1].find(itemContentClass);
    expect(itemContent1.exists()).toBeFalsy();
    wrapper.unmount();
  });

  it('collapse change event work', async () => {
    const value = ref(['Item1']);
    const items = ['Item1', 'Item2', 'Item3'];
    const options = reactive(items);
    const wrapper = mount({
      setup() {
        return () => (
          <Collapse v-model={value.value}>
            {options.map((item, index) => (
              <CollapseItem title={item} key={index} name={item}>
                {item}
              </CollapseItem>
            ))}
          </Collapse>
        );
      },
    });

    expect(wrapper.find(baseClass).exists()).toBeTruthy();
    const collapseItems = wrapper.findAll(collapseItemClass);
    expect(collapseItems.length).toBe(3);

    const itemTitle = collapseItems[0].find(itemTitleClass);
    await itemTitle.trigger('click');
    const itemOpen = collapseItems[0].find(itemOpenClass);
    expect(itemOpen.exists()).toBeFalsy();
    const itemContent = collapseItems[0].find(itemContentClass);
    expect(itemContent.exists()).toBeFalsy();

    const itemTitle1 = collapseItems[1].find(itemTitleClass);
    await itemTitle1.trigger('click');
    const itemOpen1 = collapseItems[1].find(itemOpenClass);
    expect(itemOpen1.exists()).toBeTruthy();
    const itemContent1 = collapseItems[1].find(itemContentClass);
    expect(itemContent1.isVisible()).toBeTruthy();
    wrapper.unmount();
  });

  it('collapse accordion work', async () => {
    const value = ref('Item1');
    const items = ['Item1', 'Item2', 'Item3'];
    const options = reactive(items);
    const wrapper = mount({
      setup() {
        return () => (
          <Collapse v-model={value.value} accordion>
            {options.map((item, index) => (
              <CollapseItem title={item} key={index} name={item}>
                {item}
              </CollapseItem>
            ))}
          </Collapse>
        );
      },
    });

    expect(wrapper.find(baseClass).exists()).toBeTruthy();
    const collapseItems = wrapper.findAll(collapseItemClass);

    const itemTitle1 = collapseItems[1].find(itemTitleClass);
    await itemTitle1.trigger('click');

    const itemOpen = collapseItems[0].find(itemOpenClass);
    expect(itemOpen.exists()).toBeFalsy();
    const itemContent = collapseItems[0].find(itemContentClass);
    expect(itemContent.exists()).toBeFalsy();

    const itemOpen1 = collapseItems[1].find(itemOpenClass);
    expect(itemOpen1.exists()).toBeTruthy();
    const itemContent1 = collapseItems[1].find(itemContentClass);
    expect(itemContent1.isVisible()).toBeTruthy();
    wrapper.unmount();
  });

  it('collapse item disabled work', async () => {
    const value = ref(['Item1']);
    const wrapper = mount({
      setup() {
        return () => (
          <Collapse v-model={value.value}>
            <CollapseItem title="item 1" name="item 1">
              item 1
            </CollapseItem>
            <CollapseItem title="item 2" name="item 2" disabled>
              item 2
            </CollapseItem>
          </Collapse>
        );
      },
    });

    expect(wrapper.find(baseClass).exists()).toBeTruthy();
    const collapseItems = wrapper.findAll(collapseItemClass);

    const itemTitle1 = collapseItems[1].find(itemTitleClass);
    const itemDisabled1 = collapseItems[1].find(itemDisabledClass);
    expect(itemDisabled1.exists()).toBeTruthy();
    await itemTitle1.trigger('click');

    const itemOpen1 = collapseItems[1].find(itemOpenClass);
    expect(itemOpen1.exists()).toBeFalsy();
    const itemContent1 = collapseItems[1].find(itemContentClass);
    expect(itemContent1.exists()).toBeFalsy();
    wrapper.unmount();
  });
});
