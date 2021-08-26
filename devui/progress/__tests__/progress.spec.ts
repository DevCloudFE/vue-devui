import { mount } from '@vue/test-utils';
import Progress from '../progress';

describe('d-progress', () => {
    it('height', () => {
        const wrapper = mount(Progress, {
            props: { height: '20px' },
        });
        expect(wrapper.props().height).toBe('20px');
    });

    it('percentage', () => {
        const wrapper = mount(Progress, {
            props: { percentage: 20 },
        });
        expect(wrapper.props().percentage).toBe(20);
    });

    it('percentageText', () => {
        const wrapper = mount(Progress, {
            props: { percentageText: '30%' },
        });
        expect(wrapper.props().percentageText).toBe('30%');
    });

    it('barbgcolor', () => {
        const wrapper = mount(Progress, {
            props: { barbgcolor: '#5170ff' },
        });
        expect(wrapper.props().barbgcolor).toBe('#5170ff');
    });

    it('isCircle', () => {
        const wrapper = mount(Progress, {
            props: { isCircle: false },
        });
        expect(wrapper.props().isCircle).toBe(false);
    });

    it('strokeWidth', () => {
        const wrapper = mount(Progress, {
            props: { strokeWidth: 6 },
        });
        expect(wrapper.props().strokeWidth).toBe(6);
    });

    it('showContent', () => {
        const wrapper = mount(Progress, {
            props: { showContent: true },
        });
        expect(wrapper.props().showContent).toBe(true);
    });
});
