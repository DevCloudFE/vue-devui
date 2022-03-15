import { defineComponent, computed, CSSProperties, Ref, inject } from 'vue';
import { colProps, ColProps } from './grid-types';
import { useSize, CLASS_PREFIX, useColClassNames } from './use-grid';
import './col.scss';


export default defineComponent({
  name: 'DCol',
  props: colProps,
  setup (props: ColProps, { slots }) {

    const formatFlex = (flex: typeof props.flex) => {
      if (typeof flex === 'number') {
        return `${flex} ${flex} auto`;
      }
      if (/^\d+(\.\d+)?(px|rem|em|%)$/.test(flex)) {
        return `0 0 ${flex}`;
      }
      return flex;
    };

    const colClassNames= useColClassNames(props);

    const sizeClassNames = useSize(props);

    const colStyle = computed<CSSProperties>(() => ({
      flex: formatFlex(props.flex),
      order: props.order
    }));

    const gutterStyle = inject<Ref<CSSProperties>>('gutterStyle');

    return () => <div class={`${CLASS_PREFIX}${colClassNames.value}${sizeClassNames.value}`} style={{ ...colStyle.value, ...gutterStyle.value }}>{slots.default?.()}</div>;
  }
});
