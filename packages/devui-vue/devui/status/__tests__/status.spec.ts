import { mount } from '@vue/test-utils';
import Status from '../src/status';

describe('d-status', () => {
  it('type', async () => {
    const wrapper = mount(Status, {
      props: { type: 'success' }
    });

    expect(wrapper.classes()).toContain('devui-status-bg-success');

    await wrapper.setProps({type: ''});

    expect(wrapper.classes()).toContain('devui-status-bg-invalid');

    await wrapper.setProps({type: null});

    expect(wrapper.classes()).toContain('devui-status-bg-invalid');

    await wrapper.setProps({type: undefined});

    expect(wrapper.classes()).toContain('devui-status-bg-invalid');

    await wrapper.setProps({ type: 'error' });

    expect(wrapper.classes()).toContain('devui-status-bg-error');

    await wrapper.setProps({ type: 'warning' });

    expect(wrapper.classes()).toContain('devui-status-bg-warning');

    await wrapper.setProps({type: 'initial'});

    expect(wrapper.classes()).toContain('devui-status-bg-initial');

    await wrapper.setProps({type: 'waiting'});

    expect(wrapper.classes()).toContain('devui-status-bg-waiting');

    await wrapper.setProps({type: 'running'});

    expect(wrapper.classes()).toContain('devui-status-bg-running');

    await wrapper.setProps({type: 'invalid'});

    expect(wrapper.classes()).toContain('devui-status-bg-invalid');


  });

  it('slot', () => {
    const statusText = 'vue3 devui';
    const wrapper = mount(Status, {
      slots: {
        default: statusText
      }
    });
    expect(wrapper.text()).toEqual(statusText);
  });
});
