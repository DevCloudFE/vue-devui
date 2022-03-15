import { mount } from '@vue/test-utils';
import { h } from 'vue';
import Alert from '../src/alert';
describe('alert', () => {
  describe('alert basic', () => {
    it('should create alert component correctly', () => {
      const wrapper = mount(Alert);
      expect(wrapper.find('.devui-alert').exists()).toBe(true);
    });
    it('should alert show content correct', () => {
      const wrapper = mount(Alert, {
        slots: {
          default: h('span', {}, 'Vue DevUI'),
        },
      });
      expect(wrapper.find('.devui-alert').text()).toBe('Vue DevUI');
    });
  });

  describe('alert type', () => {
    it('alert should has success type', () => {
      const wrapper = mount(Alert, {
        props: {
          type: 'success',
        },
      });
      expect(wrapper.find('.devui-icon-success').exists()).toBe(true);
    });
    it('alert should has warning type', () => {
      const wrapper = mount(Alert, {
        props: {
          type: 'warning',
        },
      });
      expect(wrapper.find('.devui-icon-warning').exists()).toBe(true);
    });
    it('alert should has error type', () => {
      const wrapper = mount(Alert, {
        props: {
          type: 'danger',
        },
      });
      expect(wrapper.find('.devui-icon-error').exists()).toBe(true);
    });
    it('alert should has info type', () => {
      const wrapper = mount(Alert);
      expect(wrapper.find('.devui-icon-info').exists()).toBe(true);
    });
    it('alert should has simple type', () => {
      const wrapper = mount(Alert, {
        props: {
          type: 'simple',
        },
      });
      expect(wrapper.find('.devui-alert-icon').exists()).toBe(false);
    });
  });

  describe('alert cssClass', () => {
    it('alert should append cssClass', () => {
      const wrapper = mount(Alert, {
        props: {
          cssClass: 'cssClass',
        },
      });
      expect(wrapper.find('.cssClass').exists()).toBe(true);
    });
  });

  describe('alert icon', () => {
    it('alert should show icon', () => {
      const wrapper = mount(Alert);
      expect(wrapper.find('.devui-alert-icon').exists()).toBe(true);
    });
    it('alert should not show icon', () => {
      const wrapper = mount(Alert, {
        props: {
          showIcon: false,
        },
      });
      expect(wrapper.find('.devui-alert-icon').exists()).toBe(false);
    });
  });

  describe('alert close', () => {
    it('alert should close', async () => {
      const wrapper = mount(Alert);
      await wrapper.find('.devui-close').trigger('click');
      setTimeout(() => {
        expect(wrapper.find('.devui-alert').exists()).toBe(false);
      }, 0);
    });
    it('alert should emit close event', async () => {
      const wrapper = mount(Alert);
      await wrapper.find('.devui-close').trigger('click');
      expect(wrapper.emitted()).toHaveProperty('close');
      expect(wrapper.emitted().close).toHaveLength(1);
    });
  });

  describe('alert dismiss', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    it('alert should not dismiss before 3000ms', async () => {
      const wrapper = mount(Alert, {
        props: {
          dismissTime: 3000,
        },
      });
      expect(wrapper.find('.devui-alert').exists()).toBe(true);
      await wrapper.find('.devui-close').trigger('click');
      jest.advanceTimersByTime(2000);
      expect(wrapper.find('.devui-alert').exists()).toBe(true);
      jest.advanceTimersByTime(1000);
      setTimeout(() => {
        expect(wrapper.find('.devui-alert').exists()).toBe(false);
      }, 0);
    });
  });
});
