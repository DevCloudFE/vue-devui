import {
  computed,
  defineComponent,
  Transition,
} from 'vue'
import { modalProps, ModalProps } from './modal-types'
import { FixedOverlay } from '../../overlay'
import './modal.scss';

export default defineComponent({
  name: 'DModal',
  props: modalProps,
  emits: ['onUpdate:modelValue'],
  setup(props: ModalProps, ctx) {
    const animatedVisible = computed(() => {
      return props.showAnimation ? props.modelValue : true;
    });

    // 处理取消事件
    const onVisibleChange = (value: boolean) => {
      const update = props['onUpdate:modelValue'];
      if (value) {
        update?.(value);
      } else {
        const beforeHidden = props.beforeHidden;
        const close = (enabledClose: boolean) => {
          if (enabledClose) {
            update?.(false);
            props.onClose?.();
          }
        }
        // true: 确认关闭
        // false: 仍然开启
        const result = (typeof beforeHidden === 'function' ? beforeHidden() : beforeHidden) ?? true;
        if (result instanceof Promise) {
          result.then(close);
        } else {
          close(result);
        }
      }
    }

    ctx.expose({ onVisibleChange });

    return () => (
      <FixedOverlay
        visible={props.modelValue}
        onUpdate:visible={onVisibleChange}
        backgroundClass="devui-modal-wrapper"
        // overlay feature
        // backgroundStyle={{ zIndex: props.backdropZIndex }}
        backgroundBlock={!props.bodyScrollable}
        backdropClose={props.backdropCloseable}
      >
        <Transition name="devui-modal-wipe">
          {animatedVisible.value ? ctx.slots.default?.() : null}
        </Transition>
      </FixedOverlay>
    )
  }
})

