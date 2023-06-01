# Dashboard 仪表盘

仪表盘组件支持各类挂件 grid 风格进行布局

### 何时使用

当需要进行批量不同类型数据展示时使用

### 基本用法

:::demo

```vue
<template>
  <d-form class="control__form">
    <p>Control first Widget</p>
    <d-button @click="changePosition">Random Position</d-button>
    <d-checkbox v-model="staticMode" :active-value="true" :inactive-value="false" label="static" />
    <d-checkbox v-model="widget.noMove" :active-value="true" :inactive-value="false" label="noMove" />
    <d-checkbox v-model="widget.noResize" :active-value="true" :inactive-value="false" label="noResize" />
    <d-checkbox v-model="widget.locked" :active-value="true" :inactive-value="false" label="locked" />
    <d-checkbox v-model="showGridBlock" :active-value="true" :inactive-value="false" label="showGridBlock" />
    <d-checkbox v-model="showWidgetBg" :active-value="true" :inactive-value="false" label="showWidgetBg" />
    <h4>minWidth:</h4>
    <d-input-number v-model="widget.minW" :min="0" :max="12"></d-input-number>
    <h4>minHeight:</h4>
    <d-input-number v-model="widget.minH" :min="0" :max="12"></d-input-number>
    <h4>maxWidth:</h4>
    <d-input-number v-model="widget.maxW" :min="0" :max="12"></d-input-number>
    <h4>maxHeight:</h4>
    <d-input-number v-model="widget.maxH" :min="0" :max="12"></d-input-number>
  </d-form>
  <div class="flex">
    <div class="my-trash-box">回收站</div>
    <div class="other-trash-box">回收站</div>
    <div class="new-widget">
      <div v-dashboard-dragin-widget="dragInOpts">
        <div class="grid-stack-item-content">drag me!</div>
      </div>
    </div>
  </div>
  <d-dashboard v-model:static="staticMode" :show-widget-bg="showWidgetBg" :show-grid-block="showGridBlock" trash-selector="other-trash-box" :acceptWidgets="false">
    <d-dashboard-widget
      v-model:x="widget.x"
      v-model:y="widget.y"
      v-model:w="widget.w"
      v-model:h="widget.h"
      v-model:no-resize="widget.noResize"
      v-model:no-move="widget.noMove"
      v-model:locked="widget.locked"
      v-model:min-w="widget.minW"
      v-model:min-h="widget.minH"
      v-model:max-w="widget.maxW"
      v-model:max-h="widget.maxH"
    >
      <d-countdown :value="deadline" />
    </d-dashboard-widget>
    <d-dashboard-widget @widgetResize="widgetResize" :w="3" :h="4">
      <div class="card">
        <h3>哈哈哈哈</h3>
      </div>
    </d-dashboard-widget>
    <d-dashboard-widget :data="{ myInfo: 'I\'m 3.' }">
      <template v-slot="node">{{ node ? node.data : '' }}</template>
    </d-dashboard-widget>
  </d-dashboard>
  <d-dashboard trash-selector=".my-trash-box">
    <d-dashboard-widget>xzxldl</d-dashboard-widget>
  </d-dashboard>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const staticMode = ref(false);

    const showGridBlock = ref(true);

    const showWidgetBg = ref(true);

    const widget = ref({
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      noResize: false,
      noMove: false,
      locked: false,
      minW: undefined,
      minH: undefined,
      maxW: undefined,
      maxH: undefined,
    });

    const deadline = ref(Date.now() + 100 * 1000);

    const getRandomSize = () => Math.floor(Math.random() * 6);

    const changePosition = () => {
      widget.value.x = getRandomSize();
      widget.value.y = getRandomSize();
      widget.value.w = getRandomSize();
      widget.value.h = getRandomSize();
    };

    const toggleResize = () => (widget.value.noResize = !widget.value.noResize);

    const toggleMove = () => (widget.value.noMove = !widget.value.noMove);

    const widgetResize = ({ w, h }) => {
      console.log('widget 2 resize:', w, ' x ', h);
    };

    const dragInOpts = {
      helper: (e) => {
        const newNode = e?.target?.cloneNode(true);
        const gridStackItemContent = document.createElement('div');
        gridStackItemContent.className = 'grid-stack-item-content';
        gridStackItemContent.innerText = newNode.innerText + 'hello';

        newNode.innerText = '';
        newNode.appendChild(gridStackItemContent);
        return newNode;
      },
    };

    return {
      deadline,
      widget,
      changePosition,
      toggleResize,
      toggleMove,
      widgetResize,
      showGridBlock,
      showWidgetBg,
      dragInOpts,
      staticMode,
    };
  },
});
</script>

<style>
.control__form {
  line-height: 32px;
  font-size: 24px;
}

.control__form .devui-checkbox {
  margin: 8px 0;
}

.card {
  width: 100%;
  height: 100%;
  padding: 16px;
  background: #fff;
}

.my-trash-box {
  width: 200px;
  height: 200px;
  background: pink;
  line-height: 200px;
  text-align: center;
}

.other-trash-box {
  width: 200px;
  height: 200px;
  background: orange;
  line-height: 200px;
  text-align: center;
}

.new-widget {
  width: 200px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: blue;
  border: 1px dashed #f5c015;
  margin-left: 32px;
}
</style>
```

:::

### Dashboard 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo | 全局配置项 |
| ---- | ---- | ---- | ---- | --------- | ---------- |
|      |      |      |      |           |            |
|      |      |      |      |           |            |
|      |      |      |      |           |            |

### Dashboard 事件

| 事件 | 类型 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | --------- |
|      |      |      |           |
|      |      |      |           |
|      |      |      |           |

### Dashboar-Widget 组件
