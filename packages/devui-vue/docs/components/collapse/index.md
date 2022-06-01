# Collapse 折叠面板

通过折叠面板收纳内容区域

#### 何时使用

需要收纳内容区域的时候使用。

### 基本用法

可同时展开多个面板，面板之前不影响

:::demo

```vue
<template>
  <div class="collapse-demo">
    <d-collapse v-model="collapseValue">
      <d-collapse-item title="一致性 Consistency" name="consistency">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </d-collapse-item>
      <d-collapse-item title="反馈 Feedback" name="feedback">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </d-collapse-item>
      <d-collapse-item title="效率 Efficiency" name="efficiency">
        <div>简化流程：设计简单直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而做出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </d-collapse-item>
      <d-collapse-item title="可控 Controllability" name="controllability" disabled>
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </d-collapse-item>
    </d-collapse>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const collapseValue = ref(['consistency']);
    return {
      collapseValue,
    };
  },
});
</script>
<style>
.collapse-demo {
  margin-bottom: 20px;
}
</style>
```

:::

### 手风琴效果

每次只能展开一个面板，通过 `accordion` 属性设置

:::demo

```vue
<template>
  <div class="collapse-demo">
    <d-collapse v-model="collapseAccordionValue" accordion>
      <d-collapse-item title="一致性 Consistency" name="consistency">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </d-collapse-item>
      <d-collapse-item title="反馈 Feedback" name="feedback">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </d-collapse-item>
      <d-collapse-item title="效率 Efficiency" name="efficiency">
        <div>简化流程：设计简单直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而做出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </d-collapse-item>
      <d-collapse-item title="可控 Controllability" name="controllability">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </d-collapse-item>
    </d-collapse>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const collapseAccordionValue = ref('consistency');
    return {
      collapseAccordionValue,
    };
  },
});
</script>
```

:::

### 自定义面板标题

通过 CollapseItem `title` 插槽设置

:::demo

```vue
<template>
  <div class="collapse-demo">
    <d-collapse v-model="collapseValue1">
      <d-collapse-item name="consistency">
        <template #title>
          一致性 Consistency
          <d-icon name="like"></d-icon>
        </template>
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </d-collapse-item>
      <d-collapse-item title="反馈 Feedback" name="feedback">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </d-collapse-item>
      <d-collapse-item title="效率 Efficiency" name="efficiency">
        <div>简化流程：设计简单直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而做出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </d-collapse-item>
      <d-collapse-item title="可控 Controllability" name="controllability">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </d-collapse-item>
    </d-collapse>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const collapseValue1 = ref('consistency');
    return {
      collapseValue1,
    };
  },
});
</script>
```

:::

### Collapse 参数

| 参数名    | 类型              | 默认  | 说明                                                              | 跳转 Demo                 |
| :-------- | :---------------- | :---- | :---------------------------------------------------------------- | :------------------------ |
| v-model   | `string \| array` | ''    | 必填，绑定值,当前激活的面板(手风琴模式下为 string， 其它为 array) | [基本用法](#基本用法)     |
| accordion | `boolean`         | false | 可选，设置是否手风琴效果                                          | [手风琴效果](#手风琴效果) |

### Collapse 事件

| 事件名 | 类型                               | 说明                                   | 跳转 Demo |
| :----- | :--------------------------------- | :------------------------------------- | :-------- |
| change | `(value: string \| array) => void` | 可选，折叠面板发生改变时触发的回调函数 |           |

### Collapse 插槽

| 名称    | 说明                                       |
| :------ | :----------------------------------------- |
| default | 自定义默认内容，一般为 CollapseItem 子组件 |

### Collapse Item 参数

| 参数名   | 类型               | 默认 | 说明                                      | 跳转 Demo             |
| :------- | :----------------- | :--- | :---------------------------------------- | :-------------------- |
| name     | `string \| number` | ''   | 必填，当前激活的面板唯一的标识符          | [基本用法](#基本用法) |
| title    | `string`           | ''   | 可选，面板的标题(与 `title` 插槽二选其一) | [基本用法](#基本用法) |
| disabled | `Boolean`          | ''   | 可选，当前面板是否禁用                    | [基本用法](#基本用法) |

### Collapse Item 插槽

| 名称    | 说明                   |
| :------ | :--------------------- |
| default | 自定义单个面板下展内容 |
| title   | 自定义单个面板标题内容 |
