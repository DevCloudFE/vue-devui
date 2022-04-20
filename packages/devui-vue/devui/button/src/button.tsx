import { defineComponent, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { Icon } from '../../icon';
import loadingDirective from '../../loading/src/loading-directive';
import { buttonProps, ButtonProps } from './button-types';
import useButton from './use-button';
import './button.scss';

export default defineComponent({
  name: 'DButton',
  directives: {
    dLoading: loadingDirective,
  },
  props: buttonProps,
  emits: ['click'],
  setup(props: ButtonProps, ctx: SetupContext) {
    const { icon, disabled, loading } = toRefs(props);
    const { classes, iconClass } = useButton(props, ctx);

    const onClick = (e: MouseEvent) => {
      if (loading.value) {
        return;
      }
      ctx.emit('click', e);
    };

    return () => {
      return (
        <button class={classes.value} disabled={disabled.value} v-dLoading={loading.value} onClick={onClick}>
          {icon.value && <Icon name={icon.value} size="var(--devui-font-size, 12px)" color="" class={iconClass.value} />}
          <span class="button-content">{ctx.slots.default?.()}</span>
        </button>
      );
    };
  },
});
