# Collapse 折叠面板

通过折叠面板收纳内容区域

#### 何时使用

需要收纳内容区域的时候使用。

### 基本用法

可同时展开多个面板，面板之前不影响

:::demo

```vue
<template>
  <div class="collapse-demo">
    <d-collapse v-model="collapseValue">
      <d-collapse-item title="沉浸 Immersive" name="immersive">
        <div>
          沉浸式体验包括人的感官体验和认知体验，当用户的个人技能与面对的挑战互相匹配，并且长时间处在稳定状态时，用户达到心流状态并且不易被外界因素所干扰。
        </div>
      </d-collapse-item>
      <d-collapse-item title="灵活 Flexible" name="flexible">
        <div>
          自带各类完整的模板和典型场景，与此同时，DevUI提供超过50个独立原子级组件，用户可以自由组合，用小组件拼接出符合自身产品需要的分子级控件；
        </div>
        <div>可以根据自身的产品需求灵活选择，既可以直接使用现有的典型页面模板，也可以从小控件做起，利用现有资源拼接自己的页面。</div>
      </d-collapse-item>
      <d-collapse-item title="至简 Simple" name="simple" disabled>
        <div>坚持以用户为中心去进行设计，注重直观可达性，把服务示例化以帮助用户快速融入到使用中去。</div>
        <div>同时，DevUI提供大量的快捷键，并且图形化信息反馈和引导，简化使用的流程、降低使用的门槛。</div>
        <div>让用户能够所见即所得，做到快速上手，便捷实用。</div>
      </d-collapse-item>
    </d-collapse>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const collapseValue = ref(['immersive']);
    return {
      collapseValue,
    };
  },
});
</script>
<style>
.collapse-demo {
  margin-bottom: 20px;
}
</style>
```

:::

### 手风琴效果

每次只能展开一个面板，通过 `accordion` 属性设置

:::demo

```vue
<template>
  <div class="collapse-demo">
    <d-collapse v-model="collapseAccordionValue" accordion>
      <d-collapse-item title="沉浸 Immersive" name="immersive">
        <div>
          沉浸式体验包括人的感官体验和认知体验，当用户的个人技能与面对的挑战互相匹配，并且长时间处在稳定状态时，用户达到心流状态并且不易被外界因素所干扰。
        </div>
      </d-collapse-item>
      <d-collapse-item title="灵活 Flexible" name="flexible">
        <div>
          自带各类完整的模板和典型场景，与此同时，DevUI提供超过50个独立原子级组件，用户可以自由组合，用小组件拼接出符合自身产品需要的分子级控件；
        </div>
        <div>可以根据自身的产品需求灵活选择，既可以直接使用现有的典型页面模板，也可以从小控件做起，利用现有资源拼接自己的页面。</div>
      </d-collapse-item>
      <d-collapse-item title="至简 Simple" name="simple">
        <div>坚持以用户为中心去进行设计，注重直观可达性，把服务示例化以帮助用户快速融入到使用中去。</div>
        <div>同时，DevUI提供大量的快捷键，并且图形化信息反馈和引导，简化使用的流程、降低使用的门槛。</div>
        <div>让用户能够所见即所得，做到快速上手，便捷实用。</div>
      </d-collapse-item>
    </d-collapse>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const collapseAccordionValue = ref('immersive');
    return {
      collapseAccordionValue,
    };
  },
});
</script>
```

:::

### 自定义面板标题

通过 CollapseItem `title` 插槽设置

:::demo

```vue
<template>
  <div class="collapse-demo">
    <d-collapse v-model="collapseValue1">
      <d-collapse-item name="immersive">
        <template #title>
          沉浸 Immersive
          <d-icon name="like"></d-icon>
        </template>
        <div>
          沉浸式体验包括人的感官体验和认知体验，当用户的个人技能与面对的挑战互相匹配，并且长时间处在稳定状态时，用户达到心流状态并且不易被外界因素所干扰。
        </div>
      </d-collapse-item>
      <d-collapse-item title="灵活 Flexible" name="flexible">
        <div>
          自带各类完整的模板和典型场景，与此同时，DevUI提供超过50个独立原子级组件，用户可以自由组合，用小组件拼接出符合自身产品需要的分子级控件；
        </div>
        <div>可以根据自身的产品需求灵活选择，既可以直接使用现有的典型页面模板，也可以从小控件做起，利用现有资源拼接自己的页面。</div>
      </d-collapse-item>
      <d-collapse-item title="至简 Simple" name="simple">
        <div>坚持以用户为中心去进行设计，注重直观可达性，把服务示例化以帮助用户快速融入到使用中去。</div>
        <div>同时，DevUI提供大量的快捷键，并且图形化信息反馈和引导，简化使用的流程、降低使用的门槛。</div>
        <div>让用户能够所见即所得，做到快速上手，便捷实用。</div>
      </d-collapse-item>
    </d-collapse>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const collapseValue1 = ref('immersive');
    return {
      collapseValue1,
    };
  },
});
</script>
```

:::

### Collapse 参数

| 参数名    | 类型              | 默认  | 说明                                                              | 跳转 Demo                 |
| :-------- | :---------------- | :---- | :---------------------------------------------------------------- | :------------------------ |
| v-model   | `string \| array` | ''    | 必填，绑定值,当前激活的面板(手风琴模式下为 string， 其它为 array) | [基本用法](#基本用法)     |
| accordion | `boolean`         | false | 可选，设置是否手风琴效果                                          | [手风琴效果](#手风琴效果) |

### Collapse 事件

| 事件名 | 类型                               | 说明                                   | 跳转 Demo |
| :----- | :--------------------------------- | :------------------------------------- | :-------- |
| change | `(value: string \| array) => void` | 可选，折叠面板发生改变时触发的回调函数 |           |

### Collapse 插槽

| 名称    | 说明                                       |
| :------ | :----------------------------------------- |
| default | 自定义默认内容，一般为 CollapseItem 子组件 |

### Collapse Item 参数

| 参数名   | 类型               | 默认 | 说明                                      | 跳转 Demo             |
| :------- | :----------------- | :--- | :---------------------------------------- | :-------------------- |
| name     | `string \| number` | ''   | 必填，当前激活的面板唯一的标识符          | [基本用法](#基本用法) |
| title    | `string`           | ''   | 可选，面板的标题(与 `title` 插槽二选其一) | [基本用法](#基本用法) |
| disabled | `Boolean`          | ''   | 可选，当前面板是否禁用                    | [基本用法](#基本用法) |

### Collapse Item 插槽

| 名称    | 说明                   |
| :------ | :--------------------- |
| default | 自定义单个面板下展内容 |
| title   | 自定义单个面板标题内容 |
