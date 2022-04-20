# Status 状态

传达交互结果的组件。

#### 何时使用

表示一个任务的执行结果时使用。

### 基本用法

:::demo

```vue
<template>
  <d-status>Default</d-status>
  <d-status type="success">Success</d-status>
  <d-status type="error">Error</d-status>
  <d-status type="warning">Warning</d-status>
  <d-status type="initial">Initial</d-status>
  <d-status type="waiting">Waiting</d-status>
  <d-status type="running">Running</d-status>
  <d-status type="invalid">Invalid</d-status>
</template>
```

:::

### Status 参数

| 参数 |            类型             |   默认    |    说明    |
| :--: | :-------------------------: | :-------: | :--------: |
| type | [IStatusType](#istatustype) | 'invalid' | 可选，类型 |

### Status 类型定义

#### IStatusType

```ts
type IStatusType = 'success' | 'error' | 'initial' | 'warning' | 'waiting' | 'running' | 'invalid';
```
