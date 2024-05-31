# ActionTimeline 操作时间轴

用于展示命令执行情况及时间。

### 基本用法

默认布局为横向布局，从左往右分为三个区域，图标，内容区，时间

:::demo

```vue
<template>
  <d-action-timeline :data="timeData" :load-more-config="loadMoreConfig" @action-load-more="onLoadMore">
    <template #content="page">
      <div style="display:flex;flex-direction:column">
        <div style="height:24px;line-height:24px;">{{ page.option.action }}</div>
        <div>{{ page.option.actionContent }}</div>
      </div>
    </template>
  </d-action-timeline>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const timeData = [
      {
        time: '2022-07-01',
        actions: [
          {
            action: '实现具体操作',
            actionContent: '操作内容1',
            createdAt: '2022-07-01T07:30:09.681Z',
            icon: 'icon-closed-merge',
            status: 'color-none',
          },
          {
            action: '实现具体操作',
            actionContent: '操作内容2',
            createdAt: '2022/07/01 15:21:54 GMT+08:00',
            icon: 'icon-merge-request',
            status: 'color-info',
          },
        ],
      },
      {
        time: '2022-06-30',
        actions: [
          {
            action: '实现具体操作',
            actionContent: '操作内容3',
            createdAt: '2022-06-30 21:39:25',
            icon: 'icon-add-member',
            status: 'color-success',
          },
          {
            action: '实现具体操作',
            actionContent: '操作内容4',
            createdAt: 'Fri Jun 30 2022 15:21:54 GMT+0800（中国标准时间）',
            icon: 'icon-remove-member-icon',
            status: 'color-danger',
          },
        ],
      },
    ];
    const loadMoreConfig = {
      loadMore: true,
      loadMoreText: 'Check More',
    };
    const onLoadMore = () => {
      console.log('load more');
    };

    return {
      timeData,
      loadMoreConfig,
      onLoadMore,
    };
  },
});
</script>
```

:::

### 纵向布局

使用纵向布局，从上往下分为 title 区域和 content 区域。

:::demo

```vue
<template>
  <d-action-timeline :data="timeData" :load-more-config="loadMoreConfig" layout="vertical" :show-tail-line="false">
    <template #title="page">
      <div>{{ page.option.action }}</div>
    </template>
    <template #content="page">
      <div class="custom-content">{{ page.option.actionContent }}</div>
    </template>
  </d-action-timeline>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const timeData = [
      {
        time: '2022-07-01',
        actions: [
          {
            action: '操作信息',
            actionContent: '操作内容1',
            createdAt: '2022-07-01T07:30:09.681Z',
            icon: 'icon icon-dot-status',
            status: 'color-danger',
          },
          {
            action: '操作信息',
            actionContent: '操作内容2',
            icon: 'icon icon-dot-status',
            status: 'color-success',
            createdAt: '2022/07/01 9:38:00',
          },
        ],
      },
      {
        time: '2022-06-30',
        actions: [
          {
            action: '操作信息',
            actionContent: '操作内容3',
            createdAt: '2022-06-30 21:39:25',
            icon: 'icon icon-dot-status',
            status: 'color-none',
          },
          {
            action: '操作信息',
            actionContent: '操作内容4',
            createdAt: 'Fri Jun 30 2022 15:21:54 GMT+0800（中国标准时间）',
            icon: 'icon icon-dot-status',
            status: 'color-info',
          },
          {
            action: '操作信息',
            actionContent: '操作内容5',
            createdAt: 'Fri Jun 30 2022 15:21:54 GMT+0800（中国标准时间）',
            icon: 'icon icon-dot-status',
            status: 'color-warning',
          },
        ],
      },
    ];
    const loadMoreConfig = {
      type: 'button',
    };
    return {
      timeData,
      loadMoreConfig,
    };
  },
});
</script>

<style scoped>
.custom-content {
  background: #fff;
  box-shadow: var(--devui-shadow-length-base, 0 1px 4px 0) var(--devui-feedback-overlay-shadow, rgba(37, 43, 58, 0.16));
  border-radius: 4px;
  margin-left: 32px;
  margin-top: 12px;
  padding: 12px 20px;
}
</style>
```

:::

### 自定义Icon位置的代码

icon区域想要自定义样式和事件，可以通过iconContent插槽实现。

:::demo

