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

### Use in card

Display statistics in cards.
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

Prefix and suffix slots
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

### Custom Style

Provide custom attributes to facilitate adding styles
:::demo

```vue
<template>
  <d-row :gutter="16">
    <d-col :span="12">
      <d-statistic
        title="Custom Style"
        :value="88"
        :content-style="{ color: '#fba' }"
        :title-style="{ color: '#abf' }"
      >
        <template #suffix>%</template>
      </d-statistic>
    </d-col>
    <d-col :span="12">
      <d-statistic
        title="Scale"
        :value="5000"
        group-separator="."
        :precision="3"
        prefix="$"
        :content-style="{ fontSize: '30px', color: '#5e7ce0'}"
      >
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
| title-style        | `style`            | -        | Title Style                  |
| content-style      | `style`            | -        | Content style                |
| animation-duration | `number`           | 2000     | Animation duration           |
| delay              | `number`           | 0        | Delay animation time         |
| value-from         | `number`           | 0        | Animation initial value      |
| animation          | `boolean`          | false    | Turn on animation            |
| easing             | `string`           | quartOut | Digital animation effect     |
| start              | `boolean`          | false    | Start animation              |
