import { defineComponent, toRefs, ref, reactive } from 'vue';
import type { SetupContext } from 'vue';
import { Icon } from '../../icon';
import LoadingDirective from '../../loading/src/loading-directive';
import { buttonProps, ButtonProps } from './button-types';
import useButton from './use-button';
import './button.scss';

export default defineComponent({
  name: 'DButton',
  directives: {
    Loading: LoadingDirective,
  },
  props: buttonProps,
  emits: ['click'],
  setup(props: ButtonProps, ctx: SetupContext) {
    const { icon, iconPos, disabled, loading, nativeType } = toRefs(props);
    const { classes, iconClass } = useButton(props, ctx);
    const isMouseDown = ref(false);
    const showWave = ref(false);
    const waveStyle = reactive({
      top: '0px',
      left: '0px',
    });

    if (!['right', 'left'].includes(iconPos.value)) {
      iconPos.value = 'left';
    }

    const showClickWave = (e: MouseEvent) => {
      waveStyle.left = e.offsetX + 'px';
      waveStyle.top = e.offsetY + 'px';
      showWave.value = true;

      setTimeout(() => {
        showWave.value = false;
      }, 300);
    };
    const onClick = (e: MouseEvent) => {
      if (loading.value) {
        return;
      }
      showClickWave(e);
      ctx.emit('click', e);
    };

    return () => {
      return (
        <button
          class={[classes.value, isMouseDown.value ? 'mousedown' : '']}
          disabled={disabled.value}
          onClick={onClick}
          type={nativeType.value}
          onMousedown={() => (isMouseDown.value = true)}
          onMouseup={() => (isMouseDown.value = false)}>
          {iconPos.value === 'left' && icon.value && (
            <Icon name={icon.value} size="var(--devui-font-size, 12px)" color="" class={iconClass.value} />
          )}
          <div class="loading-icon__container" v-show={loading.value}>
            <d-icon name="icon-loading" class="button-icon-loading" color="#BBDEFB"></d-icon>
          </div>
          <span class="button-content">{ctx.slots.default?.()}</span>
          {iconPos.value === 'right' && icon.value && (
            <Icon name={icon.value} size="var(--devui-font-size, 12px)" color="" class={iconClass.value} />
          )}
          {showWave.value && <div class="water-wave" style={waveStyle}></div>}
        </button>
      );
    };
  },
});
