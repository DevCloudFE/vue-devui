import { defineComponent, computed, inject, Transition, onMounted, shallowRef } from 'vue';
import { collapseItemProps } from './collapse-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Icon } from '../../icon';
import { SELECT_TOKEN } from './const';

export default defineComponent({
  name: 'DCollapseItem',
  props: collapseItemProps,
  setup(props, ctx) {
    const ns = useNamespace('collapse');
    const transitionNs = useNamespace('collapse-transition');
    const collapseContent = shallowRef<HTMLElement>();
    const collapse = inject(SELECT_TOKEN, null);
    const isOpen = computed(() => {
      if (props.disabled) {
        return false;
      }
      if (Array.isArray(collapse?.modelValue)) {
        return Boolean(collapse?.modelValue.length) && collapse?.modelValue.includes(props.name);
      } else {
        return Boolean(collapse?.modelValue) && collapse?.modelValue === props.name;
      }
    });
    const handlerTitleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!props.disabled) {
        collapse?.collapseItemClick(props.name);
      }
    };

    // slide up down transition
    onMounted(() => {
      if (collapseContent.value) {
        const dom = collapseContent.value;
        if (isOpen.value) {
          dom.style.height = `${dom.offsetHeight}px`;
        }
      }
    });
    const enter = (element: Element) => {
      const el = element as HTMLElement;
      el.style.height = '';
      const height = el.offsetHeight;
      el.style.height = '0px';
      // 需要执行一次才会生效
      el.offsetHeight;
      el.style.height = `${height}px`;
    };
    const leave = (element: Element) => {
      const el = element as HTMLElement;
      el.style.height = '0px';
    };

    return () => {
      return (
        <div class={ns.e('item')}>
          <div
            class={[
              ns.e('item-title'),
              ns.m('overflow-ellipsis'),
              isOpen.value && ns.m('open'),
              props.disabled && ns.em('item', 'disabled'),
            ]}
            onClick={handlerTitleClick}>
            {ctx.slots.title ? ctx.slots.title() : props.title}
            <span class={ns.e('open-icon')}>
              <Icon name="select-arrow" size="16px" />
            </span>
          </div>
          <Transition name={transitionNs.b()} onEnter={enter} onLeave={leave}>
            {isOpen.value && (
              <div ref={collapseContent} class={ns.e('item-content')}>
                {ctx.slots.default?.()}
              </div>
            )}
          </Transition>
        </div>
      );
    };
  },
});
