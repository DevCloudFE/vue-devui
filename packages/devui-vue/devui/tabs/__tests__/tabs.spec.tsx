import { mount, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance, ref } from 'vue';
import { Tabs, Tab } from '..';
import { useNamespace } from '../../shared/hooks/use-namespace';

const dotTabNs = useNamespace('tab', true);
const dotTabsNs = useNamespace('tabs', true);

const dotTabs = dotTabsNs.b();
const dotTabsNav = dotTabsNs.e('nav');
const dotTabContent = dotTabNs.e('content');
const dotTabsNewTab = dotTabsNs.e('new-tab');

describe('Tabs', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  it('Basic tabs should render correctly.', () => {
    wrapper = mount({
      setup() {
        const id = ref('tab1');

        return () => {
          return (
            <Tabs v-model={id.value}>
              <Tab id="tab1" title="Tab1">
                Tab1 Content
              </Tab>
              <Tab id="tab2" title="Tab2">
                Tab2 Content
              </Tab>
              <Tab id="tab3" title="Tab3">
                Tab3 Content
              </Tab>
            </Tabs>
          );
        };
      },
    });

    expect(wrapper.find(dotTabs).exists()).toBe(true);
    expect(wrapper.find(dotTabsNav).exists()).toBe(true);
    expect(wrapper.find(dotTabContent).exists()).toBe(true);
  });

  it('addable & closeable work', async () => {
    const tabAdd = jest.fn();
    wrapper = mount({
      components: {
        'd-tabs': Tabs,
        'd-tab': Tab,
      },
      template: `
        <d-tabs v-model="editableId" closeable addable @tabAdd="tabAdd" @tabRemove="tabRemove">
          <d-tab v-for="tab in tabs" :key="tab.id" :id="tab.id" :title="tab.title">
            <p>{{ tab.title }} Content</p>
          </d-tab>
        </d-tabs>
      `,
      setup() {
        const editableId = ref('tab1');
        const tabs = ref([
          { id: 'tab1', title: 'Tab1' },
          { id: 'tab2', title: 'Tab2' },
          { id: 'tab3', title: 'Tab3' },
        ]);

        const tabRemove = (targetTab) => {
          if (tabs.value.length === 1) {
            return;
          }
          const tempTabs = tabs.value;
          let activeName = editableId.value;

          if (activeName === targetTab.id) {
            tempTabs.forEach((tab, index) => {
              if (tab.id === targetTab.id) {
                const nextTab = tempTabs[index + 1] || tempTabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.id;
                }
              }
            });
          }

          editableId.value = activeName;
          tabs.value = tempTabs.filter((tab) => tab.id !== targetTab.id);
        };

        return {
          editableId,
          tabs,
          tabAdd,
          tabRemove,
        };
      },
    });
    const newBtn = wrapper.find(dotTabsNewTab);
    expect(newBtn.exists()).toBe(true);

    await newBtn.trigger('click');
    expect(tabAdd).toBeCalledTimes(1);
    // TODO tab组件无法正常渲染
  });

  it('tabs event work', async () => {
    const onTabChange = jest.fn();
    wrapper = mount({
      components: {
        'd-tabs': Tabs,
        'd-tab': Tab,
      },
      template: `
        <d-tabs v-model="editableId" addable @tab-change="onTabChange">
          <d-tab v-for="tab in tabs" :key="tab.id" :id="tab.id" :title="tab.title">
            <p>{{ tab.title }} Content</p>
          </d-tab>
        </d-tabs>
      `,
      setup() {
        const editableId = ref('tab1');
        const tabs = ref([{ id: 'tab1', title: 'Tab1' }]);

        return {
          editableId,
          tabs,
          onTabChange,
        };
      },
    });
    const newBtn = wrapper.find(dotTabsNewTab);
    expect(newBtn.exists()).toBe(true);

    await newBtn.trigger('click');
    expect(onTabChange).toBeCalledTimes(1);
  });
});
