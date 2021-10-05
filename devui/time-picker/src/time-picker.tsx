import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue'
import { TimePickerProps, timePickerProps } from './time-picker-types'
import { Icon } from '../../icon'
import usePicker from './composables/use-popup'
import TimePopup from './components/time-popup/index'

import './time-picker.scss'

export default defineComponent({
  name: 'DTimepicker',
  components: { TimePopup },
  props: timePickerProps,
  emits: ['selectedTimeChage','update:modelValue'],
  setup(props: TimePickerProps, ctx) {

    const activeHour = ref('00')
    const activeMinute = ref('00')
    const activeSecond = ref('00')
    const format = props.format.toLowerCase()

    const { 
      isActive,
      showPopup,
      devuiTimePicker,
      inputDom,
      left,top,
      showClearIcon,
      firsthandActiveTime,
      chooseTime,
      getTimeValue,
      clickVerifyFun,
      isOutOpen,
      clearAll,
      timePopupDom,
      vModeValue,
      getPopupPosition
    } = usePicker(activeHour,activeMinute,activeSecond,props.minTime,format,props.autoOpen,props.disabled,props.modelValue)


    const selectedTimeChage = (e:MouseEvent) => {
      isActive.value = false
      showPopup.value = false
      ctx.emit('selectedTimeChage', vModeValue.value)
    }

    onMounted(() => {
      getPopupPosition()
      isOutOpen()
      document.addEventListener('click', clickVerifyFun)
      document.addEventListener('click',getTimeValue)
      document.addEventListener('scroll',getPopupPosition)
      window.addEventListener('resize',getPopupPosition)
    })
    onUnmounted(() => {
      document.removeEventListener('click', clickVerifyFun)
      document.removeEventListener('click',getTimeValue)
      document.removeEventListener('scroll',getPopupPosition)
      window.removeEventListener('resize',getPopupPosition)
    })

    watch(vModeValue,(newValue:string)=>{
      ctx.emit('update:modelValue',vModeValue.value)
      if(newValue != props.minTime){
        showClearIcon.value = true
      }else{
        showClearIcon.value = false
      }
    })

    ctx.expose({
      clearAll,chooseTime
    })

    return () => {
      return (
        <>
          <div class={`devui-time-picker ${isActive.value ? 'time-picker-active' : ''} ${props.disabled ? 'picker-disabled' : ''}`}
               ref={devuiTimePicker}
           >
            <TimePopup 
              ref={timePopupDom}
              showPopup={showPopup.value} 
              popupTop={top.value} 
              popupLeft={left.value} 
              popupWidth={props.timePickerWidth}
              popupFormat={ props.format.toLowerCase() }
              minTime={props.minTime}
              maxTime={props.maxTime}
              bindData={firsthandActiveTime.value}
              onSubData={selectedTimeChage}
            >
              {
                ctx.slots.customViewTemplate?.()
              }
            </TimePopup>
            <input ref={inputDom}
              type="text"
              value={vModeValue.value}
              placeholder={`${props.placeholder}`}
              disabled={props.disabled}
              class='time-input' />
            <div class='time-input-icon'>
              <div onClick={clearAll}>
                {
                  showClearIcon.value
                    ? <Icon size="small" name="close" /> 
                    :''
                }
              </div>
              <div>
                <Icon size="small" name="time" />
              </div>
            </div>
          </div>
        </>
      )
    }
  }
})
