# List 列表

用于展示列表形态的一组数据。

### 基本用法

:::demo

```vue
<template>
  <d-list :data="data" bordered>
    <template #header>
      <div>header</div>
    </template>
    <template #footer>
      <div>footer</div>
    </template>
    <template #item="{ item }">
      <d-list-item>
        <d-list-item-meta description="Dev UI, 一个基于 DevUI Design 的 Vue3 组件库">
          <template #title>
            <a href="https://vue-devui.github.io/" target="_blank">{{ item.title }}</a>
          </template>
          <template #avatar>
            <d-avatar img-src="https://joeschmoe.io/api/v1/random" />
          </template>
        </d-list-item-meta>
      </d-list-item>
    </template>
  </d-list>
</template>

<script setup>
const data = [
  {
    title: 'Dev UI Title 1',
  },
  {
    title: 'Dev UI Title 2',
  },
  {
    title: 'Dev UI Title 3',
  },
  {
    title: 'Dev UI Title 4',
  },
];
</script>

<style>
a {
  color: #000000d9;
  transition: all 0.3s;
}
</style>
```

:::

### 不同尺寸

:::demo

```vue
<template>
  <d-radio-group direction="row" v-model="size">
    <d-radio value="sm">small</d-radio>
    <d-radio value="md">middle</d-radio>
    <d-radio value="lg">large</d-radio>
  </d-radio-group>
  <br />
  <d-list :data="data" :size="size" bordered>
    <template #item="{ item }">
      <d-list-item>
        <template #actions>
          <div>action</div>
          <div>action</div>
        </template>
        <template #extra>
          <div>extra</div>
        </template>
        <d-list-item-meta description="Dev UI, 一个基于 DevUI Design 的 Vue3 组件库 ">
          <template #title>
            <a href="https://vue-devui.github.io/" target="_blank">{{ item.title }}</a>
          </template>
          <template #avatar>
            <d-avatar img-src="https://joeschmoe.io/api/v1/random" />
          </template>
        </d-list-item-meta>
      </d-list-item>
    </template>
    <template #header>
      <div>header</div>
    </template>
    <template #footer>
      <div>footer</div>
    </template>
  </d-list>
</template>

<script setup>
import { ref } from 'vue';
const data = [
  {
    title: 'Dev UI Title 1 ',
  },
  {
    title: 'Dev UI Title 2',
  },
  {
    title: 'Dev UI Title 3',
  },
  {
    title: 'Dev UI Title 4',
  },
];
const size = ref('md');
</script>

<style>
a {
  color: #000000d9;
  transition: all 0.3s;
}
</style>
```

:::

### 竖排列表样式

:::demo

```vue
<template>
  <d-list :data="data" bordered layout="vertical">
    <template #header>
      <div>header</div>
    </template>
    <template #footer>
      <div>footer</div>
    </template>
    <template #item="{ item }">
      <d-list-item>
        <template #actions>
          <div>收藏</div>
          <div>评论</div>
          <div>点赞</div>
        </template>
        <template #extra>
          <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
        </template>
        <d-list-item-meta description="Dev UI, 一个基于 DevUI Design 的 Vue3 组件库">
          <template #title>
            <a href="https://vue-devui.github.io/" target="_blank">{{ item.title }}</a>
          </template>
          <template #avatar>
            <d-avatar img-src="https://joeschmoe.io/api/v1/random" />
          </template>
        </d-list-item-meta>
        <div>{{ item.content }}</div>
      </d-list-item>
    </template>
  </d-list>
</template>

<script setup>
const data = [
  {
    title: 'Dev UI Title 1',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
  {
    title: 'Dev UI Title 2',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
  {
    title: 'Dev UI Title 3',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
  {
    title: 'Dev UI Title 4',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
];

const actions = [{ text: '收藏' }, { text: '点赞' }, { text: '评论' }];
</script>

<style>
a {
  color: #000000d9;
  transition: all 0.3s;
}
</style>
```

:::

### 额外操作

:::demo

```vue
<template>
  <d-list :data="data" bordered>
    <template #item="{ item }">
      <d-list-item>
        <template #actions>
          <div>action</div>
          <div>action</div>
        </template>
        <template #extra>
          <div>extra</div>
        </template>
        <d-list-item-meta description="Dev UI, 一个基于 DevUI Design 的 Vue3 组件库 ">
          <template #title>
            <a href="https://vue-devui.github.io/" target="_blank">{{ item.title }}</a>
          </template>
          <template #avatar>
            <d-avatar img-src="https://joeschmoe.io/api/v1/random" />
          </template>
        </d-list-item-meta>
      </d-list-item>
    </template>
    <template #header>
      <div>header</div>
    </template>
    <template #footer>
      <div>footer</div>
    </template>
  </d-list>
</template>

<script setup>
import { ref } from 'vue';
const data = [
  {
    title: 'Dev UI Title 1 ',
  },
  {
    title: 'Dev UI Title 2',
  },
  {
    title: 'Dev UI Title 3',
  },
  {
    title: 'Dev UI Title 4',
  },
];
</script>

<style>
a {
  color: #000000d9;
  transition: all 0.3s;
}
</style>
```

