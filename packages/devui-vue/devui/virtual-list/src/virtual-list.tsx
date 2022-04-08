import type { SetupContext } from 'vue';
import { defineComponent, toRefs, ref } from 'vue';
import { virtualListProps, VirtualListProps } from './virtual-list-types';
import Filler from './components/filler';
import ScrollBar from './components/scroll-bar';

export default defineComponent({
  name: 'DVirtualList',
  props: virtualListProps,
  setup(props: VirtualListProps, ctx: SetupContext) {
    const { style, class: className, component, data, ...restProps } = toRefs(props);
    const componentRef = ref(null);
    const scrollTop = ref(0);
    const setScrollTop = (newValue: number | ((val: number) => number)) => {
      let val: number;
      if (typeof newValue === 'function') {
        val = newValue(scrollTop.value);
      } else {
        val = newValue;
      }
      scrollTop.value = val;
    };
    const onComponentScroll = (event: UIEvent) => {
      const currentScrollTop = (event.currentTarget as HTMLElement).scrollTop;
      if (currentScrollTop !== scrollTop.value) {
        setScrollTop(currentScrollTop);
      }
    };
    return () => {
      const Component: unknown = component.value;
      return (
        <div
          style={{ ...style, position: 'relative' }}
          class={className.value}
          ref={ref}
          {...restProps}
          onScroll={(e) => e}
        >
          <Component
            ref={componentRef}
            onScroll={onComponentScroll}
          >
            <Filler>
              {Array.from({ length: 100 }).map((_, index) => {
                return <div>index: {index}</div>;
              })}
            </Filler>
          </Component>
          <ScrollBar />
        </div>
      );
    };
  }
});
