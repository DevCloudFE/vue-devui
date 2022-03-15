import { defineComponent, computed, ref, Ref, CSSProperties, onMounted, onUnmounted, provide } from 'vue';
import { rowProps, RowProps } from './grid-types';
import { formatClass } from './use-grid';
import { responesScreen, Screen, RESULT_SCREEN, removeSubscribeCb } from './use-screen';
import './row.scss';

const CLASS_PREFIX = 'devui-row';

export default defineComponent({
  name: 'DRow',
  props: rowProps,
  emits: [],
  setup(props: RowProps, { slots }) {
    const gutterScreenSize = ref<Screen>({});

    const rowClass = computed<string>(() => {
      const alignClass = formatClass(`${CLASS_PREFIX}-align`, props.align);
      const justifyClass = formatClass(`${CLASS_PREFIX}-justify`, props.justify);
      const wrapClass = props.wrap ? ` ${CLASS_PREFIX}-wrap` : '';
      return `${alignClass}${justifyClass}${wrapClass}`;
    });

    let token;

    onMounted(() => {
      token = responesScreen(screen => {
        gutterScreenSize.value = screen;
      });
    });

    onUnmounted(() => {
      removeSubscribeCb(token);
    });

    const gutterStyle = computed<CSSProperties>(() => {
      if (!props.gutter) {
        return {};
      }
      let currentGutter = [0, 0];
      if (Array.isArray(props.gutter)) {
        currentGutter = props.gutter as number[];
      } else if (typeof props.gutter === 'number') {
        currentGutter = [props.gutter as number, 0];
      } else {
        RESULT_SCREEN.some(size => {
          const gzs = props.gutter[size];
          if (gutterScreenSize.value[size] && gzs) {
            if (typeof gzs === 'number') {
              currentGutter = [gzs, 0];
            } else {
              currentGutter = gzs;
            }
            return true;
          }
          return false;
        });
      }
      const paddingLeft = `${(currentGutter[0] || 0) / 2}px`;
      const paddingRight = `${(currentGutter[0] || 0) / 2}px`;
      const paddingTop = `${(currentGutter[1] || 0) / 2}px`;
      const paddingBottom = `${(currentGutter[1] || 0) / 2}px`;
      return { paddingLeft, paddingRight, paddingTop, paddingBottom };
    });

    provide<Ref<CSSProperties>>('gutterStyle', gutterStyle);

    return () => <div class={`${CLASS_PREFIX}${rowClass.value}`}>{slots.default?.()}</div>;
  }
});
