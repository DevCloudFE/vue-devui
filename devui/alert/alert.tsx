import { defineComponent, ref, Transition, onMounted, watch, toRefs } from 'vue';

import AlertCloseIcon from './alert-close-icon';
import AlertTypeIcon from './alert-type-icon';

import './alert.scss';

export type AlertType = 'success' | 'danger' | 'warning' | 'info';

export default defineComponent({
  name: 'd-alert',
  props: {
    type: {
      type: String as () => AlertType,
      default: 'info'
    },
    cssClass: String,
    closeable: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    dismissTime: {
      type: Number
    },
    closeEvent: {
      type: Function as unknown as () => ((event?: MouseEvent) => void)
    }
  },
  emits:['close'],
  setup(props, ctx) {

    const hide = ref(false);
    const closing = ref(false);

    const alertEl = ref();

    const close = (event?: MouseEvent) => {
      const dom = alertEl.value;
      dom.style.height = `${dom.offsetHeight}px`;
      // 重复一次后才能正确设置 height
      dom.style.height = `${dom.offsetHeight}px`;
      closing.value = true;
      props.closeEvent?.(event);
    }

    const afterLeave = () => {
      hide.value = true;
      closing.value = false;
    }

    onMounted(() => {
      if (props.dismissTime) {
        setTimeout(() => {
          close();
        }, props.dismissTime)
      }
    })

    return () => {
      return (
            !hide.value ? 
            <Transition name="devui-alert" onAfterLeave={afterLeave}>
              <div ref={alertEl} v-show={!closing.value} class={`devui-alert devui-alert-${props.type} ${props.cssClass} ${ closing.value ? 'devui-alter-close': null }`}>
                {props.closeable ? 
                  <button type="button" class="devui-close" onClick={close}>
                    <AlertCloseIcon></AlertCloseIcon>
                  </button> : null
                }
                {props.showIcon !== false ? 
                  <span class="devui-alert-icon">
                    <AlertTypeIcon type={props.type}></AlertTypeIcon>
                  </span> : null
                }
                {ctx.slots.default?.()}
              </div> 
            </Transition>
            : null
      )
    }
  }
})
/* 

  
*/