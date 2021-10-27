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
        expect(wrapper.find('transition-stub').html()).toContain('<transition-stub><!----></transition-stub>');
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
            <d-panel :isCollapsed="isCollapsed">
                <d-panel-header>
                    Panel with foldable
                </d-panel-header>
                <d-panel-body>
                    This is body
                </d-panel-body>
            </d-panel>
            `,
            setup(){
              let isCollapsed = ref(false);
              return {isCollapsed}
            }
        });
        expect(wrapper.find('.devui-panel .devui-panel-default').element.children[0].innerHTML).toBe('<!---->');
    })
    // // 动态hasLeftPadding 测试
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
            <d-panel :hasLeftPadding = "leftPadding" isCollapsed>
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
              let leftPadding = ref(false);
              return {
                leftPadding,
              }
            }
        });
        expect(wrapper.find('.devui-panel-body-collapse').classes().length).toBe(3);
        await wrapper.find('button').trigger('click');
        expect(wrapper.find('.devui-panel-body-collapse').classes().length).toBe(2);
    })


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
            <d-panel :beforeToggle="beforeToggle" isCollapsed>
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
              let panelToggle = ref(false);
              const beforeToggle = () => panelToggle.value;
              return {
                panelToggle,
                beforeToggle,
              }
            }
        });
        await wrapper.find('button').trigger('click');
        expect(wrapper.vm.panelToggle).toBe(true);
        await wrapper.find('button').trigger('click');
        expect(wrapper.vm.panelToggle).toBe(false);
    })
})