import { mount } from '@vue/test-utils';
import Status from '../status';

describe('d-status', () => {

  it('type', () => {
    const wrapper = mount(Status, {
      props: { type: 'success' },
    });
    expect(wrapper.classes()).toContain('devui-status-bg-success');
  });

  it('type', () => {
    const wrapper = mount(Status, {
      props: { type: 'error' },
    });
    expect(wrapper.classes()).toContain('devui-status-bg-error');
  });

  it('type', () => {
    const wrapper = mount(Status, {
      props: { type: 'warning' },
    });
    expect(wrapper.classes()).toContain('devui-status-bg-warning');
  });

  it('type', () => {
    const wrapper = mount(Status, {
      props: { type: 'initial' },
    });
    expect(wrapper.classes()).toContain('devui-status-bg-initial');
  });

  it('type', () => {
    const wrapper = mount(Status, {
      props: { type: 'waiting' },
    });
    expect(wrapper.classes()).toContain('devui-status-bg-waiting');
  });

  it('type', () => {
    const wrapper = mount(Status, {
      props: { type: 'running' },
    });
    expect(wrapper.classes()).toContain('devui-status-bg-running');
  });

  it('type', () => {
    const wrapper = mount(Status, {
      props: { type: 'invalid' },
    });
    expect(wrapper.classes()).toContain('devui-status-bg-invalid');
  });


  

  it('slot', () => {
    const statusText = 'vue3 devui';
    const wrapper = mount(Status, {
      slots:  {
        default: statusText
      }
    });
    expect(wrapper.text()).toEqual(statusText);
  });
});
