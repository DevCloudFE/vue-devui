import { mount } from '@vue/test-utils';
import { Comment } from '..';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('comment', true);
describe('comment test', () => {
  it('comment init render', () => {
    const wrapper = mount(Comment);
    expect(wrapper.find(ns.e('avatar')).exists()).toBeTruthy();
    expect(wrapper.find(ns.e('head')).exists()).toBeTruthy();
    expect(wrapper.find(ns.e('author')).exists()).toBeTruthy();
    expect(wrapper.find(ns.e('datetime')).exists()).toBeTruthy();
    expect(wrapper.find(ns.e('content')).exists()).toBeTruthy();
  });
  it('comment render slots', () => {
    const wrapper = mount(Comment, {
      slots: {
        avatar: '<label class="slots-avatar"></label>',
        author: '<label class="slots-author"></label>r',
        datetime: '<label class="slots-datetime"></label>',
        default: '<label class="slots-default"></label>',
        actions: '<label class="slots-actions"></label>',
      },
    });

    expect(wrapper.find('.slots-avatar').exists()).toBeTruthy();
    expect(wrapper.find('.slots-author').exists()).toBeTruthy();
    expect(wrapper.find('.slots-datetime').exists()).toBeTruthy();
    expect(wrapper.find('.slots-default').exists()).toBeTruthy();
    expect(wrapper.find('.slots-actions').exists()).toBeTruthy();

    expect(wrapper.find(ns.e('avatar')).exists()).toBeFalsy();
    expect(wrapper.find(ns.e('author')).exists()).toBeFalsy();
    expect(wrapper.find(ns.e('datetime')).exists()).toBeFalsy();

  });
});
