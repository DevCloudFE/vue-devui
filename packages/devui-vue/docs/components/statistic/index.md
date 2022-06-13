# Statistic 统计数值

#### 何时使用

当需要展示带描述的统计类数据时使用

### 基本用法

:::demo

```vue
<template>
  <d-row>
    <d-col :span="12">
      <d-statistic title="Users Sales" group-separator="," :value="5201314"> </d-statistic>
    </d-col>
    <d-col :span="12">
      <d-statistic title="Account Weekly Sales (CNY)" group-separator="." :value="999999"> </d-statistic>
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
          :value-from="0"
          :start="start"
          :animation-duration="5000"
          animation
        ></d-statistic>
      </d-card>
    </d-col>
    <d-col :span="12">
      <d-card>
        <d-statistic title="Animation Decline Rate" value="53" :precision="3" :value-from="0" :start="controlStart" animation>
          <template #suffix>
            <span>%</span>
            <d-button @click="controlStart = true">Start</d-button>
          </template>
        </d-statistic>
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

前缀插槽， 后缀插槽， 额外插槽
:::demo

```vue
<template>
  <d-row :gutter="16">
    <d-col :span="12">
      <d-statistic :value="336969" class="statistic-demo" group-separator="," animation>
        <template #title>
          <span :style="{ marginRight: '10px' }">文章阅读数</span>
          <d-icon name="help" />
        </template>
        <template #extra>
          <span :style="{ fontSize: '13px', marginRight: '10px' }">较前日</span>
          <d-icon color="#F56C6C" name="arrow-down" />
          <d-statistic group-separator="," class="statistic-extra-demo" value="1399" animation />
        </template>
      </d-statistic>
    </d-col>
    <d-col :span="12">
      <d-statistic :value="5565566" group-separator="," class="statistic-demo" animation :animation-duration="5000">
        <template #title>
          <span :style="{ marginRight: '10px' }">文章点赞数</span>
          <d-icon name="help" />
        </template>
        <template #extra>
          <span :style="{ fontSize: '13px', marginRight: '10px' }">较前日</span>
          <d-icon color="#67C23A" name="arrow-up" />
          <d-statistic class="statistic-extra-demo" value="6669" animation group-separator="," :animation-duration="5000" />
        </template>
      </d-statistic>
    </d-col>
  </d-row>
</template>

<style>
.statistic-demo {
  margin-right: 50px;
}
.statistic-extra-demo {
  display: inline-block;
}
.statistic-demo .devui-statistic__content,
.statistic-extra-demo .devui-statistic__content {
  font-weight: bold;
  font-size: 30px;
}
</style>
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
        <d-statistic :value-style="{ color: '#fba' }" title="Growth Rate" :value="68.28" :precision="3" suffix="%">
          <template #prefix>
            <d-icon name="experice-new" />
          </template>
        </d-statistic>
      </d-card>
    </d-col>
    <d-col :span="12">
      <d-card>
        <d-statistic :value-style="{ color: '#abf' }" title="Decline Rate" :value="38.3" suffix="%">
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

### Statistic 参数

| 参数名             | 类型               | 默认  | 说明             |
| :----------------- | :----------------- | :---- | :--------------- |
| title              | `string \| v-slot` | -     | 数值的标题       |
| value              | `number \| string` | -     | 数值内容         |
| group-separator    | `string`           | -     | 设置千分位标识符 |
| precision          | `number`           | -     | 设置数值精度     |
| suffix             | `string \| v-slot` | -     | 设置数值的后缀   |
| prefix             | `string \| v-slot` | -     | 设置数值的前缀   |
| extra              | `string \| v-slot` | -     | 额外内容         |
| animation-duration | `number`           | 2000  | 动画持续时间     |
| value-from         | `number`           | 0     | 动画初始值       |
| animation          | `boolean`          | false | 是否开启动画     |
| start              | `boolean`          | true  | 是否开始动画     |
