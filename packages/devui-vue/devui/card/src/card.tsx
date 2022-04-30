import { computed, defineComponent, toRefs } from 'vue';
import { CardProps, cardProps } from './card-types';
import './card.scss';

export default defineComponent({
  name: 'DCard',
  props: cardProps,
  setup(props: CardProps, { slots }) {
    const { align, src } = toRefs(props);
    const alignClass = computed(() => {
      return {
        'd-card-actions': true,
        'devui-card-actions': true,
        [`devui-card-actions-align-${align.value}`]: align.value !== 'start',
      };
    });

    return () => {
      return (
        <div class="card-container devui-card">
          {slots.default?.()}
          <div class="devui-card-header">
            {slots.avatar?.() ? <div class="devui-card-avatar">{slots.avatar?.()}</div> : ''}
            <div class="devui-card-header-title-area">
              <div class="devui-card-title">{slots.title?.()}</div>
              <div class="devui-card-subtitle">{slots.subtitle?.()}</div>
            </div>
          </div>
          {src.value !== '' ? <img src={src.value} alt="" class="devui-card-meta" /> : ''}
          <div class="devui-card-content">{slots.content?.()}</div>
          <div class={alignClass.value}>{slots.actions ? slots.actions?.() : ''}</div>
        </div>
      );
    };
  },
});
