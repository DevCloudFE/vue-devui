import { shallowMount,mount } from "@vue/test-utils";
import {ref,nextTick,Transition } from 'vue';
import DButton from '../../button/index';
import DPanel from '../src/panel'
import DPanelHeader from '../src/header/panel-header';
import DPanelBody from '../src/body/panel-body';
import DPanelFooter from '../src/foot/panel-footer';


describe('DPanel',()=>{

    // 渲染测试
    it('Render',()=>{
        // except(wrapper.html())
        let wrapper = mount({
            components:{
                DPanel,
                DPanelBody,
                DPanelHeader,
                DPanelFooter,
                DButton
            },
            template: `
            <d-panel type="primary" :showAnimation = showAnimation :hasLeftPadding = leftPadding :toggle=handleToggle :isCollapsed=isCollapsed :beforeToggle="beforeToggle">
                <d-panel-header>
                    Panel with foldable
                </d-panel-header>
                <d-panel-body>
                    This is body
                </d-panel-body>
            </d-panel>
            <br /><br />
            <d-button @click="panelToggle = !panelToggle" >
                {{ panelToggle ? '阻止折叠' : '允许折叠' }}
            </d-button>
            `,
            setup(){
              let isCollapsed = ref(true);
              let panelToggle = ref(false);
              let toggle = ref(true);
              let leftPadding = ref(true);
              let showAnimation = ref(true);
              let state;
              const handleToggle = (e) => toggle.value = e;
              const beforeToggle = () => panelToggle.value;
              return {
                state,
                toggle,
                panelToggle,
                beforeToggle,
                isCollapsed,
                handleToggle,
                leftPadding,
                showAnimation
              }
            }
        });
        expect(wrapper.html()).toContain('<div class="devui-panel-content"> This is body </div>');
    })

    it('isCollapsed', async ()=>{
        let wrapper = mount({
            components:{
                DPanel,
                DPanelBody,
                DPanelHeader,
                DPanelFooter,
                DButton
            },
            template: `
            <d-panel type="primary" :showAnimation = showAnimation :hasLeftPadding = leftPadding :toggle=handleToggle :isCollapsed=isCollapsed :beforeToggle="beforeToggle">
                <d-panel-header>
                    Panel with foldable
                </d-panel-header>
                <d-panel-body>
                    This is body
                </d-panel-body>
            </d-panel>
            <br /><br />
            <d-button @click="leftPadding = !leftPadding" >
                切换LeftPadding
            </d-button>
            `,
            setup(){
              let isCollapsed = ref(false);
              let panelToggle = ref(false);
              let toggle = ref(true);
              let leftPadding = ref(false);
              let showAnimation = ref(true);
              let state;
              const handleToggle = (e) => toggle.value = e;
              const beforeToggle = () => panelToggle.value;
              return {
                state,
                toggle,
                panelToggle,
                beforeToggle,
                isCollapsed,
                handleToggle,
                leftPadding,
                showAnimation
              }
            }
        });
        expect(wrapper.find(`.devui-panel-default`).element.children[0].innerHTML).toBe('<!---->')
    })
    // 动态hasLeftPadding 测试
    it('padding-dynamic', async ()=>{
        let wrapper = mount({
            components:{
                DPanel,
                DPanelBody,
                DPanelHeader,
                DPanelFooter,
                DButton
            },
            template: `
            <d-panel type="primary" :showAnimation = showAnimation :hasLeftPadding = leftPadding :toggle=handleToggle :isCollapsed=isCollapsed :beforeToggle="beforeToggle">
                <d-panel-header>
                    Panel with foldable
                </d-panel-header>
                <d-panel-body>
                    This is body
                </d-panel-body>
            </d-panel>
            <br /><br />
            <d-button @click="leftPadding = !leftPadding" >
                切换LeftPadding
            </d-button>
            `,
            setup(){
              let isCollapsed = ref(true);
              let panelToggle = ref(false);
              let toggle = ref(true);
              let leftPadding = ref(false);
              let showAnimation = ref(true);
              let state;
              const handleToggle = (e) => toggle.value = e;
              const beforeToggle = () => panelToggle.value;
              return {
                state,
                toggle,
                panelToggle,
                beforeToggle,
                isCollapsed,
                handleToggle,
                leftPadding,
                showAnimation
              }
            }
        });
        expect(wrapper.find('.devui-panel-body-collapse').classes().length).toBe(3);
        await wrapper.find('button').trigger('click');
        expect(wrapper.find('.devui-panel-body-collapse').classes().length).toBe(2);
    })

    // 动态beforeToggle 测试
    it('beforeToggle-dynamic',async ()=>{
        let wrapper = mount({
            components:{
                DPanel,
                DPanelBody,
                DPanelHeader,
                DPanelFooter,
                DButton
            },
            template: `
            <d-panel type="primary" :showAnimation = showAnimation :hasLeftPadding = leftPadding :toggle=handleToggle :isCollapsed=isCollapsed :beforeToggle="beforeToggle">
                <d-panel-header>
                    Panel with foldable
                </d-panel-header>
                <d-panel-body>
                    This is body
                </d-panel-body>
            </d-panel>
            <br /><br />
            <d-button @click="panelToggle = !panelToggle" >
                {{ panelToggle ? '阻止折叠' : '允许折叠' }}
            </d-button>
            `,
            setup(){
              let isCollapsed = ref(true);
              let panelToggle = ref(false);
              let toggle = ref(true);
              let leftPadding = ref(false);
              let showAnimation = ref(true);
              let state;
              const handleToggle = (e) => toggle.value = e;
              const beforeToggle = () => panelToggle.value;
              return {
                state,
                toggle,
                panelToggle,
                beforeToggle,
                isCollapsed,
                handleToggle,
                leftPadding,
                showAnimation
              }
            }
        });
        await wrapper.find('button').trigger('click');
        expect(wrapper.vm.panelToggle).toBe(true);
        await wrapper.find('button').trigger('click');
        expect(wrapper.vm.panelToggle).toBe(false);
    })
});