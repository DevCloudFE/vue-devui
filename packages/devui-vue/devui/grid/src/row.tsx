import { defineComponent, computed, ref, Ref, CSSProperties, onMounted, onUnmounted, provide } from 'vue';
import { rowProps, RowProps, GutterScreenSizes } from './grid-types';
import { responesScreen, Screen, RESULT_SCREEN, removeSubscribeCb, ScreenMediasKey } from './composables/use-screen';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './row.scss';

export default defineComponent({
  name: 'DRow',
  props: rowProps,
  emits: [],
  setup(props: RowProps, { slots }) {
    const gutterScreenSize = ref<Screen>({});
    const ns = useNamespace('row');

    const rowClass = computed<Record<string, boolean>>(() => ({
      [ns.em('align', props.align)]: true,
      [ns.em('justify', props.justify)]: true,
      [ns.e('wrap')]: props.wrap,
    }));

    let token: number;

    onMounted(() => {
      token = responesScreen((screen) => {
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
        RESULT_SCREEN.some((size) => {
          const gzs = (props.gutter as GutterScreenSizes)[size];
          if (gutterScreenSize.value[size as ScreenMediasKey] && gzs) {
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

    return () => <div class={[ns.b(), rowClass.value]}>{slots.default?.()}</div>;
  },
});
