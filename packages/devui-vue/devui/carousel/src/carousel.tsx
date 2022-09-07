import { defineComponent, ref, watch, onMounted, onBeforeUnmount, Fragment, Comment, toRefs } from 'vue';
import type { VNode } from 'vue';
import { carouselProps, DotTrigger, CarouselProps } from './types';
import Icon from '../../icon/src/icon';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './carousel.scss';

export default defineComponent({
  name: 'DCarousel',
  props: carouselProps,
  emits: ['update:activeIndex', 'activeIndexChange'],
  setup(props: CarouselProps, { emit, slots, expose }) {
    const ns = useNamespace('carousel');
    const { height, showDots, dotPosition, arrowTrigger, autoplay, autoplaySpeed, dotTrigger, activeIndex, transitionSpeed } =
      toRefs(props);

    const itemCount = ref(0);
    const showArrow = ref(false);
    const currentIndex = ref(0);
    const wrapperRef = ref<HTMLElement | null>(null);
    const containerRef = ref<HTMLElement | null>(null);
    const scheduledId = ref<ReturnType<typeof setTimeout> | null>(null);

    watch(
      () => arrowTrigger,
      () => {
        showArrow.value = arrowTrigger.value === 'always';
      },
      { immediate: true }
    );
    watch(
      () => activeIndex,
      () => {
        currentIndex.value = activeIndex.value;
      },
      { immediate: true }
    );

    // 翻页位移
    const translatePosition = (size: number) => {
      if (containerRef.value) {
        containerRef.value.style.left = `${-size * 100}%`;
      }
    };
    // 调整首尾翻页后的动画
    const adjustTransition = (targetEl: HTMLElement) => {
      setTimeout(() => {
        if (containerRef.value) {
          containerRef.value.style.transition = '';
        }

        targetEl.style.transform = '';
        translatePosition(currentIndex.value);
      }, transitionSpeed.value);
    };

    // 调整首尾翻动时的位置
    const adjustPosition = (targetEl: HTMLElement, firstToLast: boolean) => {
      if (wrapperRef.value) {
        const wrapperRect = wrapperRef.value.getBoundingClientRect();

        targetEl.style.transform = `translateX(${(firstToLast ? -itemCount.value : itemCount.value) * wrapperRect.width}px)`;
      }
    };

    // 清除自动轮播任务
    const clearScheduledTransition = () => {
      if (scheduledId.value) {
        clearTimeout(scheduledId.value);
        scheduledId.value = null;
      }
    };
    // 自动轮播调度任务
    const autoScheduleTransition = (callback?: () => void) => {
      clearScheduledTransition();
      if (autoplay.value && autoplaySpeed.value) {
        scheduledId.value = setTimeout(() => {
          callback?.();
        }, autoplaySpeed.value);
      }
    };

    // 指定跳转位置
    const goto = (index: number) => {
      if (index === currentIndex.value || !wrapperRef.value || !containerRef.value) {
        return;
      }

      containerRef.value.style.transition = `left ${transitionSpeed.value}ms ease`;

      let latestIndex = currentIndex.value;
      if (index < 0 && currentIndex.value === 0) {
        // 第一个卡片向前切换
        latestIndex = itemCount.value - 1;
        const targetEl = containerRef.value.children[latestIndex] as HTMLElement;
        adjustPosition(targetEl, true);
        translatePosition(-1);
        adjustTransition(targetEl);
      } else if (index >= itemCount.value && currentIndex.value === itemCount.value - 1) {
        // 最后一个卡片向后切换
        latestIndex = 0;

        const targetEl = containerRef.value.children[latestIndex] as HTMLElement;
        adjustPosition(targetEl, false);
        translatePosition(itemCount.value);
        adjustTransition(targetEl);
      } else {
        latestIndex = index < 0 ? 0 : index > itemCount.value - 1 ? itemCount.value - 1 : index;

        translatePosition(latestIndex);
      }

      currentIndex.value = latestIndex;
      emit('update:activeIndex', latestIndex);
      emit('activeIndexChange', latestIndex);
      autoScheduleTransition(() => {
        goto(currentIndex.value + 1);
      });
    };
    // 向前切换
    const prev = () => {
      goto(currentIndex.value - 1);
    };
    // 向后切换
    const next = () => {
      goto(currentIndex.value + 1);
    };

    // 切换箭头监听事件，用于处理hover方式
    const arrowMouseEvent = (type: 'enter' | 'leave') => {
      if (arrowTrigger.value !== 'hover') {
        return;
      }

      showArrow.value = type === 'enter';
    };
    // 指示器触发切换函数
    const switchStep = (index: number, type: DotTrigger) => {
      if (type === dotTrigger.value) {
        goto(index);
      }
    };

    const changeItemCount = (val: number) => {
      itemCount.value = val;
      autoScheduleTransition(next);
    };

    onMounted(() => {
      if (containerRef.value) {
        containerRef.value.style.transition = `left ${transitionSpeed.value}ms ease`;
        containerRef.value.style.left = '0%';
      }

      autoScheduleTransition(next);
    });
    onBeforeUnmount(() => {
      clearScheduledTransition();
    });

    expose({ prev, next, goto });

    return () => {
      const slot: VNode[] = slots.default?.() ?? ([] as VNode[]);

      // 在jsx中，使用map生成slot项会在外层包裹一个Fragment
      let children = slot;
      if (children.length === 1 && children[0].type === Fragment) {
        children = ((children[0].children || []) as VNode[]).filter((item) => item?.type !== Comment);
      }
      if (children.length !== itemCount.value) {
        changeItemCount(children.length);
      }

      return (
        <div
          class={ns.b()}
          style={{ height: height.value }}
          onMouseenter={() => arrowMouseEvent('enter')}
          onMouseleave={() => arrowMouseEvent('leave')}>
          {/* carousel arrow */}
          {arrowTrigger.value !== 'never' && showArrow.value ? (
            <div class={ns.e('arrow')}>
              <button class="arrow-left" onClick={() => prev()}>
                <Icon name="arrow-left" />
              </button>
              <button class="arrow-right" onClick={() => next()}>
                <Icon name="arrow-right" />
              </button>
            </div>
          ) : null}
          {/* carousel items */}
          <div class={ns.e('item-wrapper')} ref={wrapperRef}>
            <div
              class={ns.e('item-container')}
              style={{
                width: `${itemCount.value * 100}%`,
              }}
              ref={containerRef}>
              {slot}
            </div>
          </div>

          {/* carousel dots */}
          {itemCount.value > 0 && showDots.value ? (
            <ul class={[ns.e('dots'), dotPosition.value]}>
              {children.map((_, index) => (
                <li
                  class={{ 'dot-item': true, active: currentIndex.value === index }}
                  onClick={() => switchStep(index, 'click')}
                  onMouseenter={() => switchStep(index, 'hover')}
                  style={{ transition: `all ${transitionSpeed.value}ms ease` }}
                />
              ))}
            </ul>
          ) : null}
        </div>
      );
    };
  },
});
