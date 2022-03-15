# Statistic 

### When to use

Used when it is necessary to display statistical data with description

### Basic Usage

:::demo

```vue
<template>
  <d-row>
    <d-col :span="12">
      <d-statistic
        title="Users Sales"
        group-separator=","
        :value="5201314">
      </d-statistic>
    </d-col>
    <d-col :span="12">
      <d-statistic
        title="Account Weekly Sales (CNY)"
        group-separator="."
        :value="999999">
      </d-statistic>
    </d-col>
  </d-row>
</template>
```

:::

### Numerical animation

We can start numerical animation by setting the animation attribute. You can start the animation when the page loads, or you can control it manually
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
        <d-statistic
          title="Animation Decline Rate"
          value="53"
          :precision="3"
          :value-from="0"
          :start="controlStart"
          animation
        >
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
      controlStart: false
    }
  }
}
</script>
```

:::

### Use of slots

Prefix slot, suffix slot, extra slot
:::demo

```vue
<template>
  <d-row :gutter="16">
    <d-col :span="12">
      <d-statistic
        :value="336969"
        style="margin-right: 50px"
        group-separator=","
        :value-style="{ fontWeight: 'bold', fontSize: '30px' }"
        animation
      >
        <template #title>
          <span :style="{marginRight: '10px' }">Number of articles read</span>
          <d-icon name="help" />
        </template>
        <template #extra>
          <span :style="{ fontSize: '13px', marginRight: '10px' }">Compared before yesterday</span>
          <d-icon color="#F56C6C" name="arrow-down" />
          <d-statistic
            style="display: inline-block;"
            group-separator=","
            :value-style="{ fontSize: '15px', color: '#F56C6C', letterSpacing: '2px' }"
            value="1399"
            animation
          />
        </template>
      </d-statistic>
    </d-col>
    <d-col :span="12">
      <d-statistic
        :value="5565566"
        style="margin-right: 50px"
        group-separator=","
        :value-style="{ fontWeight: 'bold', fontSize: '30px' }"
        animation
        :animation-duration="5000"
      >
        <template #title>
          <span :style="{marginRight: '10px' }">Number of article likes</span>
          <d-icon name="help" />
        </template>
        <template #extra>
          <span :style="{ fontSize: '13px', marginRight: '10px' }">Compared before yesterday</span>
          <d-icon color="#67C23A" name="arrow-up" />
          <d-statistic
            style="display: inline-block;"
            :value-style="{ fontSize: '15px', color: '#67C23A', letterSpacing: '2px' }"
            value="6669"
            animation
            group-separator=","
            :animation-duration="5000"
          />
        </template>
      </d-statistic>
    </d-col>
  </d-row>
</template>
```

:::

### Use in card

Display statistics in cards.
:::demo

```vue
<template>
  <d-row :gutter="16">
    <d-col :span="12">
      <d-card>
        <d-statistic
          :value-style="{ color: '#fba' }"
          title="Growth Rate"
          :value="68.28"
          :precision="3"
          suffix="%"
        >
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

### d-statistic

| parameter          | type               | default  | introduce                    |
| :---: | :---: | :---: | :---: |
| title              | `string \| v-slot` | -        | Title of value               |
| extra              | `string \| v-slot` | -        | Extra content                |
| value              | `number \| string` | -        | Value content                |
| group-separator    | `string`           | ,        | Set group-separator          |
| precision          | `number`           | -        | Set numeric precision        |
| suffix             | `string \| v-slot` | -        | Sets the suffix of the value |
| prefix             | `string \| v-slot` | -        | Sets the prefix of the value |
| content-style      | `style`            | -        | Content style                |
| animation-duration | `number`           | 2000     | Animation duration           |
| value-from         | `number`           | 0        | Animation initial value      |
| animation          | `boolean`          | false    | Turn on animation            |
| start              | `boolean`          | false    | Start animation              |
