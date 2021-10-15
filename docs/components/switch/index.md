# Switch 开关

开/关切换组件。

### 何时使用

当两种状态需要来回切换控制时，比如启用/禁用。

### 基本用法

<br />

#### Small

<br />

<d-switch v-model:checked="checkedSmall" size="small"></d-switch>

<br />
<br />

#### Middle

<br />

<d-switch v-model:checked="uncheckedMiddle"></d-switch>

<br />

<d-switch v-model:checked="checkedMiddle"></d-switch>

<br />
<br />

#### Large

<br />

<d-switch v-model:checked="checkedLarge" size="large"></d-switch>
<br />
<br />

### disabled

<br />

<d-switch v-model:checked="checkedDisabled" :disabled='true'></d-switch>
<d-switch v-model:checked="checkedDisabled1" :disabled='true'></d-switch>

<br />
<br />

### 自定义样式

<br />
<d-switch v-model:checked="checkedColor" color="#FECC55"></d-switch>

<br />
<d-switch v-model:checked="checkedContent">
  <template #checkedContent>开</template>
  <template #uncheckedContent>关</template>
</d-switch>

<br />
<d-switch color="#50D4AB" v-model:checked="checkedIcon">
  <template #checkedContent>
    <i class="icon-right"></i>
  </template>
  <template #uncheckedContent>
    <i class="icon-error"></i>
  </template>
</d-switch>


``` html
  <d-switch size="small"></d-switch>
  <d-switch v-model:checked="uncheckedMiddle"></d-switch>
  <d-switch v-model:checked="checkedMiddle"></d-switch>
  <d-switch v-model:checked="checkedLarge" size="large"></d-switch>
  <d-switch v-model:checked="checkedDisabled" :disabled="true"></d-switch>
  <d-switch v-model:checked="checkedDisabled" :color="#FECC55"></d-switch>
  <d-switch v-model:checked="checkedContent">
    <template #checkedContent>开</template>
    <template #uncheckedContent>关</template>
  </d-switch>
  <d-switch color="#50D4AB" v-model:checked="checkedIcon">
    <template #checkedContent>
      <i class="icon-right"></i>
    </template>
    <template #uncheckedContent>
      <i class="icon-error"></i>
    </template>
  </d-switch>
```
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checkedSmall = ref(true)
    const uncheckedMiddle = ref(false)
    const checkedMiddle = ref(true)
    const checkedLarge = ref(true)
    const checkedDisabled = ref(true)
    const checkedDisabled1 = ref(false)
    const checkedColor = ref(true)
    const checkedContent = ref(false)
    const checkedIcon = ref(true)

    return {
      checkedSmall,
      uncheckedMiddle,
      checkedMiddle,
      checkedLarge,
      checkedDisabled,
      checkedDisabled1,
      checkedColor,
      checkedContent,
      checkedIcon
    }
  }
})
</script>

### d-switch 参数

|       参数       |            类型                   | 默认  |               说明                    | 跳转 Demo             
| :--------------: | :--------------------------: | :---: | :-----------------------: | :--------------------- |
|       size       |             `small \| middle \| large`              |  `middle`   |             可选，开关尺寸大小          | [基本用法](#基本用法) 
|      color       |                   `string`                    |  --   |             可选，开关打开时的自定义颜色      | [自定义样式](#自定义样式)
|     checked      |                   `boolean`                   | false |              可选，开关是否打开，默认关闭      | [基本用法](#基本用法) 
|     disabled     |                   `boolean`                   | false |                    可选，是否禁用开关          | [基本用法](#基本用法) 
|  checkedContent  |            `string \| HTMLElement`            |  ''  |             可选，开关打开时说明               | [自定义样式](#自定义样式)
| uncheckedContent |             `string \| HTMLElement`             |  ''   |             可选，开关关闭时说明                | [自定义样式](#自定义样式)

### d-switch 事件

|  事件  |          类型           | 说明                                  |
| :----: | :---------------------: | :------------------------------------ |
| change | `EventEmitter<boolean>` | 可选,开关打开返回 true,关闭返回 false |
