import { mount } from '@vue/test-utils';
import Progress from '../src/progress';

describe('progress', () => {
  describe('progress basic', () => {
    const TestComponent = {
      components: {
        'd-progress': Progress,
      },
      template: `
                <div class="progress-container">
                    <d-progress :percentage="80" percentageText="80%"></d-progress>
                </div>
            `,
    };
    const wrapper = mount(TestComponent);
    it('Progress demo has created successfully', async () => {
      expect(wrapper).toBeTruthy();
    });
  });

  describe('read only', () => {
    it('percentage should be rendered correctly', () => {
      const wrapper = mount(Progress, {
        props: { percentage: 20 },
      });
      expect(wrapper.props().percentage).toBe(20);
    });

    it('percentageText should be rendered correctly', () => {
      const wrapper = mount(Progress, {
        props: { percentageText: '30%' },
      });
      expect(wrapper.props().percentageText).toBe('30%');
    });

    it('barbgcolor should be rendered correctly', () => {
      const wrapper = mount(Progress, {
        props: { barBgColor: '#5170ff' },
      });
      expect(wrapper.props().barBgColor).toBe('#5170ff');
    });

    it('height should be rendered correctly', () => {
      const wrapper = mount(Progress, {
        props: { height: '20px' },
      });
      expect(wrapper.props().height).toBe('20px');
    });

    it('isCircle should be rendered correctly', () => {
      const wrapper = mount(Progress, {
        props: { isCircle: false },
      });
      expect(wrapper.props().isCircle).toBe(false);
    });

    it('strokeWidth should be rendered correctly', () => {
      const wrapper = mount(Progress, {
        props: { strokeWidth: 6 },
      });
      expect(wrapper.props().strokeWidth).toBe(6);
    });

    it('showContent should be rendered correctly', () => {
      const wrapper = mount(Progress, {
        props: { showContent: true },
      });
      expect(wrapper.props().showContent).toBe(true);
    });
  });
});

