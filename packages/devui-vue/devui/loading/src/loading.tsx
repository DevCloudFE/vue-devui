import { CSSProperties, defineComponent, ref } from 'vue';
import { loadingProps, LoadingProps } from './loading-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './loading.scss';

export default defineComponent({
  name: 'Loading',
  inheritAttrs: false,
  props: loadingProps,
  setup(props: LoadingProps) {
    const style: CSSProperties = {
      top: props.view.top,
      left: props.view.left,
      zIndex: props.zIndex,
    };
    if (!props.message) {
      style.background = 'none';
    }
    const isShow = ref(false);

    const open = () => {
      isShow.value = true;
    };

    const close = () => {
      isShow.value = false;
    };

    return {
      style,
      isShow,
      open,
      close,
    };
  },
  render() {
    const { isShow, isFull, backdrop, style, message, $slots } = this;
    const ns = useNamespace('loading');

    return (
      isShow && (
        <div class={[ns.b(), isFull ? ns.m('full') : '']}>
          {$slots.default?.() || (
            <div class={ns.e('wrapper')}>
              {backdrop ? <div class={ns.e('mask')}></div> : null}
              <div style={style} class={ns.e('area')}>
                <div class={ns.e('busy-default-spinner')}>
                  <div class={ns.e('bar1')}></div>
                  <div class={ns.e('bar2')}></div>
                  <div class={ns.e('bar3')}></div>
                  <div class={ns.e('bar4')}></div>
                </div>
                {message ? <span class={ns.e('text')}>{message}</span> : null}
              </div>
            </div>
          )}
        </div>
      )
    );
  },
});
