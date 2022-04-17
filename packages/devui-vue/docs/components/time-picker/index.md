# TimePicker组件

时间选择器。

#### 何时使用

当用户需要输入一个时间，可以点击标准输入框，弹出面板进行选择

### 基本用法
:::demo
```vue
<template>
    <div>
      <h4 class='my-10'>basic</h4>
      <d-time-picker placeholder='请选择时间'/>
    </div>
    <div>
      <h4 class='my-10'>default open</h4>
      <d-time-picker v-model='vModelValue' :time-picker-width='300' :autoOpen='true'/>
    </div>
    <div>
      <h4 class='my-10'>disabled</h4>
      <d-time-picker disabled/>
    </div>
</template>

<script>
  import { ref,defineComponent,nextTick } from 'vue'
  export default defineComponent({
      setup(props,ctx){
        let vModelValue = ref('12:30:40')
        return{
          vModelValue
        }
      }
  })
</script>

<style>
.my-10{ margin:10px 0px;}
</style>
```
:::

### 时间区间限制
:::demo
```vue
<template>
    <div>
        <h4 class='my-10'>minTime</h4>
        <d-time-picker min-time='01:04:30'/>
    </div>
    <div>
        <h4 class='my-10'>maxTime</h4>
        <d-time-picker max-time='22:30:30' v-model='vModelValues'/>
    </div>
    <div>
        <h4 class='my-10'>maxTime && minTime</h4>
        <d-time-picker min-time='02:04:40' max-time='22:30:30' />
    </div>
</template>

<script>
  import { ref,defineComponent,watch } from 'vue'
  export default defineComponent({
      setup(props,ctx){
        let vModelValues = ref('23:30:20')

        return{
          vModelValues
        }
      }
  })
</script>

```
:::

### 格式化
:::demo
```vue
<template>
    <div>
        <h4 class='my-10'>hh:mm:ss</h4>
        <d-time-picker min-time='01:04:30' />
    </div>
    <div>
        <h4 class='my-10'>mm:HH:ss</h4>
        <d-time-picker format='mm:HH:ss' v-model="vModelValueFirst"/>
    </div>
    <div>
        <h4 class='my-10'>hh:mm</h4>
        <d-time-picker format='hh:mm'/>
    </div>
    <div>
        <h4 class='my-10'>MM:ss</h4>
        <d-time-picker format='MM:ss'/>
    </div>
</template>
<script>
  import { ref,defineComponent,watch } from 'vue'
  export default defineComponent({
      setup(props,ctx){
        let vModelValueFirst = ref('23:10:20')


        watch(vModelValueFirst,(newValue,oldValue)=>{
          console.log(newValue,oldValue)
        })

        return{
          vModelValueFirst
        }
      }
  })
</script>
```
:::

### 传入模板
:::demo
```vue
<template>
    <div>
        <h4 class='my-10'>自定义 customViewTemplate</h4>
        <d-time-picker ref='slotDemo'>
            <template v-slot:customViewTemplate>
                <div class='slot-box'>
                    <div class='slot-bottom' @click='chooseNowFun'>choose now</div>
                    <div class='slot-bottom' @click='chooseTime' >choose 23:00</div>
                </div>
            </template>
        </d-time-picker>
    </div>
</template>

<script>
import { ref,defineComponent,nextTick } from 'vue'

export default defineComponent({
    setup(props,ctx){
        let slotDemo = ref(null)

        const chooseTime = ()=>{
            let timeObj ={
                time:'23',
                type:'mm'
            }
            slotDemo.value.chooseTime(timeObj)
        }

        // 插槽内方法  --  选择当前时间
        const chooseNowFun = ()=>{
            let date = new Date()
            let hour = date.getHours()>9?date.getHours():'0'+date.getHours()
            let minute = date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes()
            let second = date.getSeconds()>9?date.getSeconds():'0'+date.getSeconds()
            let timeObj = {
                time: hour+':'+minute+':'+second
            }
            slotDemo.value.chooseTime(timeObj)
        }
        
        return{
            chooseNowFun,
            chooseTime,
            slotDemo
        }
    }
})
</script>

<style>
.slot-box{
    overflow:hidden;
    height:100%;
}
.slot-bottom{
    font-size:14px;
    cursor: pointer;
}
.slot-bottom:hover{
    color: #7693f5;
    text-decoration: underline;
}
</style>
```
:::

### 获取数据方式
:::demo
```vue
<template>
    <div>
        <h4 class='my-10'>selectedTimeChage</h4>
          <d-time-picker @selectedTimeChage='selectedTimeChage'/>
        <br>
          当前选中时间：<button @click='getNewTimeFun'>{{time1}}</button>
    </div>
    <div>
        <h4 class='my-10'>v-model</h4>
          <d-time-picker v-model='time2'/>
        <br>
          当前选中时间：<button @click='getNewTimeFun'>{{time2}}</button>
    </div>
</template>

<script>
import { ref,defineComponent,nextTick } from 'vue'

export default defineComponent({
  setup(props,ctx){
      let time1 = ref('')
      let time2 = ref('')

      // 返回选中的时间
      const selectedTimeChage =(timeValue)=>{
        time1.value = timeValue
      }

      return{
          selectedTimeChage,
          time1,time2
      }
  }
})
</script>
```
:::

### d-time-picker

d-time-picker 参数


|参数|类型|默认|说明|跳转 Demo|
|----|----|----|----|----|
|disabled| boolean |false|可选，禁用选择|[基本用法](#基本用法)
|timePickerWidth / time-picker-width |number|---| 可选，下拉框的宽度 |[基本用法](#基本用法)|
|autoOpen |boolean|false| 可选，初始化是否直接展开 |[基本用法](#基本用法)|
|format |string|'hh:mm:ss'|可选，传入格式化，控制时间格式|[格式化](#格式限制)|
|minTime / min-time|string|'00:00:00'|可选，限制最小可选时间|[格式化](#时间区间限制)|
|maxTime / max-time|string|'23:59:59'|可选，限制最大可选时间|[格式化](#时间区间限制)|
|customViewTemplate|TemplateRef|--|可选，自定义快捷设置时间或自定义操作区内容|[传入模板](#传入模板)|
|showAnimation|boolean| true |可选，是否开启动画|✔|

d-time-picker 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|selectedTimeChange|EventEmitter|可选，确定的时候会发出新激活的子项的数据|[基本用法](#获取数据方式)|

