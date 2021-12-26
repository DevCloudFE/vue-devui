import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Toast from '../src/toast';

describe('Toast', () => {
    describe('toast basic', () => {
        it('should create toast component correctly', () => {
            const wrapper = mount(Toast, {
                props: {
                    value: [
                        {
                            severity: 'success'
                        }
                    ]
                }
            });
            expect(wrapper.find('.devui-toast').exists()).toBe(true);
        })
        it('toast has summary', async() => {
            const wrapper = mount(Toast, {
                props: {
                    value: [
                        {
                            severity: 'success',
                            summary: 'Summary'
                        }
                    ]
                }
            })
            await nextTick();
            expect(wrapper.find('.devui-toast-title').text()).toBe('Summary');
        })
        it('toast has content', async() => {
            const wrapper = mount(Toast, {
                props: {
                    value: [
                        {
                            severity: 'success',
                            content: 'content'
                        }
                    ]
                }
            })
            await nextTick()
            expect(wrapper.find('.devui-toast-message').text()).toBe('content');
        })
        it('toast has content of solt', async() => {
            const wrapper = mount(Toast, {
                props: {
                    value: [
                        {
                            severity: 'success',
                            content: 'slot:customTemplate',
                            info: 'info'
                        } as any
                    ]
                },
                slots: {
                    customTemplate: (msg) => {
                        return `<p>${msg.info}</p>`
                    }
                }
            })
            await nextTick();
            expect(wrapper.find('.devui-toast-message').text()).toBe('<p>info</p>');
        })
        it('toast has detail', async() => {
            const wrapper = mount(Toast, {
                props: {
                    value: [
                        {
                            severity: 'success',
                            detail : 'detail'
                        }
                    ]
                }
            });
            await nextTick();
            expect(wrapper.find('.devui-toast-message').text()).toBe('detail');
        })
    })

    describe('toast type', () => {
        it('toast should be success', async () => {
            const wrapper = mount(Toast, {
                props: {
                    value: [
                        {
                            severity: 'success'
                        }
                    ]
                }
            });
            await nextTick();
            expect(wrapper.find('.devui-toast-message-success').exists()).toBe(true);
        });
        it('toast should be common', async() => {
            const wrapper = mount(Toast, {
                props: {
                    value: [
                        {
                            severity: 'common'
                        }
                    ]
                }
            });
            await nextTick();
            expect(wrapper.find('.devui-toast-message-common').exists()).toBe(true);
        })
        it('toast should be info', async() => {
            const wrapper = mount(Toast, {
                props: {
                    value: [
                        {
                            severity: 'info'
                        }
                    ]
                }
            });
            await nextTick();
            expect(wrapper.find('.devui-toast-message-info').exists()).toBe(true);
        })
        it('toast should be error', async() => {
            const wrapper = mount(Toast, {
                props: {
                    value: [
                        {
                            severity: 'error'
                        }
                    ]
                }
            });
            await nextTick();
            expect(wrapper.find('.devui-toast-message-error').exists()).toBe(true);
        })
        it('toast should be warning', async() => {
            const wrapper = mount(Toast, {
                props: {
                    value: [
                        {
                            severity: 'warning'
                        }
                    ]
                }
            })
            await nextTick();
            expect(wrapper.find('.devui-toast-message-warning').exists()).toBe(true);
        })
    })

    describe('toast life and sticky', () => {
        const value = [
            {
                severity: 'success',
                summary: 'summary'
            }
        ];
        beforeEach(() => {
            jest.useFakeTimers();
        })
        it('has life, should close after 5000ms', async() => {
            const wrapper = mount(Toast, {
                props: {
                    value: value,
                    life: 5000
                }
            })
            jest.advanceTimersToNextTimer(3000);
            await nextTick();
            expect(wrapper.find('.devui-toast-item-container')).toBeTruthy();
            jest.advanceTimersToNextTimer(2000);
            await nextTick();
            expect(wrapper.find('.devui-toast-item-container').exists()).toBeFalsy();
        })
        it('has life and sticky, not dismiss should close', async() => {
            const wrapper = mount(Toast, {
                props:{
                    value: value,
                    life: 5000,
                    sticky: true
                }
            })
            jest.advanceTimersByTime(3000);
            await nextTick();
            expect(wrapper.find('.devui-toast-item-container').exists()).toBe(true);
            jest.advanceTimersByTime(2000);
            await nextTick();
            expect(wrapper.find('.devui-toast-item-container').exists()).toBe(true);
            await wrapper.find('.devui-toast-icon-close').trigger('click');
            jest.advanceTimersByTime(300);
            await nextTick();
            expect(wrapper.find('.devui-toast-item-container').exists()).toBe(false);
        })
    })

    describe('toast single and global life mode', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        })
        it('dismiss by global life mode', async() => {
            const wrapper = mount(Toast,{
                props: {
                    value: [
                        { severity: 'success', life: 3000, summary: 'success' },
                        { severity: 'info', life: 5000, summary: 'info'},
                        { severity: 'error',summary: 'error' }
                    ],
                    lifeMode: 'global'
                }
            })
            await nextTick();
            expect(wrapper.find('.devui-toast-message-success')).toBeTruthy();
            expect(wrapper.find('.devui-toast-message-info')).toBeTruthy();
            expect(wrapper.find('.devui-toast-message-error')).toBeTruthy();
            jest.advanceTimersByTime(5300);
            await nextTick();
            expect(wrapper.find('.devui-toast-message-success').exists()).toBeFalsy();
            expect(wrapper.find('.devui-toast-message-info').exists()).toBeFalsy();
            expect(wrapper.find('.devui-toast-message-error').exists()).toBeFalsy();
            expect(wrapper.find('.devui-toast').text()).toBe('');
        })
        it('dismiss by singel life mode', async() => {
            const wrapper = mount(Toast, {
                props: {
                    value: [
                        { life: 3000, severity: 'info', summary: 'info', detail: 'info content' },
                        { life: 6000, severity: 'success', summary: 'success', detail: 'success content' }
                    ],
                    lifeMode: 'single'
                }
            })
            await nextTick();
            expect(wrapper.find('.devui-toast-message-info').exists()).toBe(true);
            expect(wrapper.find('.devui-toast-message-success').exists()).toBe(true);
            jest.advanceTimersByTime(3300);
            await nextTick();
            expect(wrapper.find('.devui-toast-message-info').exists()).toBe(false);
            expect(wrapper.find('.devui-toast-message-success').exists()).toBe(true);
            jest.advanceTimersByTime(3000);
            await nextTick();
            expect(wrapper.find('.devui-toast-message-info').exists()).toBe(false);
            expect(wrapper.find('.devui-toast-message-success').exists()).toBe(false);
            jest.runAllTimers();
            await nextTick();
            expect(wrapper.find('.devui-toast').text()).toBe('');
        })
        //TODO: mouseenter 没起作用
        describe('toast multiple', () => {
            beforeEach(() => {
                jest.useFakeTimers();
            })
            it('mouse over not dismiss, mouse out dismiss', async() => {
                const wrapper = mount(Toast, {
                    props: {
                        value: [
                            { severity: 'info', summary: 'info', detail: 'info content' },
                            { severity: 'success', summary: 'success', detail: 'success content' }
                        ],
                        life: 5000
                    }
                })
                await nextTick();
                expect(wrapper.find('.devui-toast-message-info').exists()).toBe(true);
                expect(wrapper.find('.devui-toast-message-success').exists()).toBe(true);
                await wrapper.findAll('.devui-toast-item-container')[0].trigger('mouseenter');
                jest.advanceTimersByTime(5000);
                await nextTick();
                expect(wrapper.find('.devui-toast-message-info').exists()).toBe(true);
                await wrapper.find('.devui-toast-message-info').trigger('mouseleave');
                jest.runAllTimers();
                await nextTick();
                expect(wrapper.find('.devui-toast-item-container').exists()).toBe(false);
            })
        })

        describe('toast styleClass and style', () => {
            it('add styleclass and style', async() => {
                const wrapper = mount(Toast, {
                    props: {
                        value: [
                            { severity: 'info', summary: 'info', detail: 'info content' }
                        ],
                        styleClass: 'myClass',
                        style: {
                            color: 'rgb(255, 255, 255)'
                        }
                    }
                })
                await nextTick();
                expect(wrapper.find('.devui-toast').classes()).toContain('myClass');
                expect(wrapper.find('.devui-toast').attributes('style')).toBe('z-index: 1076; color: rgb(255, 255, 255);');
            })
        })
    })
})