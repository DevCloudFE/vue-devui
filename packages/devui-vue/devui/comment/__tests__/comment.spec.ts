import { mount } from '@vue/test-utils';
import { Comment } from '..';

describe('comment test', () => {
  it('comment init render', async () => {
    const wrapper = mount(Comment, {
      slots: {
        actions: 'Comment Actions',
        author: 'Comment Author',
        avatar: 'Comment Avatar',
        content: 'Comment Content',
        datetime: 'Comment Datetime',
      },
    });
    expect(wrapper.find('.devui-comment').exists()).toBe(true);
    expect(wrapper.find('.devui-comment-actions').text()).toBe('Comment Actions');
    expect(wrapper.find('.devui-comment-author').text()).toBe('Comment Author');
    expect(wrapper.find('.devui-comment-avatar').text()).toBe('Comment Avatar');
    expect(wrapper.find('.devui-comment-content').text()).toBe('Comment Content');
    expect(wrapper.find('.devui-comment-datetime').text()).toBe('Comment Datetime');
  });
});
