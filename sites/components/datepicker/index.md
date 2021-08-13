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
        width: 200px;
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

    const showTime = ref<boolean>(false)
    const showTimeSwitch = () => showTime.value = !showTime.value

    return {
      range,
      rangeSwitch,
      showTime,
      showTimeSwitch,
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

<section class="devui-datepicker-demo">
    <label>日期区间<input type="checkbox" @click="rangeSwitch" /></label>
    <label>显示时间<input type="checkbox" @click="showTimeSwitch" /></label>
    <d-datepicker :range="range" :show-time="showTime" />
</section>

```jsx
<section class="devui-datepicker-demo">
    <label>日期区间<input type="checkbox" @click="rangeSwitch" /></label>
    <label>显示时间<input type="checkbox" @click="showTimeSwitch" /></label>
    <d-datepicker :range="range" :show-time="showTime" />
</section>
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
    <d-datepicker attach-input-dom="#datepicker-input" />
</section>

```jsx
<section class="devui-datepicker-demo">
    <input class="input-binder" id="datepicker-input-autoclose" />
    <d-datepicker auto-close attach-input-dom="#datepicker-input-autoclose" />
</section>
```

<section class="devui-datepicker-demo">
    <input class="input-binder" id="datepicker-input-autoclose" />
    <d-datepicker auto-close attach-input-dom="#datepicker-input-autoclose" />
</section>

### 区域选择

```jsx
<section class="devui-datepicker-demo">
    <input class="input-binder" id="datepicker-input-range" />
    <d-datepicker range attach-input-dom="#datepicker-input-range" />
</section>
```

<section class="devui-datepicker-demo">
    <input class="input-binder" id="datepicker-input-range" />
    <d-datepicker range attach-input-dom="#datepicker-input-range" />
</section>


### Scroll位置跟踪

在对宿主`<input>`绑定的过程中，对宿主的父级节点做了`scroll`追踪；当任何一级发生`scroll`时，都会更新弹出层位置，确保能让弹出层与`<input>`正确贴合。

这个做法是根据`ng`的组件效果实现的。

TODO: 跟踪节流。


