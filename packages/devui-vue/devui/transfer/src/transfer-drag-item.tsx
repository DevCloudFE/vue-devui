import { defineComponent, ref, onUnmounted } from 'vue';
import transferDragProps, { TransferDragProps } from '../common/use-transfer-drag';
import DTransfeCheckbox from './transfer-checkbox';
import '@devui-design/icons/icomoon/devui-icon.css';

export default defineComponent({
  name: 'DTransferDrag',
  components: {
    DTransfeCheckbox
  },
  props: transferDragProps,
  setup(props: TransferDragProps) {
    /** data start **/
    const dragRef = ref(null);
    const dragHighlight = ref(false);
    const dragOverNodeKey = ref('');
    const dropPosition = ref(null);
    const dragTimer = ref(null);
    /** data end **/

    /** watch start **/
    /** watch end **/

    /** methods start **/
    /**
         * calcDropPosition: 根据event计算位置
         * event: event对象
        */
    const calcDropPosition = (event): number => {
      const { clientY } = event;
      const { top, bottom, height } = dragRef.value.getBoundingClientRect();
      const des = Math.max(height * 0.25, 2);

      if (clientY <= top + des) {
        return -1;
      }
      if (clientY >= bottom - des) {
        return 1;
      }
      return 0;
    };
    /**
         * resetState: 重置属性
        */
    const resetState = () => {
      dragOverNodeKey.value = '';
      dropPosition.value = null;
      dragHighlight.value = null;
    };
    /** methods end **/

    /** 生命周期 start **/
    onUnmounted(() => {
      clearTimeout(dragTimer.value);
    });
    /** 生命周期 end **/

    return () => {
      const state = dragOverNodeKey.value === props.itemData.key;
      return (
        <div class={{
          'devui-transfer-panel-body-list-item': true,
          'devui-transfer-drag-dragging': dragHighlight.value,
          'devui-transfer-drag-over': state && dropPosition.value === 0,
          'devui-transfer–drag-over-top': state && dropPosition.value === -1,
          'devui-transfer–drag-over-bottom': state && dropPosition.value === 1,
        }}
        onDragenter={event => {
          event.preventDefault();
          event.stopPropagation();
          clearTimeout(dragTimer.value);
          const curDropPosition = calcDropPosition(event);
          if (props.itemData.key === dragOverNodeKey.value && curDropPosition === 0) {
            resetState();
            return;
          }
          dragTimer.value = setTimeout(() => {
            dragOverNodeKey.value = props.itemData.key;
            dropPosition.value = curDropPosition;
          }, 0);
          props.onDragenter && props.onDragenter(event, props.itemData);
        }}
        onDragover={event => {
          event.preventDefault();
          event.stopPropagation();
          if (props.itemData.key === dragOverNodeKey.value) {
            const curDropPosition = calcDropPosition(event);
            if (curDropPosition === dropPosition.value) {
              return;
            }
            dropPosition.value = curDropPosition;
          }
          props.onDragover && props.onDragover(event, props.itemData);
        }}
        onDragleave={event => {
          event.stopPropagation();
          resetState();
          props.onDragleave && props.onDragleave(event, props.itemData);
        }}
        onDrop={event => {
          event.preventDefault();
          event.stopPropagation();
          resetState();
          props.onDrop && props.onDrop(event, props.itemData);
        }}
        onDragend={event => {
          event.stopPropagation();
          props.onDragend && props.onDragend(event, props.itemData);
        }}>
          <div
            class="devui-transfer-panel-body-list-drag"
            draggable={true}
            ref={dragRef}
            onDragstart={event => {
              event.stopPropagation();
              dragHighlight.value = true;
              props.onDragstart && props.onDragstart(event, props.itemData);
            }}
          >
            <span class="devui-transfer-panel-body-list-drag__icon">
              <d-icon name="drag-small" />
            </span>
            <DTransfeCheckbox
              data={props.itemData}
              id={props.id}
              showTooltip={props.showTooltip}
              tooltipPosition={props.tooltipPosition}>
            </DTransfeCheckbox>
          </div>
        </div>
      );
    };
  }
});
