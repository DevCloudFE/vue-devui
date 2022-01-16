import { mount } from '@vue/test-utils';
import Tooltip from '../src/tooltip';
import DButton from '../../button/src/button';
import { Loading } from '../../loading/index'
import { nextTick } from 'vue';

let tooltipElement: HTMLElement;
const globalOption = {
    directives: {
        dLoading: Loading
    }
}
const defaultslot = {
    default: '<d-button variant="common">tooltip</d-button>'
}

describe('tooltip', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    })
    describe('basic', () => {
        it('should be create', async () => {
            const wrapper = mount(Tooltip, {
                props: {
                    content: 'content'
                },
                slots: defaultslot,
                global: globalOption
            })
            await nextTick();
            tooltipElement = wrapper.element.querySelector('.tooltip') as HTMLElement;
            expect(wrapper.find('.tooltip').exists()).toBe(true);
            expect(wrapper.find('.tooltipcontent').text()).toBe('content');
            await wrapper.findComponent(DButton).trigger('mouseenter');
            jest.advanceTimersByTime(150);
            await nextTick();
            tooltipElement = wrapper.element.querySelector('.tooltip') as HTMLElement;
            expect(tooltipElement.style.opacity).toBe('1');
            await wrapper.findComponent(DButton).trigger('mouseleave');
            jest.advanceTimersByTime(150);
            await nextTick();
            tooltipElement = wrapper.element.querySelector('.tooltip') as HTMLElement;
            expect(tooltipElement.style.opacity).toBe('0');
        })
        it('position should be left', async () => {
            const wrapper = mount(Tooltip, {
                props: {
                    content: 'content',
                    position: 'left'
                },
                slots: defaultslot,
                global: globalOption,
                attachTo: document.body
            })
            await nextTick();
            await wrapper.findComponent(DButton).trigger('mouseenter');
            jest.advanceTimersByTime(100);
            await nextTick();
            console.log(wrapper.element.childNodes);
            const tooltipArrowElement = wrapper.element.querySelector('.arrow') as HTMLElement;
            console.log(tooltipArrowElement);
            expect(tooltipArrowElement.style.borderLeft).toBe('5px solid rgb(70, 77, 110)');
            wrapper.unmount();
        })
        it('position should be top', async () => {
            const wrapper = mount(Tooltip, {
                props: {
                    content: 'content',
                    position: 'top'
                },
                slots: defaultslot,
                global: globalOption,
                attachTo: document.body
            })
            await nextTick();
            await wrapper.findComponent(DButton).trigger('mouseenter');
            jest.advanceTimersByTime(150);
            await nextTick();
            const tooltipArrowElement = wrapper.element.querySelector('.arrow') as HTMLElement;
            console.log(tooltipArrowElement.style);
            expect(tooltipArrowElement.style.borderTop).toBe('5px solid rgb(70, 77, 110)');
            wrapper.unmount();
        })
        it('position should be right', async () => {
            const wrapper = mount(Tooltip, {
                props: {
                    content: 'content',
                    position: 'right'
                },
                slots: defaultslot,
                global: globalOption,
                attachTo: document.body
            })
            await nextTick();
            await wrapper.findComponent(DButton).trigger('mouseenter');
            jest.advanceTimersByTime(150);
            await nextTick();
            const tooltipArrowElement = wrapper.element.querySelector('.arrow') as HTMLElement;
            console.log(tooltipArrowElement.style);
            expect(tooltipArrowElement.style.borderRight).toBe('5px solid rgb(70, 77, 110)');
            wrapper.unmount();
        })
        it('position should be bottom', async () => {
            const wrapper = mount(Tooltip, {
                props: {
                    content: 'content',
                    position: 'bottom'
                },
                slots: defaultslot,
                global: globalOption,
                attachTo: document.body
            })
            await nextTick();
            await wrapper.findComponent(DButton).trigger('mouseenter');
            jest.advanceTimersByTime(150);
            await nextTick();
            const tooltipArrowElement = wrapper.element.querySelector('.arrow') as HTMLElement;
            console.log(tooltipArrowElement.style);
            expect(tooltipArrowElement.style.borderBottom).toBe('5px solid rgb(70, 77, 110)');
            wrapper.unmount()
        })
    })
    describe('delay time', () => {
        it('test mouseEnterDelay', async () => {
            const wrapper = mount(Tooltip, {
                props: {
                    content: 'content',
                    mouseEnterDelay: '500'
                },
                slots: defaultslot,
                global: globalOption,
                attachTo: document.body
            })
            await nextTick();
            await wrapper.findComponent(DButton).trigger('mouseenter');
            jest.advanceTimersByTime(200);
            await nextTick();
            tooltipElement = wrapper.element.querySelector('.tooltip') as HTMLElement;
            expect(tooltipElement).toBe(null);
            jest.advanceTimersByTime(300);
            await nextTick();
            tooltipElement = wrapper.element.querySelector('.tooltip') as HTMLElement;
            expect(tooltipElement.style.opacity).toBe('1');
            wrapper.unmount();
        })
        it('test mouseLeaveDelay', async () => {
            const wrapper = mount(Tooltip, {
                props: {
                    content: 'content',
                    mouseLeaveDelay: '1000'
                },
                slots: defaultslot,
                global: globalOption,
                attachTo: document.body
            })
            await nextTick();
            await wrapper.findComponent(DButton).trigger('mouseenter');
            jest.advanceTimersByTime(100);
            await nextTick();
            tooltipElement = wrapper.element.querySelector('.tooltip') as HTMLElement;
            expect(tooltipElement.style.opacity).toBe('1');
            await wrapper.findComponent(DButton).trigger('mouseleave');
            jest.advanceTimersByTime(500);
            await nextTick();
            tooltipElement = wrapper.element.querySelector('.tooltip') as HTMLElement;
            expect(tooltipElement.style.opacity).toBe('1');
            jest.advanceTimersByTime(500);
            await nextTick();
            tooltipElement = wrapper.element.querySelector('.tooltip') as HTMLElement;
            expect(tooltipElement).toBe(null);
        })

    })

})