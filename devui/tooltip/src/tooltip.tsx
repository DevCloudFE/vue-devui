import './tooltip.scss'

import { defineComponent, onMounted, } from 'vue'
import { tooltipProps, TooltipProps } from './tooltip-types'
import EventListener from '../utils/EventListener'

/**
 *   使用： <d-tooltip position='top'>
 *              <button>上面</button>
 *          </d-tooltip>
 */
export default defineComponent({
  name: 'DTooltip',
  props: tooltipProps,
  emits: [],
  data (){
    return {
      position: {
        top: 0,
        left: 0
      },
      show: false
    }
  },
  methods: {
    // 延迟演示 默认100ms
    delayShowTrue (fn, delay){
      let start;
      if (parseInt(delay)>=0){
        return function (){
          if (start){
            clearTimeout(start);
          }
          start = setTimeout(fn, parseInt(delay));
        };
      } else{
        console.error('the value of delay is bigger than 0 and the type of delay must be string!');
        return 
      }
    },
    // 延迟消失，默认150ms
    delayShowFalse (fn, delay){
      if (this.show && parseInt(delay) >= 0){
        setTimeout(fn, parseInt(delay));
      }
    }
  },
  watch: {
    show: function (newValue){
      if (newValue){
        // 鼠标悬浮为true，显示提示框
        this.$refs.tooltip.style.opacity = '1';
        const popover = this.$refs.tooltip;                 // 获取提示框组件
        const arrow = this.$refs.arrow;                     // 提示框组件箭头
        const triger = this.$refs.slotElement.children[0]   // slot元素
        // 具体的判定规则
        switch (this.props.position){
          case 'top':
            // 设置 tooltip 内容的样式
            this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2;
            this.position.top = `${triger.offsetTop - 10 - this.$refs.tooltipcontent.offsetHeight}`;
            // 设置箭头的样式 
            arrow.style.borderLeft = '10px solid transparent';
            arrow.style.borderRight = '10px solid transparent';
            arrow.style.borderBottom = '10px solid transparent';
            arrow.style.borderTop = '10px solid cornflowerblue';
            arrow.style.top = `${this.$refs.tooltipcontent.offsetHeight}px`;
            arrow.style.left = `${this.$refs.tooltipcontent.offsetWidth/2 - 5}px`;
            break;
          
          case 'right':
            // 设置tooltip 内容的样式
            this.position.left = triger.offsetLeft + triger.offsetWidth;
            this.position.top = triger.offsetTop + triger.offsetHeight/2 - this.$refs.tooltipcontent.offsetHeight/2;
            // 设置箭头的样式
            arrow.style.borderLeft = '10px solid transparent';
            arrow.style.borderRight = '10px solid cornflowerblue';
            arrow.style.borderBottom = '10px solid transparent';
            arrow.style.borderTop = '10px solid transparent';
            arrow.style.top = `${this.$refs.tooltipcontent.offsetHeight/2 - 10}px`;
            arrow.style.left = '-10px';
            break;

          case 'bottom':
            // 设置tooltip的样式
            this.position.top = `${triger.offsetHeight + triger.offsetTop + 10}`;
            this.position.left = `${triger.offsetLeft + triger.offsetWidth/2 - this.$refs.tooltipcontent.offsetWidth/2}`;
             // 设置arrow的样式
            arrow.style.borderBottom = '10px solid orange';
            arrow.style.borderRight = '10px solid transparent';
            arrow.style.borderTop = '10px solid transparent';
            arrow.style.borderLeft = '10px solid transparent';
            arrow.style.top = `${-20}px`;
            arrow.style.left = `${this.$refs.tooltipcontent.offsetWidth/2 - 10}px`;
            break;

          case 'left':
            this.position.top = `${triger.offsetTop + triger.offsetHeight/2 - this.$refs.tooltipcontent.offsetHeight/2}`;
            this.position.left = `${triger.offsetLeft - 20 - this.$refs.tooltipcontent.offsetWidth}`;
            // 设置arrow的样式
            arrow.style.borderLeft = '10px solid cornflowerblue';
            arrow.style.borderRight = '10px solid transparent';
            arrow.style.borderBottom = '10px solid transparent';
            arrow.style.borderTop = '10px solid transparent';
            arrow.style.left = `${this.$refs.tooltipcontent.offsetWidth + 10}px`
            arrow.style.top = `${this.$refs.tooltipcontent.offsetHeight/2 - 10}px`;
            break;

          default:
            console.error('The attribute position value is wrong, the value is one of top、right、left、bottom');
            break;
        };
        popover.style.top = this.position.top + 'px';
        popover.style.left = this.position.left + 'px';
      } else {
        this.position.top = 0;
        this.position.left = 0;
        // 鼠标移走为false，隐藏提示框
        this.$refs.tooltip.style.opacity = '0';
      }
    }
  },
  mounted (){
    const self = this;
    const slotEle = this.$refs.slotElement.children[0];
    // 初次渲染不显示
    if (!show){
      this.$refs.tooltip.style.opacity = '0';
    }
    // 注册鼠标引入事件
    this.enterEvent = EventListener.listen(slotEle, 'mouseenter', self.delayShowTrue(function (){
      self.show = true;
    }, self.mouseEnterDelay || 100));

    // 注册鼠标移除事件
    this.leaveEvent = EventListener.listen(slotEle, 'mouseleave', self.delayShowFalse(function (){
      self.show = false;
    },self.mouseLeaveDelay || 150));

  },
  beforeUnmount (){
    this.enterEvent.remove();
    this.leaveEvent.remove();
  },
  render() {
    const {} = this

    return (
      <div class="d-tooltip">
        <div class='slotElement' ref='slotElement'>
          <slot></slot>
        </div>                                                           /** slot 元素 */
        <div class='tooltip'     ref='tooltip'>                          /** tooltip 提示框 */
          <div class='arrow' ref='arrow'></div>                          /** tooltip 提示框箭头 */
          <div class='tooltipcontent' ref='tooltipcontent'>
          {{content}}  
          </div>                                                         /** tooltip提示的内容 */
        </div>
      </div>
    );
  }
})
