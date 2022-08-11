# Mention 提及

提及组件。

#### 何时使用

用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

### 基本用法

展示提及组件的基本使用方法。
:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-mention :suggestions="suggestions" @select="handleSelect"></d-mention>
  </div>
</template>

<script lang="ts" setup>
const suggestions = [
  {
    id: 1,
    value: 'javascript',
  },
  {
    id: 2,
    value: 'Vue',
  },
  {
    id: 3,
    value: 'React',
  },
  {
    id: 4,
    value: 'Angular',
  },
  {
    id: 5,
    value: 'Html',
  },
  {
    id: 6,
    value: 'Css',
  },
  {
    id: 7,
    value: 'Koa',
  },
  {
    id: 8,
    value: 'Express',
  },
  {
    id: 9,
    value: 'Nuxt',
  },
  {
    id: 10,
    value: 'Next',
  },
];

const handleSelect = (val) => {
  console.log(val);
};
</script>
```

:::

### 自定义前缀

自定义触发字符，默认为`@`，可以定义为数组。
:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-mention :suggestions="suggestions" :trigger="triggers"></d-mention>
  </div>
</template>

<script lang="ts" setup>
const triggers = ['@', '#'];
const suggestions = [
  {
    id: 1,
    value: 'javascript',
  },
  {
    id: 2,
    value: 'Vue',
  },
  {
    id: 3,
    value: 'React',
  },
  {
    id: 4,
    value: 'Angular',
  },
  {
    id: 5,
    value: 'Html',
  },
  {
    id: 6,
    value: 'Css',
  },
  {
    id: 7,
    value: 'Koa',
  },
  {
    id: 8,
    value: 'Express',
  },
  {
    id: 9,
    value: 'Nuxt',
  },
  {
    id: 10,
    value: 'Next',
  },
];
</script>
```

:::

### 异步加载

有时候数据是异步获取的，可以采取异步加载的方式。
:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-mention :suggestions="suggestions" :loading="loading" @change="onSearchChange"></d-mention>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref(true);
const suggestions = ref([]);

const onSearchChange = (val: string) => {
  loading.value = true;
  fetchSuggestions(val, (result) => {
    suggestions.value = result;
    loading.value = false;
  });
};
const fetchSuggestions = (value: string, callback: (suggestions: string[]) => void) => {
  const users = [
    {
      id: 1,
      value: 'javascript',
    },
    {
      id: 2,
      value: 'Vue',
    },
    {
      id: 3,
      value: 'React',
    },
    {
      id: 4,
      value: 'Angular',
    },
    {
      id: 5,
      value: 'Html',
    },
    {
      id: 6,
      value: 'Css',
    },
    {
      id: 7,
      value: 'Koa',
    },
    {
      id: 8,
      value: 'Express',
    },
    {
      id: 9,
      value: 'Nuxt',
    },
    {
      id: 10,
      value: 'Next',
    },
  ];
  setTimeout(() => {
    const result = users.filter((item) => {
      return item.value.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1;
    });
    return callback(result);
  }, 1000);
};
</script>
```

:::

### 向上展开

搜索列表选项还可以向上展开。
:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-mention :suggestions="suggestions" position="top"></d-mention>
  </div>
</template>

<script lang="ts" setup>
const suggestions = [
  {
    id: 1,
    value: 'javascript',
  },
  {
    id: 2,
    value: 'Vue',
  },
  {
    id: 3,
    value: 'React',
  },
  {
    id: 4,
    value: 'Angular',
  },
];
</script>
```

:::

### 自定义模板

也可以自定义展示内容模板。
:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-mention :suggestions="suggestions" :dmValueParse="{ value: 'name', id: 'id' }">
      <template #template="{ item }">
        <d-avatar style="text-align: right" :name="item.name" :width="18" :height="18"></d-avatar>
        <span style="margin-left: 8px">{{ item.name }} - {{ item.id }}</span>
      </template>
    </d-mention>
  </div>
</template>

<script lang="ts" setup>
const suggestions = [
  {
    name: 'C#',
    id: 1,
  },
  {
    name: 'C',
    id: 2,
  },
  {
    name: 'C++',
    id: 3,
  },
  {
    name: 'Python',
    id: 4,
  },
  {
    name: 'Java',
    id: 5,
  },
  {
    name: 'JavaScript',
    id: 6,
  },
  {
    name: 'Go',
    id: 7,
  },
];
</script>
```

:::

### Mention 参数

| 参数名                 | 类型                          | 默认                      | 说明                                       | 跳转 Demo                 |
| :--------------------- | :---------------------------- | :------------------------ | :----------------------------------------- | :------------------------ |
| suggestions     | array                         | -                         | 必填，建议数据源                           | [基本用法](#基本用法)     |
| position        | top / bottom                  | bottom                    | 可选，建议框位置                           | [向上展开](#向上展开)     |
| notFoundContent | string                        | No suggestion matched     | 可选，用于在没有匹配到数据的时候的提示     | -                         |
| loading         | boolean                       | false                     | 可选，异步加载数据源的时候是否显示加载效果 | [异步加载](#异步加载)     |
| dmValueParse           | `{value: string, id: string}` | `{value: value, id: id} ` | 可选，建议选项的取值方法                   | [异步加载](#异步加载)     |
| trigger         | string[]                      | `['@'] `                  | 可选，触发组件的前缀符                     | [自定义前缀](#自定义前缀) |

### Mention 事件


| 参数名 | 类型                                  | 默认 | 说明               | 跳转 Demo             |
| :----- | :------------------------------------ | :--- | :----------------- | :-------------------- |
| select | Function({value: string, id: string}) | -    | 触发选中建议       | [基本用法](#基本用法) |
| change | Function(value: string)               | -    | 输入框 change 事件 | [异步加载](#异步加载) |
