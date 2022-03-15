import { CSSProperties, defineComponent, ref } from 'vue';
import { componentProps, ComponentProps } from './types';

import './loading.scss';

export default defineComponent({
  name: 'DLoading',
  inheritAttrs: false,
  props: componentProps,
  setup(props: ComponentProps) {

    const style: CSSProperties = {
      top: props.view.top,
      left: props.view.left,
      zIndex: props.zIndex
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
      close
    };
  },
  render() {
    const {
      isShow,
      isFull,
      backdrop,
      style,
      message,
      $slots
    } = this;

    return (
      isShow &&
      <div class={['devui-loading-contanier', isFull ? 'devui-loading--full' : '']}>
        {
          $slots.default?.() ||
          <div class="devui-loading-wrapper">
            {
              backdrop
                ? <div class="devui-loading-mask"></div>
                : null
            }
            <div style={style} class="devui-loading-area">
              <div class="devui-busy-default-spinner">
                <div class="devui-loading-bar1"></div>
                <div class="devui-loading-bar2"></div>
                <div class="devui-loading-bar3"></div>
                <div class="devui-loading-bar4"></div>
              </div>
              {
                message
                  ? <span class="devui-loading-text">{message}</span>
                  : null
              }
            </div>
          </div>
        }
      </div>
    );
  }
});
