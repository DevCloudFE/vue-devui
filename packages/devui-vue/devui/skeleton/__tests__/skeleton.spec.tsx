import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import DSkeleton from '../src/skeleton';
import DSkeletonItem from '../src/components/skeleton-item';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('skeleton', true);
const noDotNs = useNamespace('skeleton');
const skeletonItemNs = useNamespace('skeleton-item', true);
const skeletonItemNoDotNs = useNamespace('skeleton-item');

describe('d-skeleton', () => {
  it('render basic skeleton', async () => {
    const wrapper = mount({
      setup() {
        return () => <DSkeleton></DSkeleton>;
      },
    });

    await nextTick();
    const skeleton = wrapper.find(ns.b());
    expect(skeleton.exists()).toBe(true);
    const skeletonItem = skeleton.findAll(skeletonItemNs.b());
    expect(skeletonItem.length).toBe(4);
    expect(skeletonItem[0].classes()).toContain(noDotNs.e('title'));
    expect(skeleton.findAll(ns.e('paragraph')).length).toBe(3);

    wrapper.unmount();
  });

  it('rows and round and animation', async () => {
    const round = ref(false);
    const animation = ref(false);
    const rows = ref(2);
    const wrapper = mount({
      setup() {
        return () => <DSkeleton rows={rows.value} round={round.value} show-animation={animation.value}></DSkeleton>;
      },
    });

    await nextTick();
    const roundItem = wrapper.find(skeletonItemNs.m('round'));
    const animationItem = wrapper.find(skeletonItemNs.m('animation'));
    let paragraphItem = wrapper.findAll(ns.e('paragraph'));
    expect(roundItem.exists()).toBe(false);
    expect(animationItem.exists()).toBe(false);
    expect(paragraphItem.length).toBe(2);

    round.value = true;
    animation.value = true;
    rows.value = 4;
    await nextTick();
    const skeletonItem = wrapper.find(skeletonItemNs.b());
    paragraphItem = wrapper.findAll(ns.e('paragraph'));
    expect(skeletonItem.classes()).toContain(skeletonItemNoDotNs.m('round'));
    expect(skeletonItem.classes()).toContain(skeletonItemNoDotNs.m('animation'));
    expect(paragraphItem.length).toBe(4);

    wrapper.unmount();
  });

  it('loading', async () => {
    const loading = ref(true);
    const wrapper = mount({
      setup() {
        return () => (
          <DSkeleton loading={loading.value}>
            <div class="loaded-element">some text</div>
          </DSkeleton>
        );
      },
    });

    await nextTick();
    let skeletonItem = wrapper.find(skeletonItemNs.b());
    let loadedEl = wrapper.find('.loaded-element');
    expect(skeletonItem.exists()).toBe(true);
    expect(loadedEl.exists()).toBe(false);

    loading.value = false;
    await nextTick();
    skeletonItem = wrapper.find(skeletonItemNs.b());
    loadedEl = wrapper.find('.loaded-element');
    expect(skeletonItem.exists()).toBe(false);
    expect(loadedEl.exists()).toBe(true);

    wrapper.unmount();
  });

  it('d-skeleton-item size and variant', async () => {
    const variant = ref('circle');
    const size = ref('md');
    const wrapper = mount({
      setup() {
        return () => (
          <DSkeleton>
            {{
              placeholder: () => <DSkeletonItem variant={variant.value} size={size.value}></DSkeletonItem>,
            }}
          </DSkeleton>
        );
      },
    });

    await nextTick();
    let skeletonItem = wrapper.find(skeletonItemNs.b());
    expect(skeletonItem.classes()).toContain(skeletonItemNoDotNs.m('circle'));
    expect(skeletonItem.classes()).toContain(skeletonItemNoDotNs.m('md'));

    variant.value = 'image';
    size.value = 'sm';
    await nextTick();
    skeletonItem = wrapper.find(skeletonItemNs.b());
    expect(skeletonItem.classes()).toContain(skeletonItemNoDotNs.m('image'));
    expect(skeletonItem.classes()).toContain(skeletonItemNoDotNs.m('sm'));

    wrapper.unmount();
  });
});
