# Statistic 统计数值

### 何时使用

当需要展示带描述的统计类数据时使用

### 基本用法

:::demo

```vue
<template>
  <d-row>
    <d-col :span="12">
      <d-statistic
        title="Users Sales"
        :value="5201314"
        style="position: absolute">
      </d-statistic>
        
    </d-col>
    <d-col :span="12">
      <d-statistic title="Account Weekly Sales (CNY)" :value="999999" 
       />
    </d-col>
  </d-cow>
</template>
```

:::

### 在卡片中使用

在卡片中展示统计数值。
:::demo

```vue
<template>
  <d-row :gutter="16">
    <d-col :span="12">
      <d-card>
        <d-statistic
          title="Growth Rate"
          :value="68.28"
          :precision="3"
          suffix="%"
          :content-style="{ color: '#3f8600' }"
        >
          <template #prefix>
            <d-icon name="experice-new" />
          </template>
        </d-statistic>
      </d-card>
    </d-col>
    <d-col :span="12">
      <d-card>
        <d-statistic
          title="Decline Rate"
          :value="38.3"
          suffix="%"
          class="demo-class"
          :content-style="{ color: '#cf1322' }"
        >
          <template #prefix>
            <d-icon name="bold" />
          </template>
        </d-statistic>
      </d-card>
    </d-col>
  </d-row>
</template>
```

:::

### 数值动画

我们可以通过设置 animation 属性 开启数值动画。可以在页面加载时开始动画,也可以手动控制
:::demo

```vue
<template>
  <d-row :gutter="16">
    <d-col :span="12">
      <d-card>
        <d-statistic
          title="Animation Growth Rate"
          :value="88.265"
          suffix="%"
          :content-style="{ color: '#3f8600' }"
          :value-from="0"
          :start="start"
          :animation-duration="5000"
          animation
        >
        </d-statistic>
      </d-card>
    </d-col>
    <d-col :span="12">
      <d-card>
        <d-statistic
          title="Animation Decline Rate"
          value="53.333"
          :precision="0"
          suffix="%"
          class="demo-class"
          :content-style="{ color: '#cf1322' }"
          :value-from="0"
          :start="controlStart"
          animation
        >
        </d-statistic>
        <d-button @click="controlStart = true">Start</d-button>
      </d-card>
    </d-col>
  </d-row>
</template>
<script>
export default {
  data() {
    return {
      start: true,
      controlStart: false,
    };
  },
};
</script>
```

:::

### 插槽的使用

前缀和后缀插槽
:::demo

```vue
<template>
  <d-row :gutter="16">
    <d-col :span="12">
      <d-statistic
        title="Active User Number"
        :value="1128"
        :showGroupSeparator="true"
        style="margin-right: 50px"
      >
        <template #suffix>
          %
        </template>
      </d-statistic>
    </d-col>
    <d-col :span="12">
      <d-statistic title="Scale" value="93">
        <template #suffix>
          <span>/ 100</span>
        </template>
      </d-statistic>
    </d-col>
  </d-row>
</template>
```

:::

### d-statistic

| 参数               | 类型               | 默认     | 说明             |
| ------------------ | ------------------ | -------- | ---------------- |
| title              | `string \| v-slot` | -        | 数值的标题       |
| extra              | `string \| v-slot` | -        | 额外内容         |
| value              | `number \| string` | -        | 数值内容         |
| group-separator    | `string`           | ,        | 设置千分位标识符 |
| precision          | `number`           | -        | 设置数值精度     |
| suffix             | `string \| v-slot` | -        | 设置数值的后缀   |
| prefix             | `string \| v-slot` | -        | 设置数值的前缀   |
| title-style        | `style`            | -        | 标题样式         |
| content-style      | `style`            | -        | 内容样式         |
| animation-duration | `number`           | 2000     | 动画持续时间     |
| delay              | `number`           | 0        | 延迟进行动画时间 |
| value-from         | `number`           | 0        | 动画初始值       |
| animation          | `boolean`          | false    | 是否开启动画     |
| easing             | `string`           | quartOut | 数字动画效果     |
| start              | `boolean`          | false    | 是否开始动画     |


