# InputIcon 输入框

文本输入框。

#### 何时使用

需要手动输入文字使用。

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {

    const eventValue = ref<string>('')
    const handleIconClick = (val: string) => {
        console.log(eventValue.value = val)
        alert('AHHHH~!! InputIcon!!!!')
    }
    
    return {
      eventValue,
      handleIconClick,
    }
  }
})
</script>

### 属性 name

使用`name`属性定义`icon`类型，取值与`icon`组件一致。详细列表[https://devui.design/icon/ruleResource](https://devui.design/icon/ruleResource)

```vue
<d-input-icon name="calendar" />
```

<div style="max-width:300px;border:1px dashed #ccc;padding:20px;display:flex;flex-direction:column;justify-content:space-around;height:300px;">
<d-input-icon modelValue="calendar" name="calendar" />
<d-input-icon modelValue="code" name="code" />
<d-input-icon modelValue="close" name="close" />
<d-input-icon modelValue="edit" name="edit" />
<d-input-icon modelValue="buy" name="buy" />
<d-input-icon modelValue="letter-a" name="letter-a" />
</div>

### 属性 `icon-color` `icon-bg-color`

- `icon-color` 定义`icon`颜色。

- `icon-bg-color` 定义`icon`区域的背景色。

由于字体图标本身有点布局偏移，加上背景可以有效抑制这种视觉偏移影响。

```vue
<d-input-icon name="letter-a" icon-bg-color="#afa" icon-color="#33a" />
```

<div style="max-width:300px;border:1px dashed #ccc;padding:20px;display:flex;flex-direction:column;justify-content:space-around;height:300px;">
<d-input-icon modelValue="calendar" name="calendar" icon-bg-color="#afa" icon-color="#33a"/>
<d-input-icon modelValue="code" name="code" icon-bg-color="#afa" icon-color="#33a" />
<d-input-icon modelValue="close" name="close" icon-bg-color="#afa" icon-color="#33a" />
<d-input-icon modelValue="edit" name="edit" icon-bg-color="#afa" icon-color="#33a" />
<d-input-icon modelValue="buy" name="buy" icon-bg-color="#afa" icon-color="#33a" />
<d-input-icon modelValue="letter-a" name="letter-a" icon-bg-color="#afa" icon-color="#33a" />
</div>

### 事件 `onIconclick`

响应图标区域的点击。

```vue
<d-input-icon name="calendar" @iconclick="handleIconClick" />
```

<div style="max-width:300px;border:1px dashed #ccc;padding:20px;display:flex;flex-direction:column;justify-content:space-around;">
<d-input-icon name="calendar" modelValue="click the icon --->" @iconclick="handleIconClick" />
</div>

### 传递原始`Input`组件属性

`InputIcon`组件的属性定义，沿用`Input`组件的属性定义对象并进行扩展：

```js
import { inputProps } from '../../input/src/use-input'
const inputIconProps = {
    ...inputProps,
    name: {
        type: String,
        value: 'calendar',
        required: false,
    },
    onIconclick: {
        type: Function as PropType<(e: MouseEvent) => void>,
        required: false,
    },
    iconBgColor: {
        type: String,
        value: 'transparent',
    },
    iconColor: {
        type: String,
        value: '#000000',
    }
}
```

在使用组件时，剔除`InputIcon`自身的几个额外属性，其余的属性全部直接传递给内置的`Input`组件。这样做的好处，是`Input`组件和`InputIcon`组件之间可以无缝替换。

```js
setup(props, ctx) {
    // Rest剩余属性到inputProps对象
    const { name, onIconclick, onChange, iconBgColor, iconColor, ...inputProps } = props
    // ...
    const onInputChange = (v: string) => {
        state.value = v
        typeof onChange === 'function' && onChange(state.value)
    }
    // ...
    return () => {
        return (
            <div class="d-input-icon-container">
                <label>
                    <Input { ...inputProps } onChange={onInputChange} />
                </label>
                <span onClick={onIconClick} style={{ backgroundColor: iconBgColor }}>
                    <Icon size="small" name={name} color={iconColor} />
                </span>
            </div>
        )
    }
},
```

其中`onInputChange`的二次封装，是为了从`Input`组件中同步状态到本地。