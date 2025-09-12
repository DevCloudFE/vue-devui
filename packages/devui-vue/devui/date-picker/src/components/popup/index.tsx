import { defineComponent, reactive, renderSlot, ref, useSlots, onMounted, onUnmounted, onBeforeUpdate } from 'vue';
import { EventManager, isIn, traceNode, invokeFunction } from '../../utils';
import {
  handlePositionFactory,
  getAttachInputDom,
} from '../../helper';
import { datePickerPopupProps, DatePickerPopupProps } from '../../date-picker-types';

import './index.scss';

type TState = {
  x?: string;
  y?: string;
  attachInputDom?: string;
  show: boolean;
  st: boolean;
};

export default defineComponent({
  name: 'DDatePickerPopup',
  props: datePickerPopupProps,
  setup(props: DatePickerPopupProps) {

    const container = ref<Element | null>(null);
    const evtman = new EventManager();
    const state = reactive<TState>({
      x: '0',
      y: '0',
      st: true,
      show: !!props.show,
    });

    let el: Element | null = null;

    // 弹出层跟踪
    const handlePosition = handlePositionFactory(state, props, container);

    onBeforeUpdate(() => {
      state.show = !!props.show;
    });

    onMounted(() => {
      // 获取绑定节点（默认input）
      el = getAttachInputDom(props);
      // 绑定节点不存在，作为普通组件展示。
      if (!el) {
        state.st = true;
        state.show = true;
        return;
      } else {
        state.show = false;
        state.st = false;
      }

      invokeFunction(props.onBinding);

      // 绑定节点click事件处理弹出层显示
      evtman.append(el, 'click', () => {
        if(!state.show) {
          state.show = true;
          invokeFunction(props.onOpen);
        }
      });
      // document层处理`点击其他区域隐藏`
      evtman.append(document, 'click', (e: Event) => {
        if (!state.show || e.target === el || isIn(e.target as Node, container.value)) {
          return;
        }
        state.show = false;
        invokeFunction(props.onClosed);
        // reset()
      });
      // 对绑定节点做scroll跟踪，并绑定跟踪事件
      traceNode(el).forEach(node => {
        evtman.append(node, 'scroll', handlePosition);
      });
    });

    onUnmounted(() => {
      evtman.dispose();
    });

    return () => {
      const defaultSlot = renderSlot(useSlots(), 'default');
      if (state.st) {
        return defaultSlot;
      }
      handlePosition();
      return (
        <div class="devui-datepicker-popup">
          <div
            ref={container}
            class="popup-tracing"
            style={{
              transform: `translateX(${state.x}) translateY(${state.y})`
            }}
          >{defaultSlot}</div>
        </div>
      );
    };
  }
});
