import { defineComponent } from 'vue';
import { cardProps } from './card-types';
import './card.scss';

export default defineComponent({
  name: 'DCard',
  props: cardProps,

  render () {
    const {
      align,
      src
    } = this;
    const alignCls = {
      'd-card-actions':true,
      'devui-card-actions': true,
      [`devui-card-actions-align-${align}`]: align !== 'start',
    };
    return (
      <div class="card-container devui-card">
        {this.$slots.default?.()}
        <div class="devui-card-header">
          { this.$slots.cardAvatar?.()?<div class="devui-card-avatar">
            {this.$slots.cardAvatar?.()}
          </div>:'' }
          <div class="devui-card-header-title-area">
            <div class="devui-card-title">
              {this.$slots.cardTitle?.()}
            </div>
            <div class="devui-card-subtitle">
              {this.$slots.cardSubtitle?.()}
            </div>
          </div>
        </div>
        {src!==''?<img src={src} alt="" class="devui-card-meta"/>:''}
        <div class="devui-card-content" >
          {this.$slots.cardContent?.()}
        </div>
        <div class={alignCls}>
          {this.$slots.cardActions?this.$slots.cardActions?.():''}
        </div>
      </div>
    );
  }
});
