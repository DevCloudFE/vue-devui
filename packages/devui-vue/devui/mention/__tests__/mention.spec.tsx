import { mount } from '@vue/test-utils';
import { ref, Ref, nextTick } from 'vue';
import DMention from '../src/mention';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('mention', true);
const noDotNs = useNamespace('mention');

describe('d-mention', () => {
  it('basic function work well.', async () => {
    const suggestions = ref([
      {
        id: 2,
        value: 'Vue',
      },
      {
        id: 3,
        value: 'React',
      },
      {
        id: 4,
        value: 'Angular',
      },
    ]);
    const wrapper = mount({
      setup() {
        return () => (
          <DMention suggestions={suggestions.value} />
        );
      },
    });
    expect(wrapper.classes().includes(noDotNs.b()));
    await wrapper.find('.devui-textarea').trigger('focus');
    wrapper.find('.devui-textarea').setValue('@');
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(wrapper.find(ns.e('suggestions')).exists()).toBe(true);
    await wrapper.find(ns.e('suggestions-item')).trigger('click');
    expect(wrapper.find(ns.e('suggestions')).exists()).toBe(false);
    expect(wrapper.find('.devui-textarea').element.value).toBe('@Vue');
    wrapper.unmount();
  });

  it('props trigger work well.', async () => {
    const trigger = ref(['@', '#']);
    const suggestions = ref([
      {
        id: 2,
        value: 'Vue',
      },
      {
        id: 3,
        value: 'React',
      },
      {
        id: 4,
        value: 'Angular',
      },
    ]);
    const wrapper = mount({
      setup() {
        return () => (
          <DMention trigger={trigger.value} suggestions={suggestions.value} />
        );
      },
    });
    await wrapper.find('.devui-textarea').trigger('focus');
    wrapper.find('.devui-textarea').setValue('@');
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(wrapper.find(ns.e('suggestions')).exists()).toBe(true);
    wrapper.find('.devui-textarea').setValue('');
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(wrapper.find(ns.e('suggestions')).exists()).toBe(false);
    wrapper.find('.devui-textarea').setValue('#');
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(wrapper.find(ns.e('suggestions')).exists()).toBe(true);
    wrapper.unmount();
  });

  it('async loading work well.', async () => {
    const loading = ref(true);
    const suggestions: Ref = ref([]);
    const onSearchChange = async () => {
      loading.value = true;
      await new Promise(resolve => setTimeout(resolve, 1500));
      suggestions.value = [
        {
          id: 2,
          value: 'Vue',
        },
        {
          id: 3,
          value: 'React',
        },
        {
          id: 4,
          value: 'Angular',
        },
      ];
      loading.value = false;
    };
    const wrapper = mount({
      setup() {
        return () => (
          <DMention suggestions={suggestions.value} loading={loading.value} onChange={onSearchChange} />
        );
      },
    });
    await wrapper.find('.devui-textarea').trigger('focus');
    wrapper.find('.devui-textarea').setValue('@');
    await wrapper.find('.devui-textarea').trigger('input');
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(wrapper.find(ns.e('suggestions-loading')).exists()).toBe(true);
    expect(wrapper.find(ns.e('suggestions-item')).exists()).toBe(false);
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(wrapper.find(ns.e('suggestions-item')).exists()).toBe(true);
    wrapper.unmount();
  });

  it('props position work well.', async () => {
    const position: Ref = ref('bottom');
    const suggestions = ref([
      {
        id: 2,
        value: 'Vue',
      },
      {
        id: 3,
        value: 'React',
      },
      {
        id: 4,
        value: 'Angular',
      },
    ]);
    const wrapper = mount({
      setup() {
        return () => (
          <DMention position={position.value} suggestions={suggestions.value} />
        );
      },
    });
    await wrapper.find('.devui-textarea').trigger('focus');
    wrapper.find('.devui-textarea').setValue('@');
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(wrapper.find(ns.e('suggestions')).attributes().style.includes('margin-top: -16px')).toBe(true);
    wrapper.setProps({
      position: 'top',
    });
    await nextTick();
    expect(wrapper.find(ns.e('suggestions')).attributes().style.includes('margin-top: 0px')).toBe(true);
    wrapper.unmount();
  });

  it('props not-found-content work well.', async () => {
    const suggestions = ref([
      {
        id: 2,
        value: 'Vue',
      },
      {
        id: 3,
        value: 'React',
      },
      {
        id: 4,
        value: 'Angular',
      },
    ]);
    const wrapper = mount({
      setup() {
        return () => (
          <DMention notFoundContent="not found content" suggestions={suggestions.value} />
        );
      },
    });
    await wrapper.find('.devui-textarea').trigger('focus');
    wrapper.find('.devui-textarea').setValue('@devui');
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(wrapper.find(ns.e('suggestions')).html().includes('not found content')).toBe(true);
    wrapper.unmount();
  });

  it('event select work well.', async () => {
    const suggestions = ref([
      {
        id: 2,
        value: 'Vue',
      },
      {
        id: 3,
        value: 'React',
      },
      {
        id: 4,
        value: 'Angular',
      },
    ]);
    const onSelect = jest.fn();
    const wrapper = mount({
      setup() {
        return () => (
          <DMention suggestions={suggestions.value} onSelect={onSelect} />
        );
      },
    });
    await wrapper.find('.devui-textarea').trigger('focus');
    wrapper.find('.devui-textarea').setValue('@');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await wrapper.find(ns.e('suggestions-item')).trigger('click');
    expect(onSelect).toBeCalledTimes(1);
    wrapper.unmount();
  });
});
