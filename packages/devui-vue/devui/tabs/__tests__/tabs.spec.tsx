import { mount, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance, nextTick, ref } from 'vue';
import { Tabs, Tab } from '..';
import { useNamespace } from '../../shared/hooks/use-namespace';

const dotTabNs = useNamespace('tab', true);
const dotTabsNs = useNamespace('tabs', true);

const dotTabs = dotTabsNs.b();
const dotTabsNav = dotTabsNs.e('nav');
const dotTabContent = dotTabNs.e('content');
const dotTabsNewTab = dotTabsNs.e('new-tab');
const dotTabsCloseBtn = dotTabsNs.e('close-btn');
const dotTabsNavPills = dotTabsNs.e('nav--pills');
const dotTabsNavOptions = dotTabsNs.e('nav--options');
const dotTabsNavWrapped = dotTabsNs.e('nav--wrapped');
const dotTabsNavSlider = dotTabsNs.e('nav--slider');
const dotTabsNavTop = dotTabsNs.e('nav--top');
const dotTabsNavRight = dotTabsNs.e('nav--right');
const dotTabsNavBottom = dotTabsNs.e('nav--bottom');
const dotTabsNavLeft = dotTabsNs.e('nav--left');

describe('Tabs', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  it('Basic tabs should render correctly.', async () => {
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

    await nextTick();
    expect(wrapper.find(dotTabs).exists()).toBe(true);
    expect(wrapper.find(dotTabsNav).exists()).toBe(true);
    expect(wrapper.find(dotTabContent).exists()).toBe(true);
    expect(wrapper.find('.active').attributes('id')).toBe('tab1');
    expect(wrapper.find('#tab1').text()).toBe('Tab1');

    wrapper.setProps({
      type: 'pills',
    });
    await nextTick();
    expect(wrapper.find(dotTabsNavPills).exists()).toBe(true);

    wrapper.setProps({
      type: 'options',
    });
    await nextTick();
    expect(wrapper.find(dotTabsNavOptions).exists()).toBe(true);

    wrapper.setProps({
      type: 'wrapped',
    });
    await nextTick();
    expect(wrapper.find(dotTabsNavWrapped).exists()).toBe(true);

    wrapper.setProps({
      type: 'slider',
    });
    await nextTick();
    expect(wrapper.find(dotTabsNavSlider).exists()).toBe(true);
  });

  it('addable & closeable work', async () => {
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

        const tabAdd = () => {
          for (let i = 1; i <= tabs.value.length + 1; i++) {
            if (!tabs.value.find((item) => item.id === `tab${i}`)) {
              tabs.value.push({ id: `tab${i}`, title: `Tab${i}` });
              break;
            }
          }
        };

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
    await nextTick();
    const newBtn = wrapper.find(dotTabsNewTab);
    expect(newBtn.exists()).toBe(true);

    await newBtn.trigger('click');
    const tab4 = wrapper.find('#tab4');
    expect(tab4.exists()).toBe(true);

    const closeBtns = wrapper.findAll(dotTabsCloseBtn);
    expect(closeBtns.length).toBe(4);
    await closeBtns[2].trigger('click');
    const tab3 = wrapper.find('#tab3');
    expect(tab3.exists()).toBe(false);
  });

  it('"tab-change" work', async () => {
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

  it('"active-tab-change" should be trigger after tab changed', async () => {
    const onActiveTabChange = jest.fn();
    wrapper = mount({
      setup() {
        const id = ref('tab1');

        return () => {
          return (
            <Tabs v-model={id.value} onActiveTabChange={onActiveTabChange}>
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

    await nextTick();
    wrapper.find('#tab2').trigger('click');
    await nextTick();
    expect(onActiveTabChange).toBeCalledTimes(1);
    await nextTick();
    expect(wrapper.find('.active').attributes('id')).toBe('tab2');
  });

  it('Slot can be inserted to rename tab title', async () => {
    wrapper = mount({
      components: {
        'd-tabs': Tabs,
        'd-tab': Tab,
      },
      template: `
        <d-tabs>
          <d-tab id="tab1" title="Tab1">
           <template #title>
            <div>abc</div>
           </template>
           Tab1 Content
          </d-tab>
          <d-tab id="tab2" title="Tab2">Tab2 Content</d-tab>
          <d-tab id="tab3" title="Tab3">Tab3 Content</d-tab>
        </d-tabs>
      `,
    });

    await nextTick();
    expect(wrapper.find('#tab1').text()).toBe('abc');
  });

  it('tab-position worked', async () => {
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

    await nextTick();
    expect(wrapper.find(dotTabsNavTop).exists()).toBe(true);

    wrapper.setProps({
      tabPosition: 'right',
    });
    await nextTick();
    expect(wrapper.find(dotTabsNavRight).exists()).toBe(true);

    wrapper.setProps({
      tabPosition: 'bottom',
    });
    await nextTick();
    expect(wrapper.find(dotTabsNavBottom).exists()).toBe(true);

    wrapper.setProps({
      tabPosition: 'left',
    });
    await nextTick();
    expect(wrapper.find(dotTabsNavLeft).exists()).toBe(true);
  });
});
