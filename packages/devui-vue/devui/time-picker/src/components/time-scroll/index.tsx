import { defineComponent, onBeforeUnmount, onMounted, onUnmounted } from 'vue';
import { TimePickerProps, timePickerProps } from '../../time-picker-types';
import useTimeScroll from './composables/use-time-scroll';

import './index.scss';

export default defineComponent({
  name:'DTimeScroll',
  props:timePickerProps,
  setup(props,ctx){
    const {
      scrollBoxDom,
      scrollThumbDom,
      scrollTrackDom,
      scrollContentDom,isDown,
      getScrollHeight,
      setVirtualScroll,
      clickTrackFun,
      mouseDownThum,
      mouseOutThum,
      thumbMouseMove,
      getScrollWidth
    }=useTimeScroll();
    const marginRight = getScrollWidth();

    onMounted(()=>{
      getScrollWidth();
      getScrollHeight();
      scrollBoxDom.value.addEventListener('click',setVirtualScroll);
      scrollContentDom.value.addEventListener('scroll',setVirtualScroll);
      scrollThumbDom.value.addEventListener('mousedown',mouseDownThum);
      document.addEventListener('mouseup',mouseOutThum);
      document.addEventListener('mousemove',thumbMouseMove);
    });
    onBeforeUnmount(()=>{
      scrollBoxDom.value.removeEventListener('click',setVirtualScroll);
      scrollContentDom.value.removeEventListener('scroll',setVirtualScroll);
      scrollThumbDom.value.removeEventListener('mousedown',mouseDownThum);
    });
    onUnmounted(()=>{
      document.removeEventListener('mouseup',mouseOutThum);
      document.removeEventListener('mousemove',thumbMouseMove);
    });

    return()=>{
      return (
        <>
          <div ref={scrollBoxDom} class="devui-scroll-box">
            <div ref={scrollContentDom} class={`box-content ${ isDown.value || !props.showAnimation ? 'box-content-behavior-auto':''}`}
              style={{'margin-right': marginRight + 'px'}}>
              {
                ctx.slots.default?.()
              }
            </div>

            <div ref={scrollTrackDom} class="box-sroll" onClick={clickTrackFun}>
              <div ref={scrollThumbDom} class="scroll-child"></div>
            </div>
          </div>
        </>
      );
    };
  }
});
