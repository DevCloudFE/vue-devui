# Result

Operation result feedback.

### When To Use

It is used to feed back the user's operation results or abnormal states.

### Basic Usage

:::demo

```vue
<template>
  <div>
    <d-row wrap>
      <d-col :lg="6" :xs="24">
        <d-result icon="success" title="Operation succeeded" desc="Operation success description"></d-result>
      </d-col>
      <d-col :lg="6" :xs="24">
        <d-result icon="danger" title="Operation failed" desc="Operation failure description"></d-result>
      </d-col>
      <d-col :lg="6" :xs="24">
        <d-result icon="warning" title="Operation warning" desc="Operation warning description"></d-result>
      </d-col>
      <d-col :lg="6" :xs="24">
        <d-result icon="info" title="Operation information" desc="Operation information description"></d-result>
      </d-col>
    </d-row>
  </div>
</template>
```

:::

### Custom

:::demo

```vue
<template>
  <div>
    <d-result desc="Operation success description">
      <template #icon>
        <d-icon name="insert-image" size="64px"></d-icon>
      </template>
      <template #title>This is a custom title</template>
      <template #extra>
        <d-button id="primaryBtn" style="margin-right: 8px">Back to the home page</d-button>
      </template>
    </d-result>
  </div>
</template>
```

:::

### d-result

d-result Parameter

| Parameter | Type                        | Default | Description       | Jump to Demo                |
| --------- | --------------------------- | ------- | ----------------- | --------------------------- |
| icon      | [`ResultIcon`](#ResultIcon) | info    | Specify icon type | [Basic Usage](#basic-usage) |
| title     | string                      | -       | title             | [Basic Usage](#basic-usage) |
| desc      | string                      | -       | description       | [Basic Usage](#basic-usage) |

### ResultIcon

The default value is 'info'

```ts
export type ResultIcon = 'success' | 'danger' | 'warning' | 'info'
```

### Slot

There are two ways to use：`v-slot:icon` or Named Slots `#icon`

| Parameter | Description        |
| --------- | ------------------ |
| icon      | Custom icon        |
| title     | Custom title       |
| desc      | Custom description |
| extra     | Custom extra       |
