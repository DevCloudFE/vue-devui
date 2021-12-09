# Status

Pass interaction results.

### When To Use

Indicates the execution result of a task.

### Basic Usage

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

### d-status parameter

| Parameter |                   Type                              |   Default    |                                 Description                                   |
| :--: | :------------------------------------------------------------: | :-------: | :--------------------------------------------------------------------------: |
| type | `success\|error\|warning\|initial\|waiting\|running\| invalid` | 'invalid' | Required. The value can be success、error、warning、initial、waiting、running、invalid |
