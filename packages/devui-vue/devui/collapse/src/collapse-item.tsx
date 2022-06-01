import { defineComponent, computed, inject, Transition } from 'vue';
import { collapseItemProps } from './collapse-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { Icon } from '../../icon';
import { SELECT_TOKEN } from './const';

export default defineComponent({
  name: 'DCollapseItem',
  props: collapseItemProps,
  setup(props, ctx) {
    const ns = useNamespace('collapse');
    const collapse = inject(SELECT_TOKEN, null);
    const isOpen = computed(() => {
      if (Array.isArray(collapse?.modelValue)) {
        return Boolean(collapse?.modelValue.length) && collapse?.modelValue.includes(props.name);
      } else {
        return Boolean(collapse?.modelValue) && collapse?.modelValue === props.name;
      }
    });
    return () => {
      return (
        <div class={ns.e('item')}>
          <div class={[ns.e('item-title'), ns.m('overflow-ellipsis'), isOpen.value && ns.m('open')]}>
            {props.title}
            <span class={ns.e('open-icon')}>
              <Icon name="select-arrow" size="16px" />
            </span>
          </div>
          <Transition name="fade">
            <div v-show={isOpen.value} class={ns.e('item-content')}>
              {ctx.slots.default?.()}
            </div>
          </Transition>
        </div>
      );
    };
  },
});
