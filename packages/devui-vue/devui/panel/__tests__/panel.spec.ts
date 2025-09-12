import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import DButton from '../../button/index';
import DPanel from '../src/panel';
import DPanelHeader from '../src/components/panel-header';
import DPanelBody from '../src/components/panel-body';
import DPanelFooter from '../src/components/panel-footer';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('panel', true);

describe('DPanel', () => {
  // 渲染测试
  it('Render', () => {
    // except(wrapper.html())
    const wrapper = mount({
      components: {
        DPanel,
        DPanelBody,
        DPanelHeader,
        DPanelFooter,
        DButton,
      },
      template: `
            <d-panel>
                <d-panel-header>
                    Panel with foldable
                </d-panel-header>
                <d-panel-body>
                    This is body
                </d-panel-body>
            </d-panel>
            `,
    });
    expect(wrapper.find(ns.b()).exists()).toBe(true);
  });

  it('isCollapsed', async () => {
    const wrapper = mount({
      components: {
        DPanel,
        DPanelBody,
        DPanelHeader,
        DPanelFooter,
      },
      template: `
            <d-panel :isCollapsed="isCollapsed">
                <d-panel-header>
                    Panel with foldable
                </d-panel-header>
                <d-panel-body>
                    This is body
                </d-panel-body>
            </d-panel>
            `,
      setup() {
        const isCollapsed = ref(false);
        return { isCollapsed };
      },
    });
    expect(wrapper.find('.devui-panel .devui-panel-default').element.children[0].innerHTML).toBe('<!---->');
  });

  it('padding-dynamic', async () => {
    const wrapper = mount({
      components: {
        DPanel,
        DPanelBody,
        DPanelHeader,
        DPanelFooter,
        DButton,
      },
      template: `
            <d-panel :hasLeftPadding = "leftPadding" isCollapsed>
                <d-panel-header>
                    Panel with foldable
                </d-panel-header>
                <d-panel-body>
                    This is body
                </d-panel-body>
            </d-panel>
            <br /><br />
            <button @click="change" >
                切换LeftPadding
            </button>
            `,
      setup() {
        const leftPadding = ref(false);
        const change = () => {
          leftPadding.value = !leftPadding.value;
        };
        return {
          leftPadding,
          change,
        };
      },
    });
    expect(wrapper.find('.devui-panel-body-collapse').classes().length).toBe(3);
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.devui-panel-body-collapse').classes().length).toBe(2);
  });

  it('beforeToggle-dynamic', async () => {
    const wrapper = mount({
      components: {
        DPanel,
        DPanelBody,
        DPanelHeader,
        DPanelFooter,
      },
      template: `
            <d-panel :beforeToggle="beforeToggle" isCollapsed>
                <d-panel-header>
                    Panel with foldable
                </d-panel-header>
                <d-panel-body>
                    This is body
                </d-panel-body>
            </d-panel>
            <br /><br />
            <button @click="panelToggle = !panelToggle" >
                {{ panelToggle ? '阻止折叠' : '允许折叠' }}
            </button>
            `,
      setup() {
        const panelToggle = ref(false);
        const beforeToggle = () => panelToggle.value;
        return {
          panelToggle,
          beforeToggle,
        };
      },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.vm.panelToggle).toBe(true);
    await wrapper.find('button').trigger('click');
    expect(wrapper.vm.panelToggle).toBe(false);
  });
});
