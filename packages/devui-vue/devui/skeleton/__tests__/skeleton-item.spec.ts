import { mount } from '@vue/test-utils';
import DSkeletonItem from '../src/components/skeleton-item';

describe('skeleton-item module', () => {
  it('render skeleton-item-avatar', () => {
    const wrapper = mount({
      components: { DSkeletonItem },
      template: `<d-skeleton-item :shape="'avatar'" style="margin-left:55px;width:80px;height:80px;" />`,
    });

    expect(wrapper.find('.devui-skeleton__shape__avatar').element.getAttribute('style'))
      .toBe('border-radius: 50%; margin-left: 55px; width: 80px; height: 80px;');
  });

  it('render skeleton-item-avatar without animation', () => {
    const wrapper = mount({
      components: { DSkeletonItem },
      template: `<d-skeleton-item :shape="'avatar'" :animate="false" />`,
    });

    expect(wrapper.find('.devui-skeleton__shape__avatar').classes()).not.toContain('devui-skeleton__animated');
  });

  it('render skeleton-item-paragraph', () => {
    const wrapper = mount({
      components: { DSkeletonItem },
      template: `<d-skeleton-item :shape="'paragraph'" :row="3" :row-width="['75%','50%']" />`,
    });
    const target = wrapper.find('.devui-skeleton__shape__paragraph');

    expect(target.element.childElementCount).toBe(3);
    expect(target.element.children[0].getAttribute('style')).toBe('width: 75%;');
    expect(target.element.children[1].getAttribute('style')).toBe('width: 50%;');
    expect(target.element.children[2].getAttribute('style')).toBe('');
  });
});
