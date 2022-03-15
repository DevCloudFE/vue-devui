import { shallowMount } from '@vue/test-utils';
import DPopover from '../src/popover'
describe('DPopover', () => {
    it('visible', () => {
        const wrapper = shallowMount(DPopover, {
            props: {
                visible: true
            }
        })
        expect(wrapper.props().visible).toBeTruthy()
        expect(wrapper.classes().includes('devui-popover-isVisible')).toBeTruthy()
    })

    it('position', () => {
        const left = 'left'
        const wrapper = shallowMount(DPopover, {
            props: {
                position: left
            }
        })
        expect(wrapper.props().position).toBe(left)
        expect(wrapper.classes().includes(left)).toBeTruthy()
    })

    it('content', () => {
        const content = '自定义内容'
        const wrapper = shallowMount(DPopover, {
            props: {
                content
            }
        })
        expect(wrapper.props().content).toBe(content)
        expect(wrapper.find('.devui-popover-content').text()).toBe(content)
    })

    it('trigger click', async () => {
        const wrapper = shallowMount(DPopover, {
            props: {
                controlled: true
            }
        })
        const isVisible = () => expect(wrapper.classes().includes('devui-popover-isVisible'))
        isVisible().toBeFalsy()
        await wrapper.find('.devui-popover-reference').trigger('click')
        isVisible().toBeTruthy();
    })

    it('trigger mouse', async () => {
        const wrapper = shallowMount(DPopover, {
            props: {
                trigger: 'hover'
            }
        })
        const isVisible = () => expect(wrapper.classes().includes('devui-popover-isVisible'))
        isVisible().toBeFalsy()
        wrapper.find('.devui-popover-reference').trigger('onMouseenter')
        wrapper.vm.$nextTick(() => {
            isVisible().toBeTruthy()
        })
    })

    it('zIndex', () => {
        const zIndex = 1000
        const wrapper = shallowMount(DPopover, {
            props: {
                zIndex
            }
        })
        expect(wrapper.props().zIndex).toBe(zIndex);
    })

    it('popType', () => {
        const wrapper = shallowMount(DPopover, {
            props: {
                popType: 'warning'
            }
        })
        expect(wrapper.find('.devui-popover-icon').attributes().name).toBe('warning-o')
    })

    it('showAnimation', () => {
        const wrapper = shallowMount(DPopover, {
            props: {
                showAnimation: false,
            }
        })
        expect(wrapper.classes().includes('devui-popover-animation')).toBeFalsy()
    })

    it('popMaxWidth', () => {
        const popMaxWidth = 30
        const wrapper = shallowMount(DPopover, {
            props: {
                popMaxWidth
            }
        })
        expect(wrapper.props().popMaxWidth).toBe(popMaxWidth)
    })

})