:::

### 滚动触底

:::demo

```vue
<template>
  <d-list :data="data" bordered maxHeight="400" @scroll="handleScroll" @reach-bottom="reachBottom">
    <template #item="{ item }">
      <d-list-item>
        <template #actions>
          <div>action</div>
          <div>action</div>
        </template>
        <template #extra>
          <div>extra</div>
        </template>
        <d-list-item-meta description="Dev UI, 一个基于 DevUI Design 的 Vue3 组件库 ">
          <template #title>
            <a href="https://vue-devui.github.io/" target="_blank">{{ item.title }}</a>
          </template>
          <template #avatar>
            <d-avatar img-src="https://joeschmoe.io/api/v1/random" />
          </template>
        </d-list-item-meta>
      </d-list-item>
    </template>
    <template #header>
      <div>header</div>
    </template>
    <template #footer>
      <div>footer</div>
    </template>
  </d-list>
</template>

<script setup>
import { ref } from 'vue';
const data = [
  {
    title: 'Dev UI Title 1 ',
  },
  {
    title: 'Dev UI Title 2',
  },
  {
    title: 'Dev UI Title 3',
  },
  {
    title: 'Dev UI Title 4',
  },
  {
    title: 'Dev UI Title 5',
  },
  {
    title: 'Dev UI Title 6',
  },
  {
    title: 'Dev UI Title 7',
  },
  {
    title: 'Dev UI Title 8',
  },
];
const handleScroll = (val) => {
  console.log('滚动了:', val);
};
const reachBottom = () => {
  console.log('触底了');
};
</script>

<style>
a {
  color: #000000d9;
  transition: all 0.3s;
}
</style>
```

:::

### 无限加载

:::demo

```vue
<template>
  <d-list :data="data" bordered maxHeight="400" loadMore="加载中..." :loadMoreFn="loadMoreFn">
    <template #item="{ item }">
      <d-list-item>
        <template #actions>
          <div>action</div>
          <div>action</div>
        </template>
        <template #extra>
          <div>extra</div>
        </template>
        <d-list-item-meta description="Dev UI, 一个基于 DevUI Design 的 Vue3 组件库 ">
          <template #title>
            <a href="https://vue-devui.github.io/" target="_blank">{{ item.title }}</a>
          </template>
          <template #avatar>
            <d-avatar img-src="https://joeschmoe.io/api/v1/random" />
          </template>
        </d-list-item-meta>
      </d-list-item>
    </template>
    <template #header>
      <div>header</div>
    </template>
    <template #footer>
      <div>footer</div>
    </template>
  </d-list>
</template>

<script setup>
import { ref } from 'vue';
const data = ref([
  {
    title: 'Dev UI Title 1 ',
  },
  {
    title: 'Dev UI Title 2',
  },
  {
    title: 'Dev UI Title 3',
  },
  {
    title: 'Dev UI Title 4',
  },
  {
    title: 'Dev UI Title 5',
  },
]);
const loadMoreFn = () => {
  let count = data.value.length;
  for (let i = 0; i < 5; i++) {
    data.value.push({
      title: `Dev UI Title ${count + i + 1}`,
    });
  }
};
</script>

<style>
a {
  color: #000000d9;
  transition: all 0.3s;
}
</style>
```

:::

### 数据分页

:::demo

```vue
<template>
  <d-list :data="list" bordered :pagination="pagination" @pageIndexChange="pageIndexChange" @pageSizeChange="pageSizeChange">
    <template #item="{ item }">
      <d-list-item>
        <d-list-item-meta :description="item.desc">
          <template #title>
            <a href="https://vue-devui.github.io/" target="_blank">{{ item.name }}</a>
          </template>
          <template #avatar>
            <d-avatar :img-src="item.avatar" />
          </template>
        </d-list-item-meta>
        <div>创建时间: {{ item.createdAt }}</div>
      </d-list-item>
    </template>
    <template #header>
      <div>header</div>
    </template>
    <template #footer>
      <div>footer</div>
    </template>
  </d-list>
</template>

<script setup>
import { ref, computed } from 'vue';
const list = ref([]);
const current = ref(1);
const pageSize = ref(10);
const total = ref(0);

const pagination = computed(() => ({
  pageIndex: 1,
  pageSize: 10,
  pageSizeOptions: [10, 20, 30, 40, 50],
  total: total.value,
  canViewTotal: true,
  canChangePageSize: true,
  canJumpPage: true,
}));

const getData = () => {
  fetch(`https://proapi.azurewebsites.net//api/rule?current=${current.value}&pageSize=${pageSize.value}`)
    .then((res) => res.json())
    .then((res) => {
      list.value = res.data;
      total.value = res.total;
    });
};
getData();

