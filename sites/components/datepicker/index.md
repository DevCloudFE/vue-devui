# DatePicker 日期选择器

日期、时间可视化输入。

### 作为UI组件

```jsx
// 默认 range=false
<d-datepicker range={state.range} showTime={state.showTime} />
```

<d-datepicker-demo-1 />

### 绑定原生`<input>`

暂定通过`querySelector`查找节点，绑定真实`dom`节点。此方案待定。

```jsx
// 选取完成后保留弹层
<input style="width:200px;padding:5px;font-size:16px;border-radius:5px;" id="datepicker-input" />
<d-datepicker attach-input-dom="#datepicker-input" />
```

<input style="width:200px;padding:5px;font-size:16px;border-radius:5px;" id="datepicker-input" />
<d-datepicker attach-input-dom="#datepicker-input" />

```jsx
// auto-close=true 选取完成后自动关闭
<input style="width:200px;padding:5px;font-size:16px;border-radius:5px;" id="datepicker-input-autoclose" />
<d-datepicker auto-close attach-input-dom="#datepicker-input-autoclose" />
```

<input style="width:200px;padding:5px;font-size:16px;border-radius:5px;" id="datepicker-input-autoclose" />
<d-datepicker auto-close attach-input-dom="#datepicker-input-autoclose" />

### 区域选择

```jsx
<input style="width:200px;padding:5px;font-size:16px;border-radius:5px;" id="datepicker-input-range" />
<d-datepicker range attach-input-dom="#datepicker-input-range" />
```

<input style="width:200px;padding:5px;font-size:16px;border-radius:5px;" id="datepicker-input-range" />
<d-datepicker range attach-input-dom="#datepicker-input-range" />


### Scroll位置跟踪

在对宿主`<input>`绑定的过程中，对宿主的父级节点做了`scroll`追踪；当任何一级发生`scroll`时，都会更新弹出层位置，确保能让弹出层与`<input>`正确贴合。

这个做法是根据`ng`的组件效果实现的。

TODO: 跟踪节流。

```jsx
<div style="border:1px solid #aaa;height:300px;overflow:auto;">
    <br />
    // ...
    <i>占行</i>
    // ...
    <input style="margin-left:100px;width:200px;padding:5px;font-size:16px;border-radius:5px;" id="datepicker-input-tracing" />
    <d-datepicker auto-close range attach-input-dom="#datepicker-input-tracing" />
    // ...
    <br />
    <i>占行</i>
    // ...
</div>
```

<div style="border:1px solid #aaa;height:500px;overflow:auto;">
    <br />
    <i>占行</i>
    <br />
    <br />
    <i>占行</i>
    <br />
    <br />
    <br />
    <i>占行</i>
    <br />
    <br />
    <i>占行</i>
    <br />
    <br />
    <br />
    <i>占行</i>
    <br />
    <br />
    <i>占行</i>
    <br />
    <br />
    <input style="margin-left:100px;width:200px;padding:5px;font-size:16px;border-radius:5px;" id="datepicker-input-tracing" />
    <d-datepicker auto-close range attach-input-dom="#datepicker-input-tracing" />
    <br />
    <br />
    <i>占行</i>
    <br />
    <br />
    <br />
    <i>占行</i>
    <br />
    <br />
    <i>占行</i>
    <br />
    <br />
    <i>占行</i>
    <br />
    <br />
    <i>占行</i>
    <br />
    <br />
    <br />
    <i>占行</i>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <i>占行</i>
</div>


