import { defineComponent, ref, computed, onMounted } from 'vue';
import { sliderProps } from './slider-types';
import './slider.scss';

export default defineComponent({
  name: 'DSlider',
  props: sliderProps,
  emits: ['update:modelValue'],
  setup(props, ctx) {
    let isClick = true;
    let startPosition = 0;
    let startX = 0;

    const popoverShow = ref(false);
    const sliderRunway = ref<HTMLDivElement>(null);
    const inputValue = ref<number>(props.modelValue);
    const currentPosition = ref<number>(0);
    const newPostion = ref<number>(0);
    //当前的位置以百分比显示
    const percentDispaly = ref<string>('');
    const renderShowInput = () => {
      return props.showInput ? (
        <div class='devui-input__out-wrap'>
          <input onInput={handleOnInput} value={inputValue.value + ''}></input>
        </div>
      ) : (
        ''
      );
    };
    //当传入modelValue时用以定位button的位置
    if (props.modelValue > props.max) {
      percentDispaly.value = '100%';
    } else if (props.modelValue < props.min) {
      percentDispaly.value = '0%';
    } else {
      percentDispaly.value = ((props.modelValue - props.min) * 100) / (props.max - props.min) + '%';
    }
    //一挂载就进行当前位置的计算，以后的移动基于当前的位置移动
    onMounted(() => {
      const sliderWidth = sliderRunway.value.clientWidth;
      currentPosition.value = (sliderWidth * (inputValue.value - props.min)) / (props.max - props.min);
    });
    function handleButtonMousedown(event: MouseEvent) {
      popoverShow.value = true;
      //props.disabled状态是不能点击拖拽的
      if (props.disabled) return;
      //阻止默认事件
      event.preventDefault();
      dragStart(event);
      //当鼠标开始移动时，进行坐标计算
      window.addEventListener('mousemove', onDragging);
      //当鼠标抬起时，停止计算
      window.addEventListener('mouseup', onDragEnd);
    }
    function dragStart(event: MouseEvent) {
      //防止mouseup触发父元素的click事件
      isClick = false;
      //获取当前的x坐标值
      startX = event.clientX;
      //把当前值给startPosition，以便后面再重新拖拽时,会以当前的位置计算偏移
      startPosition = currentPosition.value;
      newPostion.value = startPosition;
    }
    /**
     *
     * @param event 鼠标事件
     * currentPosition:当前移动的X的坐标
     * offset:当前x坐标减去初始x坐标的偏移
     *
     */
    function onDragging(event: MouseEvent) {
      popoverShow.value = true;
      const currentX = event.clientX;
      const pxOffset = currentX - startX;
      //移动的x方向上的偏移+初始位置等于新位置
      newPostion.value = startPosition + pxOffset;
      setPostion(newPostion.value);
    }
    function onDragEnd() {
      popoverShow.value = false;
      //防止mouseup后立即执行click事件，mouseup后
      //会立即执行click,但是isClick=true 是100ms才出发，因此不会执行click事件，就跳出来了
      setTimeout(() => {
        isClick = true;
      }, 100);
      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('mouseup', onDragEnd);
    }
    function setPostion(newPosition: number) {
      //获取slider的实际长度的像素
      const sliderWidth: number = Math.round(sliderRunway.value.clientWidth);
      if (newPosition < 0) {
        newPosition = 0;
      }
      //计算slider的实际像素每段的长度
      const LengthPerStep = sliderWidth / ((props.max - props.min) / props.step);
      //计算实际位移的取整段数
      const steps = Math.round(newPosition / LengthPerStep);
      //实际的偏移像素
      const value: number = steps * LengthPerStep;
      //要是刚好划过半段切刚好超出最大长度的情况进行限定
      if (Math.round(value) >= sliderWidth) {
        currentPosition.value = sliderWidth;
        inputValue.value = props.max;
        percentDispaly.value = '100%';
        ctx.emit('update:modelValue', props.max);
        return;
      }
      //向左偏移百分比的值
      percentDispaly.value = Math.round((value * 100) / sliderWidth) + '%';
      //更新输入框的值
      inputValue.value = Math.round((value * (props.max - props.min)) / sliderWidth) + props.min;
      //设置当前所在的位置
      currentPosition.value = newPosition;
      ctx.emit('update:modelValue', inputValue.value);
    }
    //当在滑动条触发鼠标事件时处理,
    function handleRunwayMousedown(event) {
      if (!props.disabled && isClick) {
        startX = event.target.getBoundingClientRect().left;
        const currentX = event.clientX;
        setPostion(currentX - startX);
        handleButtonMousedown(event);
      } else {
        return;
      }
    }
    //输入框内的值
    function handleOnInput(event) {
      inputValue.value = parseInt(event.target.value);
      if (!inputValue.value) {
        inputValue.value = props.min;
        percentDispaly.value = '0%';
      } else {
        if (inputValue.value < props.min || inputValue.value > props.max) {
          return
        }
        const re = /^(?:[1-9]?\d|100)$/;
        if (re.test(`${inputValue.value}`)) {
          percentDispaly.value = ((inputValue.value - props.min) * 100) / (props.max - props.min) + '%';
          ctx.emit('update:modelValue', inputValue.value);
        }
      }
    }
    //添加disabled类
    const disableClass = computed(() => {
      return props.disabled ? ' disabled' : '';
    });
    const popover = () => {
      return (
        <div class='devui-slider_popover' style={{ left: percentDispaly.value, opacity: popoverShow.value ? 1 : 0 }}>
          <div class='devui-slider_popover-arrow'></div>
          <div class='devui-slider_popover-content'>{inputValue.value + ' ' + props.tipsRenderer}</div>
        </div>
      );
    };
    return () => (
      <div class='devui-slider'>
        {/* 整个的长度 */}
        <div
          ref={sliderRunway} class={'devui-slider__runway' + disableClass.value}
          onMousedown={handleRunwayMousedown}
          onMouseout={() => (popoverShow.value = false)}
        >
          {/* 滑动后左边的进度条 */}
          <div class={'devui-slider__bar' + disableClass.value} style={{ width: percentDispaly.value }}></div>
          <div
            class={'devui-slider__button' + disableClass.value}
            style={{ left: percentDispaly.value }}
            onMousedown={handleButtonMousedown}
            onMouseenter={() => (popoverShow.value = true)}
            onMouseout={() => (popoverShow.value = false)}
          ></div>
          {props.tipsRenderer === 'null' ? '' : popover()}
        </div>
        <span class='devui-min_count'>{props.min}</span>
        <span class='devui-max_count'>{props.max}</span>
        {renderShowInput()}
      </div>
    );
  },
});
