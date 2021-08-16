# Rate 等级评估

等级评估。

何时使用  
用户对一个产品进行评分时可以使用。

### Demo

<section>
  <h3>只读模式</h3>
  <br />
  <d-rate :read=true :value=value1 />
</section>

```html
<d-rate read="{true}" :value="value1" />
```

<section>
  <h3>动态模式</h3>
  <br />
  <d-rate :value=value2 @onUpdate:value="onUpdateValue2" />
</section>

```html
<d-rate :value="2" @onUpdate:value="onUpdateValue2" />
```

<section>
  <h3>动态模式-自定义</h3>
  <br />
  <d-rate character="A" color="#ffa500"  :value=value3 
    :count=6 @onUpdate:value="onUpdateValue3"  />
</section>

```html
<d-rate
  character="A"
  color="#ffa500"
  :value="value3"
  count="6"
  @onUpdate:value="onUpdateValue3"
/>
```

<section>
  <h3>使用type参数</h3>
  <br />
  <div>
    <d-rate :value=value1 :read=true type="success" :count=5 />
  </div>
  <div>
    <d-rate :value=value2 :read=true type="warning" :count=5 />
  </div>
  <div>
    <d-rate :value=value3 :read=true type="error" :count=5 />
  </div>
</section>

### 如何使用

### 只读模式

在 module 中引入：

```ts
import { DRate } from 'vue-devui'
```

在页面中使用：

```html
<d-rate :value="{3}" count="{5}"></d-rate>
```

# Rate

### d-rate 参数

|   参数    |              类型               | 默认值 | 描述                                                     |
| :-------: | :-----------------------------: | :----: | :------------------------------------------------------- |
|   read    |            `boolean`            | false  | 可选，设置是否为只读模式，只读模式无法交互               |
|   count   |            `number`             |   5    | 可选，设置总等级数                                       |
|   type    | `'success'\|'warning'\|'error'` |   --   | 可选，设置当前评分的类型，不同类型对应不同颜色           |
|   color   |            `string`             |   --   | 可选，星星颜色                                           |
|   icon    |            `string`             |   --   | 可选，评分图标的样式，只支持 devUI 图标库中所有图标      |
| character |            `string`             |   --   | 可选，评分图标的样式，icon 与 character 只能设置其中一个 |

<script lang="ts">
  import { defineComponent, ref, h } from 'vue'
  export default defineComponent({
    setup() {
      const value1 = ref(3.5)
      const value2 = ref(2)
      const value3 = ref(3)
      const onUpdateValue2 = (newVal: number) => {
        value2.value = newVal;
      };
      const onUpdateValue3 = (newVal: number) => {
      value3.value = newVal;
    };
      return {
        value1,
        value2,
        onUpdateValue2,
        value3,
        onUpdateValue3
      }
    }
  })
</script>
