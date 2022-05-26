import { mount, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance, ref } from 'vue';
import { Tabs, Tab } from '..';

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

    expect(wrapper.find('.devui-tabs').exists()).toBe(true);
    expect(wrapper.find('.devui-tabs__nav').exists()).toBe(true);
    expect(wrapper.find('.devui-tab__content').exists()).toBe(true);
  });
});
