<style lang="scss">
.devui-datepicker-demo {
    margin: 10px 0px;
    padding: 10px 0px;

    label {
        border: 1px solid #aaa;
        padding: 0px 5px;
        height: 2em;
        line-height: 2em;
        display: inline-block;
        margin: 5px;
        font-size: 14px;
        border-radius: 5px;
        user-select: none;
        cursor: pointer;

        input[type=checkbox] {
            transform: translateY(1px);
            margin-left: 3px;
        }
    }

    .input-binder {
        width: 300px;
        padding: 5px;
        font-size: 16px;
        border-radius: 5px;
    }
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const range = ref<boolean>(false)
    const rangeSwitch = () => range.value = !range.value

    const range2 = ref<boolean>(false)
    const rangeSwitch2 = () => range2.value = !range2.value

    const showTime = ref<boolean>(false)
    const showTimeSwitch = () => showTime.value = !showTime.value

    const spliter = ref<boolean>('-')
    const setSpliter = (v: string) => spliter.value = v

    const handleRangeChange = (e: Event) => {
        const { selectedIndex, value } = e.target
        setSpliter(value)
    }

    return {
      range,
      rangeSwitch,
      range2,
      rangeSwitch2,
      showTime,
      showTimeSwitch,
      spliter,
      setSpliter,
      handleRangeChange,
    }
  }
})
</script>

# 扩展

<div style="margin:100px;">
    <d-stick-slider />
</div>


# DatePicker 日期选择器

日期、时间可视化输入。

### 作为UI组件

---------


#### 最简

<section class="devui-datepicker-demo">
    <d-datepicker />
</section>

```jsx
<d-datepicker />
```
#### 区域选择

<section class="devui-datepicker-demo">
    <d-datepicker range />
</section>

```jsx
<d-datepicker range />
```

### 区间限制

<section class="devui-datepicker-demo">
    <d-datepicker date-min="2021-8-9" date-max="2021-9-20" />
</section>

```jsx
<d-datepicker date-min="2021-8-9" date-max="2021-9-20" />
```

<section class="devui-datepicker-demo">
    <d-datepicker range date-min="2021-8-9" date-max="2022-3-20" />
</section>

```jsx
<d-datepicker range date-min="2021-8-9" date-max="2022-3-20" />
```


### 绑定原生`<input>`

暂定通过`querySelector`查找节点，绑定真实`dom`节点。此方案待定。

```jsx
<section class="devui-datepicker-demo">
    <input class="input-binder" id="datepicker-input" />
    <d-datepicker attach-input-dom="#datepicker-input" />
</section>
```

<section class="devui-datepicker-demo">
    <input class="input-binder" id="datepicker-input" />
    <label>分隔符
        <select @change="handleRangeChange" :disabled="!range2">
            <option>-</option>
            <option>~</option>
            <option>--</option>
            <option>～</option>
            <option>***</option>
        </select>
    </label>    
    <d-datepicker attach-input-dom="#datepicker-input" range :range-spliter="spliter" />
</section>

### Scroll位置跟踪

在对宿主`<input>`绑定的过程中，对宿主的父级节点做了`scroll`追踪；当任何一级发生`scroll`时，都会更新弹出层位置，确保能让弹出层与`<input>`正确贴合。

这个做法是根据`ng`的组件效果实现的。

TODO: 跟踪节流。

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

