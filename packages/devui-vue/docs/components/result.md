# Result 结果

操作结果反馈。

#### 何时使用

用于对用户的操作结果或者异常状态做反馈。

### 基本用法

:::demo

```vue
<template>
  <div>
    <d-row wrap>
      <d-col :lg="6" :xs="24">
        <d-result icon="success" title="操作成功" desc="操作成功描述"></d-result>
      </d-col>
      <d-col :lg="6" :xs="24">
        <d-result icon="danger" title="操作失败" desc="操作失败描述"></d-result>
      </d-col>
      <d-col :lg="6" :xs="24"><d-result icon="warning" title="操作警告" desc="操作警告描述"></d-result></d-col>
      <d-col :lg="6" :xs="24"><d-result icon="info" title="操作信息" desc="操作信息描述"></d-result></d-col>
    </d-row>
  </div>
</template>
```

:::

### 自定义

:::demo

```vue
<template>
  <div>
    <d-result desc="操作成功描述">
      <template #icon>
        <d-icon name="insert-image" size="64px"></d-icon>
      </template>
      <template #title>这是自定义标题</template>
      <template #extra>
        <d-button id="primaryBtn" style="margin-right: 8px">回到首页</d-button>
      </template>
    </d-result>
  </div>
</template>
```

:::

### Result 参数

| 参数名  | 类型                      | 默认   | 说明           | 跳转 Demo             |
| :----- | :------------------------- | :------ | :-------------- | :--------------------- |
| icon  | [ResultIcon](#resulticon) | 'info' | 指定 icon 类型 | [基本用法](#基本用法) |
| title | string                    | -      | 结果标题       | [基本用法](#基本用法) |
| desc  | string                    | -      | 结果描述       | [基本用法](#基本用法) |

### Result 插槽

| 参数名 | 说明           |
| :----- | :------------- |
| icon   | 自定义图标     |
| title  | 自定义标题     |
| desc   | 自定义描述内容 |
| extra  | 底部额外区域   |

### Result 类型定义

#### ResultIcon

```ts
type ResultIcon = 'success' | 'danger' | 'warning' | 'info';
```
