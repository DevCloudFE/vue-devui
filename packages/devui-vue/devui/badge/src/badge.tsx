import { defineComponent, computed } from 'vue';
import { badgeProps, BadgeProps } from './badge-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './badge.scss';

export default defineComponent({
  name: 'DBadge',
  props: badgeProps,
  setup(props: BadgeProps, ctx) {
    const ns = useNamespace('badge');
    const className = computed(() => {
      const base = ns.e('content');
      return [
        base,
        props.showDot ? ns.m('dot') : ns.m('count'),
        props.status && ns.m(props.status),
        ctx.slots.default && props.position && ns.m(props.position),
        ctx.slots.default && ns.m('fixed'),
      ].join(' ');
    });

    const style = computed(() => {
      const styleMap = {
        bgColor: 'background',
        textColor: 'color',
      };
      const ret = Object.keys(styleMap).reduce((result, key) => {
        props[key] && (result[styleMap[key]] = props[key]);
        return result;
      }, {});
      if (ctx.slots.default && props.offset) {
        const [x, y]: Array<number> = props.offset;
        const [yName, xName] = props.position.split('-');
        ret[yName] = y + 'px';
        ret[xName] = x + 'px';
      }

      return ret;
    });

    const text = computed(() => {
      if (props.showDot) {
        return;
      }
      if (typeof props.count === 'number' && typeof props.maxCount === 'number') {
        return props.count > props.maxCount ? `${props.maxCount}+` : props.count;
      }
      return props.count;
    });

    return () => {
      return (
        <div class={ns.b()}>
          {ctx.slots.default?.()}
          <div class={className.value} style={style.value}>
            {text.value}
          </div>
        </div>
      );
    };
  },
});