const pageIndexChange = (val) => {
  current.value = val;
  getData();
};
const pageSizeChange = (val) => {
  pageSize.value = val;
  getData();
};
</script>

<style>
a {
  color: #000000d9;
  transition: all 0.3s;
}
</style>
```

:::

### List 参数

| 参数       | 类型                                                                                     | 默认         | 说明                         | 跳转 Demo                     |
| :--------- | :--------------------------------------------------------------------------------------- | :----------- | :--------------------------- | :---------------------------- |
| bordered   | `boolean`                                                                                | false        | 是否展示边框                 | [基本用法](#基本用法)         |
| data       | `any[]`                                                                                  | -            | 列表数据源                   | [基本用法](#基本用法)         |
| header     | `string` \| `slot`                                                                       | -            | 列表头部                     | [基本用法](#基本用法)         |
| header     | `string` \| `slot`                                                                       | -            | 列表头部                     | [基本用法](#基本用法)         |
| layout     | `horizontal` \| `vertical`                                                               | `horizontal` | 列表排列方式                 | [竖排列表样式](#竖排列表样式) |
| split      | `boolean`                                                                                | `false`      | 是否显示分割线               | [基本用法](#基本用法)         |
| size       | `sm` \| `md` \| `lg`                                                                     | `md`         | 列表尺寸                     | [不同尺寸](#不同尺寸)         |
| loading    | `boolean`                                                                                | `false`      | 列表是否加载中               | -                             |
| loadMore   | `string` \| `slot`                                                                       | -            | 加载更多                     | [加载更多](#无限加载)         |
| loadMoreFn | `function: () => void`                                                                   | -            | 加载更多方法                 | [加载更多](#无限加载)         |
| maxHeight  | `string` \| `number`                                                                     | -            | 表格最大高度                 | [滚动触底](#滚动触底)         |
| distance   | `string` \| `number`                                                                     | -            | 距离底部多少距离触发滚动触底 | -                             |
| pagination | [同分页属性](http://localhost:3000/components/pagination/#pagination-%E5%8F%82%E6%95%B0) | -            | 分页配置                     | [数据分页](#数据分页)         |

### List 事件

| 事件名            | 类型                        | 说明                                                 | 跳转 Demo             |
| :---------------- | :-------------------------- | :--------------------------------------------------- | :-------------------- |
| scroll            | (e: Event) => void          | 列表滚动事件，需设置`maxHeight`属性                  | [滚动触底](#滚动触底) |
| reach-bottom      | (e: Event) => void          | 列表滚动触底事件，需设置`maxHeight`属性              | [滚动触底](#滚动触底) |
| page-index-change | (pageIndex: number) => void | 页码变化的回调，需设置`pagination`属性               | [数据分页](#数据分页) |
| page-size-change  | (pageSize: number) => void  | 每页最大条目数量变更时的回调，需设置`pagination`属性 | [数据分页](#数据分页) |

### List 插槽

| 事件名 | 说明     | 参数                       |
| :----- | :------- | :------------------------- |
| item   | 列表选项 | { item }: 列表每一项的数据 |
| header | 头部内容 | -                          |
| footer | 底部内容 | -                          |

### ListItem 参数

| 参数  | 类型     | 默认 | 说明     | 跳转 Demo             |
| :---- | -------- | ---- | -------- | --------------------- |
| extra | `string` | -    | 额外内容 | [额外操作](#额外操作) |

### ListItem 插槽

| 事件名  | 说明             | 参数 |
| :------ | :--------------- | :--- |
| default | 列表选项默认内容 | -    |
| actions | 列表操作组       | -    |
| extra   | 列表选项额外内容 | -    |

### ListItemMeta 参数

| 参数        | 类型     | 默认 | 说明               | 跳转 Demo             |
| :---------- | -------- | ---- | ------------------ | --------------------- |
| title       | `string` | -    | 列表元素的标题     | [基本用法](#基本用法) |
| description | `string` | -    | 列表元素的描述内容 | [基本用法](#基本用法) |

### ListItemMeta 插槽

| 事件名      | 说明               | 参数 |
| :---------- | :----------------- | :--- |
| title       | 列表元素的标题     | -    |
| description | 列表元素的描述内容 | -    |
| avatar      | 列表元素的图标     | -    |
