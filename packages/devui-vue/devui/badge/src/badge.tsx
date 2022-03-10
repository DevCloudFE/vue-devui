import { defineComponent, computed } from 'vue';
import { badgeProps, BadgeProps } from './badge-types';
import './badge.scss';

export default defineComponent({
  name: 'DBadge',
  props: badgeProps,
  setup(props: BadgeProps, ctx) {
    const className = computed(() => {
      const base = 'devui-badge-content';
      return [
        base,
        props.showDot ? `${base}-dot` : `${base}-count`,
        props.status && `${base}-${props.status}`,
        ctx.slots.default && props.position && `${base}-${props.position}`,
        ctx.slots.default && `${base}-fixed`,
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
        <div class='devui-badge'>
          {ctx.slots.default?.()}
          <div class={className.value} style={style.value}>
            {text.value}
          </div>
        </div>
      );
    };
  },
});
