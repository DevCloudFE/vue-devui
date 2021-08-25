import './slider.scss'

import { defineComponent,ref,computed,toRefs} from 'vue'
import { sliderProps, SliderProps } from './slider-types'
import { Input } from '../../input/index';

export default defineComponent({
  name: 'DSlider',
  components:{Input},
  props: sliderProps,
  emits: [],
  setup(props: SliderProps) {

    let isClick=true;

    let startPosition=0;
    //用以定位button的位置
    const currentPosition=ref<any>(0);
    //当前的位置以百分比显示
    const percentDispaly=ref<string>('')
    let currentX=0;
    let startX=0;
    
    //移动或者点击后的实际偏移的像素
    let pxOffset=0
    //输入后的值
    const inputValue=ref<number>(props.min)
    
    const newPostion=ref<any>(0)
    
    const renderShowInput=()=>{
      return  props.showInput? <d-input onInput={handleOnInput} value={inputValue.value+''}></d-input>:''
     }
  
  function handleonMousedown(event:MouseEvent){
    //props.disabled状态是不能点击拖拽的
    if(props.disabled) return
    //阻止默认事件
    event.preventDefault();
    dragStart(event);
    //当鼠标开始移动时，进行坐标计算
    window.addEventListener('mousemove',onDragging)
    //当鼠标抬起时，停止计算
    window.addEventListener('mouseup',onDragEnd)
    
  }


  function dragStart(event:MouseEvent){

    
    
    //防止mouseup触发父元素的click事件
    isClick=false;
    //获取当前的x坐标值
    startX=event.clientX;
    //把当前值给startPosition，以便后面再重新拖拽时,会以当前的位置计算偏移
    startPosition=currentPosition.value
    newPostion.value=startPosition
    

  }
  
 
  /**
   * 
   * @param event 鼠标事件
   * currentPosition:当前移动的X的坐标
   * offset:当前x坐标减去初始x坐标的偏移
   * 
   */
  function onDragging(event:MouseEvent){

    currentX=event.clientX;


    
    pxOffset=currentX-startX;
     //移动的x方向上的偏移+初始位置等于新位置
    newPostion.value=startPosition+pxOffset;

      setPostion(newPostion.value);
  }
  function onDragEnd(){
    //防止mouseup后立即执行click事件，mouseup后
    //会立即执行click,但是isClick=true 是100ms才出发，因此不会执行click事件，就跳出来了
    setTimeout(() => {
      isClick=true;
    }, 100);
    
    window.removeEventListener('mousemove',onDragging)
    window.removeEventListener('mouseup',onDragEnd)
  }

  function setPostion(newPosition:number){
    //获取slider的实际长度的像素
   const sliderWidth:number=document.querySelector('.devui-slider__runway').clientWidth

      if(newPosition<0){
        newPosition=0;
      }else if(newPosition>=sliderWidth){
        
       
        //当到达类似98%时,进行边界判定，设置值为100%
        currentPosition.value=sliderWidth
        inputValue.value=100
        percentDispaly.value= '100%'
     
        return
        
      }
      //计算slider的实际像素每段的长度
      const LengthPerStep=sliderWidth/((props.max-props.min)/props.step)
      //计算实际位移的取整段数
      const steps=Math.round(newPosition/LengthPerStep)
      
      
      //实际的偏移像素
      
      const value:number=steps*LengthPerStep
     
      
      //这个是向左偏移百分比的值
      percentDispaly.value= Math.round(value*100/sliderWidth)+'%'
    
   
      
      //更新输入框的值

      inputValue.value=Math.round(value*(props.max-props.min)/sliderWidth)+props.min
      //设置当前所在的位置
      currentPosition.value=value; 
      
       //比如props.max为50 setp等于3 滑到48时，再滑动不能到51
       
  }


  function handleClick(event){
    if(isClick){
      startX=event.target.getBoundingClientRect().left
      currentX=event.clientX
    
      
      
      setPostion(currentX-startX)
    }else
    {
      return
    }
  }
  //输入框内的值
  function handleOnInput(event) {
     inputValue.value=parseInt(event.target.value)
    if(!inputValue.value){
      inputValue.value=props.min
      percentDispaly.value='0%'
    }else{
      if(inputValue.value<props.min){
        inputValue.value=props.min;
      }
      if(inputValue.value>props.max){
        inputValue.value=props.max;
      }
      const re=/^(?:[1-9]?\d|100)$/;
      if(re.test(`${inputValue.value}`)){
       
        percentDispaly.value=(inputValue.value-props.min)*100/(props.max-props.min)+'%'
      }
    }
      
  }
    return ()=>(
      <div class="devui-slider"
      >
        {/* 整个的长度 */}
        <div class='devui-slider__runway'
        onClick={handleClick}
        >
          {/* 滑动后左边的进度条 */}
          <div class='devui-slider__bar'
          style={{width: percentDispaly.value}}
          ></div>
            <div class='devui-slider__button'
            // style={{left:newPostion+'px'}}
            style={{left:percentDispaly.value}}
            
            onMousedown={handleonMousedown}
            ></div>
        </div>
        <span class='devui-min_count'>{props.min}</span>
        <span class='devui-max_count'>{props.max}</span>
      
        {/* <d-input onInput={handleOnInput} value={inputValue.value}></d-input> */}
        {renderShowInput()}
        </div>
    
    )
  },
})
