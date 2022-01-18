import { defineComponent, reactive, ref, onMounted, onBeforeUnmount, renderSlot, useSlots} from 'vue'
import { tooltipProps } from './tooltip-types'
import './tooltip.scss'

export default defineComponent({
  name: 'DTooltip',
  props: tooltipProps,
  setup(props){
    const position = reactive({
        left: 0,
        top: 0
    })
    // 设置tooltip箭头的样式
    const arrowStyle = (attr, value)=>{
      document.getElementById('devui-arrow').style[attr] = value
    }

    const slotElement = ref(null)
    onMounted(()=>{
      slotElement.value.children[0].onmouseenter = function (){
        // 创建tooltip元素（外层容器、箭头、内容）
        const tooltip = document.createElement('div')
        const arrow = document.createElement('div')
        const tooltipcontent = document.createElement('div')
        // 设置tooltip的样式
        tooltip.classList.add('tooltip')
        arrow.classList.add('arrow')
        tooltipcontent.classList.add('tooltipcontent')
        // 设置tooltip的id
        arrow.id = 'devui-arrow'
        tooltip.id = 'devui-tooltip1'

        setTimeout(() => {
          document.getElementById('devui-tooltip').appendChild(tooltip)
          tooltip.appendChild(arrow)
          tooltip.appendChild(tooltipcontent)
          tooltipcontent.innerHTML = props.content

          tooltip.style.opacity = '1'
          tooltip.style.zIndex = '999'
          arrow.style.border = '5px solid transparent'
          switch(props.position){
            case 'top':
              position.left = (slotElement.value.children[0].offsetLeft - tooltip.offsetWidth / 2 + slotElement.value.children[0].offsetWidth / 2) - 5;
              position.top = slotElement.value.children[0].offsetTop - 10 - tooltipcontent.offsetHeight
              // 设置箭头的样式 
              // arrowStyle('borderTop', '5px solid rgb(70, 77, 110)')
              arrow.style.top = `${tooltipcontent.offsetHeight}px`
              arrow.style.left = `${tooltipcontent.offsetWidth/2 + 5}px`
              arrow.style.borderTop = '5px solid rgb(70, 77, 110)'
              break;
            case 'bottom':
              position.top = slotElement.value.children[0].offsetHeight + slotElement.value.children[0].offsetTop + 10
              position.left = (slotElement.value.children[0].offsetLeft + slotElement.value.children[0].offsetWidth/2 - tooltipcontent.offsetWidth/2) - 5;
                // 设置arrow.value的样式
              arrowStyle('borderBottom', '5px solid rgb(70, 77, 110)')
              arrow.style.top = '-10px'
              arrow.style.left = `${tooltipcontent.offsetWidth/2 + 5}px`
              arrow.style.borderBottom = '5px solid rgb(70, 77, 110)'
              break;
            case 'left':
              position.top = slotElement.value.children[0].offsetTop + slotElement.value.children[0].offsetHeight/2 - tooltipcontent.offsetHeight/2
              position.left = slotElement.value.children[0].offsetLeft - 20 - tooltipcontent.offsetWidth
              // 设置arrow.value的样式
              arrowStyle('borderLeft', '5px solid rgb(70, 77, 110)')
              arrow.style.left = `${tooltipcontent.offsetWidth + 10}px`
              arrow.style.top = `${tooltipcontent.offsetHeight/2 - 5}px`
              arrow.style.borderLeft = '5px solid rgb(70, 77, 110)'
              break;
            case 'right':
              // 设置tooltip 内容的样式
              position.left = slotElement.value.children[0].offsetLeft + slotElement.value.children[0].offsetWidth
              position.top = slotElement.value.children[0].offsetTop + slotElement.value.children[0].offsetHeight/2 - tooltipcontent.offsetHeight/2
              // 设置箭头的样式
              arrowStyle('borderRight', '5px solid rgb(70, 77, 110)')
              arrow.style.top = `${tooltipcontent.offsetHeight/2 - 5}px`
              arrow.style.left = '-0px'
              arrow.style.borderRight = '5px solid rgb(70, 77, 110)'
              break;
          }
          tooltip.style.top = position.top + 5 + 'px'
          tooltip.style.left = position.left + 'px'
        }, props.mouseEnterDelay)
      }
      slotElement.value.children[0].onmouseleave = function (){
        setTimeout(() => {
          document.getElementById('devui-tooltip1').removeChild(document.getElementById('devui-arrow'))
          document.getElementById('devui-tooltip').removeChild(document.getElementById('devui-tooltip1'))
        }, props.mouseLeaveDelay)
      }
    })

    onBeforeUnmount (()=>{
        slotElement.value.children[0].onmouseenter = null
        slotElement.value.children[0].onmouseleave = null
    })

    return ()=> {
      const defaultSlot = renderSlot(useSlots(), 'default')
      return (
        <div class="devui-tooltip" id='devui-tooltip'>
          <div class='slotElement' ref={slotElement}>
            {defaultSlot}
          </div>
        </div>
      )
    }
  }
});