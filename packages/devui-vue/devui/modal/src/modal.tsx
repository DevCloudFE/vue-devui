import { defineComponent, ref, watch, computed, Teleport, Transition, nextTick } from 'vue';
import { modalProps, type ModalProps } from './model-types';
import { FixedOverlay } from '../../overlay';
import DIcon from '../../icon/src/icon';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './modal.scss';
import { useDraggable } from './useDraggable';

export interface Position {
  x: number;
  y: number;
}

export default defineComponent({
  name: 'DModal',
  components: {
    DFixedOverlay: FixedOverlay,
    DIcon,
  },
  props: modalProps,
  emits: ['update:modelValue', 'open', 'close'],
  setup(props: ModalProps, { slots, emit }) {
    const ns = useNamespace('modal');
    const visivle = ref<boolean>(false);
    const dialogRef = ref<HTMLElement>();
    const headerRef = ref<HTMLElement>();

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
    };

    const modalWidth = computed(() => {
      if (typeof props.width === 'number') {
        return props.width + 'px';
      } else {
        if (props.width.endsWith('%')) {
          return props.width;
        } else {
          return props.width + 'px';
        }
      }
    });

    const close = () => {
      if (props.beforeClose) {
        const hide = () => {
          emit('update:modelValue', false);
        };
        props.beforeClose?.(hide);
      } else {
        emit('update:modelValue', false);
      }
    };

    const handleClose = () => {
      close();
    };

    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          emit('open');
          nextTick(() => {
            if (dialogRef.value) {
              dialogRef.value.scrollTop = 0;
            }
          });
        } else {
          emit('close');
        }
        visivle.value = val as boolean;
      },
      { immediate: true }
    );

    watch(
      () => visivle.value,
      (val) => {
        emit('update:modelValue', val);
      }
    );
    const draggable = computed(() => props.draggable);
    useDraggable(dialogRef, headerRef, draggable);
    return () => {
      return (
        <Teleport to="body" disabled={!props.appendToBody}>
          <d-fixed-overlay
            class={ns.e('overlay')}
            v-model={visivle.value}
            closeOnClickOverlay={props.closeOnClickOverlay}></d-fixed-overlay>
          <Transition name={ns.m('wipe')}>
            <div v-show={visivle.value} class={ns.e('content')}>
              <div onClick={(e) => handleClick(e)} style={{ width: modalWidth.value }} class={ns.e('content-wrap')} ref={dialogRef}>
                <div class={ns.e('content-header')} ref={headerRef} style={{ cursor: props.draggable ? 'move' : 'default' }}>
                  <div>{slots.title ? slots.title?.() : props.title ? <div>{props.title}</div> : null}</div>
                  {props.showClose ? (
                    <div onClick={handleClose} class={ns.e('content-header-close')}>
                      <d-icon name="close"></d-icon>
                    </div>
                  ) : null}
                </div>
                <div class={ns.e('content-body')}>{slots?.default?.()}</div>
                <div class={ns.e('content-footer')}>{slots?.footer?.()}</div>
              </div>
            </div>
          </Transition>
        </Teleport>
      );
    };
  },
});