```vue
<template>
  <d-action-timeline :data="timeData" :load-more-config="loadMoreConfig" layout="vertical" :show-tail-line="false">
    <template #title="page">
      <div>{{ page.option.action }}</div>
    </template>
    <template #content="page">
      <div class="custom-content">{{ page.option.actionContent }}</div>
    </template>
    <template #iconContent="page">
      <d-tooltip position="top" :content="page.option.iconDes">
        <div class="custom-icon">{{ page.option.icon }}</div>
      </d-tooltip>
    </template>
  </d-action-timeline>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const timeData = [
      {
        time: '2022-07-01',
        actions: [
          {
            action: '操作信息',
            actionContent: '操作内容1',
            createdAt: '2022-07-01T07:30:09.681Z',
            icon: 'A',
            iconDes: '该事件发生在2022-07-01 07:30:09，进行了操作内容1的调整',
          },
          {
            action: '操作信息',
            actionContent: '操作内容2',
            icon: 'B',
            createdAt: '2022/07/01 9:38:00',
            iconDes: '该事件发生在2022/07/01 9:38:00，进行了操作内容2的调整',
          },
        ],
      },
      {
        time: '2022-06-30',
        actions: [
          {
            action: '操作信息',
            actionContent: '操作内容3',
            createdAt: '2022-06-30 21:39:25',
            icon: 'C',
            iconDes: '该事件发生在2022-06-30 21:39:25，进行了操作内容3的调整',
          },
          {
            action: '操作信息',
            actionContent: '操作内容4',
            createdAt: 'Fri Jun 30 2022 15:21:54 GMT+0800（中国标准时间）',
            icon: 'D',
            iconDes: '该事件发生在Fri Jun 30 2022 15:21:54，进行了操作内容4的调整',
          },
          {
            action: '操作信息',
            actionContent: '操作内容5',
            createdAt: 'Fri Jun 30 2022 15:21:54 GMT+0800（中国标准时间）',
            iconDes: '该事件发生在Fri Jun 30 2022 15:21:54，进行了操作内容5的调整',
            icon: 'E',
          },
        ],
      },
    ];
    const loadMoreConfig = {
      type: 'button',
    };
    return {
      timeData,
      loadMoreConfig,
    };
  },
});
</script>

<style scoped>
.custom-content {
  background: #fff;
  box-shadow: var(--devui-shadow-length-base, 0 1px 4px 0) var(--devui-feedback-overlay-shadow, rgba(37, 43, 58, 0.16));
  border-radius: 4px;
  margin-left: 32px;
  margin-top: 12px;
  padding: 12px 20px;
}
.custom-icon {
  width: 24px;
  height: 24px;
  background: #abcdef;
  border-radius: 50%;
  line-height: 24px;
  text-align: center;
  color: #FFFFFF;
  position: relative;
  margin-right: 8px;
  z-index: 3;
}
</style>
```

:::

### ActionTimeline 参数

| 参数名                 | 类型                              | 默认值     | 说明                               |
| :--------------------- | :-------------------------------- | :--------- | :--------------------------------- |
| data                   | [ActionData[]](#actiondata)       | --         | 必选，展示操作数据                 |
| layout                 | [TimelineLayout](#timelinelayout) | horizontal | 可选，选择横向还是纵向布局         |
| load-more-config       | [LoadMoreConfig](#loadmoreconfig) | --         | 可选，是否显示加载更多             |
| show-tail-line         | `boolean`                         | true       | 可选，是否显示列表最后一项的时间线 |
| show-status-bg-color   | `boolean`                         | false      | 可选，是否显示状态图标背景色       |
| show-status-line-color | `boolean`                         | false      | 可循啊，是否显示时间轴状态色       |

### ActionTimeline 事件

| 事件名           | 回调参数     | 说明                   |
| :--------------- | :----------- | :--------------------- |
| action-load-more | `Function()` | 点击加载更多触发的事件 |

### ActionTimeline 插槽

| 插槽名  | 参数                     | 说明                                         |
| :------ | :----------------------- | :------------------------------------------- |
| content | `{ option: ActionItem }` | 必选，内容区域插槽                           |
| title   | `{ option: ActionItem }` | 标题区域插槽，横向布局时可选，纵向布局时必选 |
| iconContent   | `{ option: ActionItem }` | 可选，图标区域插槽 |

### 接口定义

#### ActionItem

```ts
interface ActionItem {
  action?: string;
  actionContent?: string;
  createdAt?: string;
  icon?: string;
  status?: 'color-none' | 'color-danger' | 'color-info' | 'color-success';
  [k: string]: any;
}
```

#### ActionData

```ts
interface ActionData {
  time?: string;
  actions?: ActionItem[];
}
```

#### LoadMoreConfig

```ts
interface LoadMoreConfig {
  type?: string;
  loadMore?: boolean;
  isToTop?: boolean;
  loadMoreText?: string;
  toTopText?: string;
}
```

#### TimelineLayout

```ts
type TimelineLayout = 'horizontal' | 'vertical';
```
