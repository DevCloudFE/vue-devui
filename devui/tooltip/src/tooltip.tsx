import './tooltip.scss'

import { defineComponent, reactive, ref, watch, onMounted, getCurrentInstance, onBeforeUnmount, renderSlot, useSlots} from 'vue'
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
    setup(props, ctx){
        let position = reactive({
            left: 0,
            top: 0
        });
        let show = ref(false);

        // slotElement元素的ref
        let slotElement = ref(null); 
        // tooltip元素的引用
        let tooltip = ref(null);
        // arrow元素的引用
        let arrow = ref(null);
        // tooltipcontent的引用
        let tooltipcontent = ref(null);

        let enterEvent;
        let leaveEvent;

        // 延迟显示
        const delayShowTrue = function (fn, delay){
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
        };
        // 延迟消失
        const delayShowFalse = function (fn, delay){
            if (show.value && parseInt(delay) >= 0){
              setTimeout(fn, parseInt(delay));
            }
        };

        onMounted(()=>{
            // 组件初始化不渲染tooltip
            if (!show.value){
                tooltip.value.style.opacity = '0';
            };

            // 注册鼠标引入事件
            enterEvent = EventListener.listen(slotElement.value.children[0], 'mouseenter', function (){
                show.value = true;
            });

            // 注册鼠标移除事件
            leaveEvent = EventListener.listen(slotElement.value.children[0], 'mouseleave', function (){
                show.value = false;
            });
        });

        watch(show, function (newValue, oldValue){
            if (newValue){
                // 鼠标悬浮为true，显示提示框
                tooltip.value.style.opacity = '1';
                tooltip.value.style.zIndex = '500';
                // 具体的判定规则
                switch (props.position){
                  case 'top':
                    // 设置 tooltip 内容的样式
                    position.left = slotElement.value.children[0].offsetLeft - tooltip.value.offsetWidth / 2 + slotElement.value.children[0].offsetWidth / 2;
                    position.top = slotElement.value.children[0].offsetTop - 10 - tooltipcontent.value.offsetHeight;
                    // 设置箭头的样式 
                    arrow.value.style.borderLeft = '10px solid transparent';
                    arrow.value.style.borderRight = '10px solid transparent';
                    arrow.value.style.borderBottom = '10px solid transparent';
                    arrow.value.style.borderTop = '10px solid cornflowerblue';
                    arrow.value.style.top = `${tooltipcontent.value.offsetHeight}px`;
                    arrow.value.style.left = `${tooltipcontent.value.offsetWidth/2 - 5}px`;
                    break;
                  
                  case 'right':
                    // 设置tooltip 内容的样式
                    position.left = 0;
                    position.top = 0;
                    position.left = slotElement.value.children[0].offsetLeft + slotElement.value.children[0].offsetWidth;
                    position.top = slotElement.value.children[0].offsetTop + slotElement.value.children[0].offsetHeight/2 - tooltipcontent.value.offsetHeight/2;
                    // 设置箭头的样式
                    arrow.value.style.borderLeft = '10px solid transparent';
                    arrow.value.style.borderRight = '10px solid cornflowerblue';
                    arrow.value.style.borderBottom = '10px solid transparent';
                    arrow.value.style.borderTop = '10px solid transparent';
                    arrow.value.style.top = `${tooltipcontent.value.offsetHeight/2 - 10}px`;
                    arrow.value.style.left = '-10px';
                    break;
        
                  case 'bottom':
                    // 设置tooltip的样式
                    position.top = slotElement.value.children[0].offsetHeight + slotElement.value.children[0].offsetTop + 10;
                    position.left = slotElement.value.children[0].offsetLeft + slotElement.value.children[0].offsetWidth/2 - tooltipcontent.value.offsetWidth/2;
                     // 设置arrow.value的样式
                    arrow.value.style.borderBottom = '10px solid orange';
                    arrow.value.style.borderRight = '10px solid transparent';
                    arrow.value.style.borderTop = '10px solid transparent';
                    arrow.value.style.borderLeft = '10px solid transparent';
                    arrow.value.style.top = `${-20}px`;
                    arrow.value.style.left = `${tooltipcontent.value.offsetWidth/2 - 10}px`;
                    break;
        
                  case 'left':
                    position.top = slotElement.value.children[0].offsetTop + slotElement.value.children[0].offsetHeight/2 - tooltipcontent.value.offsetHeight/2;
                    position.left = slotElement.value.children[0].offsetLeft - 20 - tooltipcontent.value.offsetWidth;
                    // 设置arrow.value的样式
                    arrow.value.style.borderLeft = '10px solid cornflowerblue';
                    arrow.value.style.borderRight = '10px solid transparent';
                    arrow.value.style.borderBottom = '10px solid transparent';
                    arrow.value.style.borderTop = '10px solid transparent';
                    arrow.value.style.left = `${tooltipcontent.value.offsetWidth + 10}px`
                    arrow.value.style.top = `${tooltipcontent.value.offsetHeight/2 - 10}px`;
                    break;
        
                  default:
                    console.error('The attribute position value is wrong, the value is one of top、right、left、bottom');
                    break;
                };

                tooltip.value.style.top = position.top + 'px';
                tooltip.value.style.left = position.left + 'px';
              } else {
                position.top = 0;
                position.left = 0;
                // 鼠标移走为false，隐藏提示框
                tooltip.value.style.opacity = '0';
              }
        });

        onBeforeUnmount (()=>{
            enterEvent.remove();
            leaveEvent.remove();
        });

        return ()=>{
          const defaultSlot = renderSlot(useSlots(), 'default');
          return (
            <div class="d-tooltip">
                <div class='slotElement' ref={slotElement}>
                    {defaultSlot}
                </div>                                                                        
                <div class='tooltip'  ref={tooltip}>                          {/** tooltip 提示框 */}
                  <div class='arrow'  ref={arrow}></div>                           {/** tooltip 提示框箭头 */}
                  <div class='tooltipcontent' ref={tooltipcontent}>      {/** tooltip提示的内容 */}
                      {props.content}
                  </div>                                                                     
                </div>
            </div>
          )
        }
    }
});