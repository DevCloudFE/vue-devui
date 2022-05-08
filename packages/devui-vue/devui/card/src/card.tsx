import { computed, defineComponent, toRefs } from 'vue';
import { CardProps, cardProps } from './card-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './card.scss';

export default defineComponent({
  name: 'DCard',
  props: cardProps,
  setup(props: CardProps, { slots }) {
    const { align, src } = toRefs(props);
    const ns = useNamespace('card');
    const alignClass = computed(() => {
      return {
        [ns.e('actions')]: true,
        [ns.em('actions', `align-${align.value}`)]: align.value !== 'start',
      };
    });

    return () => (
      <div class={['card-container', ns.b()]}>
        {slots.default?.()}
        <div class={ns.e('header')}>
          {slots.avatar?.() ? <div class={ns.e('avatar')}>{slots.avatar?.()}</div> : ''}
          <div>
            <div class={ns.e('title')}>{slots.title?.()}</div>
            <div class={ns.e('subtitle')}>{slots.subtitle?.()}</div>
          </div>
        </div>
        {src.value !== '' ? <img src={src.value} alt="" class={ns.e('meta')} /> : ''}
        <div class={ns.e('content')}>{slots.content?.()}</div>
        <div class={alignClass.value}>{slots.actions ? slots.actions?.() : ''}</div>
      </div>
    );
  },
});
