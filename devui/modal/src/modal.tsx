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
        props.onClose?.();
        const beforeHidden = props.beforeHidden;
        if (beforeHidden instanceof Promise) {
          beforeHidden.then((visible) => {
            update?.(visible);
          });
        } else {
          const visible = beforeHidden?.() ?? false;
          update?.(visible);
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

