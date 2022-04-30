import { defineComponent } from 'vue';
import { resultProps, ResultProps } from './result-types';
import Icon from '../../icon/src/icon';
import './result.scss';

export default defineComponent({
  name: 'DResult',
  props: resultProps,
  setup(props: ResultProps, ctx) {
    enum IconEnum {
      success = 'right-o',
      danger = 'error-o',
      warning = 'warning-o',
      info = 'info-o',
    }

    return () => {
      return (
        <div class="devui-result">
          {ctx.slots.icon ? (
            <div>{ctx.slots?.icon()}</div>
          ) : (
            <Icon name={IconEnum[props.icon] || ''} class={`devui-result__icon-${props.icon}`} size="64px" />
          )}
          <div class="devui-result__title">{ctx.slots.title ? ctx.slots?.title() : props.title}</div>
          <div class="devui-result__desc">{ctx.slots.desc ? ctx.slots?.desc() : props.desc}</div>
          <div class="devui-result__extra">{ctx.slots.extra ? ctx.slots?.extra() : ''}</div>
        </div>
      );
    };
  },
});
