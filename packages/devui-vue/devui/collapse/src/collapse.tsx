import { defineComponent, provide, reactive, toRefs } from 'vue';
import { SELECT_TOKEN } from './const';
import { collapseProps, CollapseContext, CollapseActiveData } from './collapse-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './collapse.scss';

export default defineComponent({
  name: 'DCollapse',
  props: collapseProps,
  emits: ['change', 'update:modelValue'],
  setup(props, ctx) {
    const ns = useNamespace('collapse');
    const scrollbarNs = useNamespace('scrollbar');
    const getLists = (data: CollapseActiveData) => {
      if (!data && data !== 0) {
        return [];
      }
      return Array.isArray(data) ? data : [data];
    };
    const collapseItemClick = (name: string | number) => {
      const activeLists = [...getLists(props.modelValue)];
      const itemIndex = activeLists.indexOf(name);
      if (props.accordion) {
        let activeName = name;
        if ((activeLists[0] || activeLists[0] === 0) && activeLists[0] === name) {
          activeName = '';
        }
        ctx.emit('update:modelValue', activeName);
        ctx.emit('change', activeName);
      } else {
        if (itemIndex > -1) {
          activeLists.splice(itemIndex, 1);
        } else {
          activeLists.push(name);
        }
        ctx.emit('update:modelValue', activeLists);
        ctx.emit('change', activeLists);
      }
    };
    provide(
      SELECT_TOKEN,
      reactive({
        ...toRefs(props),
        collapseItemClick,
      }) as CollapseContext
    );

    return () => {
      return <div class={[ns.b(), scrollbarNs.b()]}>{ctx.slots.default?.()}</div>;
    };
  },
});
