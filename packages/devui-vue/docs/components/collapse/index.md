# Collapse 折叠面板

通过折叠面板收纳内容区域

#### 何时使用

需要收纳内容区域的时候使用。

### 基本用法

可同时展开多个面板，面板之前不影响

:::demo

```vue
<template>
  <div class="collapse-demo-1">
    <d-collapse v-model="collapseValue">
      <d-collapse-item v-for="(item, index) in options" :key="index" :title="item.title">
        <div>{{ item.content }}</div>
      </d-collapse-item>
    </d-collapse>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const collapseValue = ref('');
    const list = new Array(6).fill(0).map((item, i) => {
      return {
        title: `item ${i + 1}`,
        content: '这是一组测试数据',
      };
    });
    const options = reactive(list);
    return {
      collapseValue,
      options,
    };
  },
});
</script>
<style>
.collapse-demo-1 {
  margin-bottom: 20px;
}
</style>
```

:::

### Collapse 参数

| 参数名  | 类型              | 默认 | 说明   | 跳转 Demo             |
| :------ | :---------------- | :--- | :----- | :-------------------- |
| v-model | `string \| array` | ''   | 绑定值 | [基本用法](#基本用法) |
