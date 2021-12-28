# ReadTip 阅读提示

阅读提示组件。

### 何时使用

当html文档中需要对特定内容进行提示时使用。


### 基本用法
通过设置selector选择需要显示readtip的元素，传入title和content设置显示的内容。
:::demo 

```vue
<template>
  <d-read-tip :readTipOptions="readTipOptions" >
    <h1>Let's see how to use ReadTip</h1>
    <p class="readtip-content">Set selector to display readtip</p>
    <p>The following is the target you want to show readtip</p>
    <span class="readtip-target">@Jack</span>
  </d-read-tip >
</template>

<script setup>
const readTipOptions =  {
    trigger: 'hover',
    rules: {
      trigger: 'hover',
      position:'top',
      selector: '.readtip-target',
      title: 'Name: Jack',
      content: 'This is Jack\'s profile',
    },
  };
</script>

<style>
.source{
  overflow: visible;
}
.readtip-container {
  padding: 12px;
}

.readtip-target {
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
}

.readtip-target:hover {
  text-decoration: underline;
}

</style>
```

:::

### 包括多个提示的readtip
传入多个rule，设置不同元素的readtip显示模式。
:::demo 

```vue
<template>
  <d-read-tip :readTipOptions="readTipOptions" >
    <h1>Multiple Readtips</h1>
    <h2 class="introduction">You can pass in multiple rules to display different readtips</h2>
    <p class="first-content">Click here to display first content</p>
    <p class="second-content">Click here to display second content</p>
    <h3 class="third-content">Hover here to display third content</h3>
    <h3 class="third-content">Hover here to display third content</h3>
  </d-read-tip >
</template>

<script setup>
const readTipOptions =  {
    trigger: 'click',
    showAnimate: false,
    mouseenterTime: 100,
    mouseleaveTime: 100,
    position: 'top',
    overlayClassName: 'read-tip-container',
    appendToBody: false,
    rules: [
      {
        selector: '.first-content',
        position: 'top',
        title: 'This Is the First Title',
        content: 'Lorem ipsum dolor sit amet, consectetur ad.',
        overlayClassName:'red',
      },
      {
        selector: '.second-content',
        position: 'left',
        title: 'This Is the Second Title',
        content: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra',
        overlayClassName: 'child-class',
        overlayClassName:'red',
      },
      {
        trigger: 'hover',
        selector: '.third-content',
        position: 'bottom',
        title: 'This Is the Third Title',
        content: 'Aenean libero urna, scelerisque tincidunt',
      }, 
      {
        trigger: 'hover',
        selector: '.four-content',
        position: 'right',
        title: 'This Is the Third Title',
        content: 'Aenean libero urna, scelerisque tincidunt',
      },
    ],
  };

</script>

<style>
.source{
  overflow: visible;
}
.readtip-container {
  padding: 12px;
}

.readtip-target {
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
}

.readtip-target:hover {
  text-decoration: underline;
}

.first-content {
  font-weight: bold;
  margin-bottom: 4px;
  cursor: pointer;
}

.second-content {
  font-weight: bold;
  cursor: pointer;
}

.third-content {
  cursor: pointer;
}

.red {
  color: red
}
</style>
```

:::




### 传入模板显示内容
可以通过传入template自定义需要显示的内容，传入template时不必再传入title和content。
:::demo 

```vue
<template>
  <d-read-tip :readTipOptions="readTipOptions" >
    <h1>You can also pass in template</h1>
    <p class="readtip-content">Write your own template</p>
    <p>The following is the target you want to show readtip</p>
    <h3 class="readtip-target2">DEVUI Course</h3>
    <h3 class="readtip-target2">Another DEVUI Course with same class name</h3>
    <template #contentTemplate>
      <d-card class="d-card">
        <template #cardAvatar>
          <d-avatar name="DevUI"></d-avatar>
        </template>
        <template #cardTitle>
          DEVUI Course
        </template>
        <template #cardSubtitle class="read-tip-demo-icon">
          <d-icon name="company-member"></d-icon><span>DevUI</span>
        </template>
        <template #cardContent>
          DEVUI is a free open-source and common solution for the front end of enterprise mid- and back-end products. Its design values are basedon...
        </template>
        <template #cardActions>
          <div class="card-block">
            <d-icon name="like"></d-icon ><span>12</span>
          </div>
          <div class="card-block">
            <d-icon name="star-o"></d-icon ><span>8</span>
          </div>
          <div class="card-block">
            <d-icon name="message"></d-icon ><span>8</span>
          </div>
        </template>
      </d-card>  
    </template>
  </d-read-tip >
</template>

<script setup>
const readTipOptions =  {
    trigger: 'click',    
    rules: {
      trigger: 'click',
      position:'top',
      selector: '.readtip-target2',
      title: 'Name: Jack',
      content: 'This is Jack\'s profile',
    },
  };
</script>

<style>
.read-tip-demo-icon {
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
  vertical-align: middle;
}
.read-tip-demo-icon + span {
  vertical-align: middle;
}
.card-block {
  margin-right: 16px;
  i{
    cursor: pointer;
    font-size: 16px;
    margin-right: 8px;
    vertical-align: middle;
  }
  i + span {
    vertical-align: middle;
  }
}
.d-card {
  cursor: pointer;
  transition:
    box-shadow .3s cubic-bezier(.645,.045,.355,1),
    transform .3s cubic-bezier(.645,.045,.355,1);
  &:hover {
    box-shadow: 0 4px 16px 0 rgba(0,0,0,.1);
    transform: translateY(-5px);
  }
}
.card-container {
  width: 350px;
}
.action-text {
  color: #8a8e99;
}
</style>
```

:::

### 异步获取数据

:::demo 

```vue
<template>
  <d-read-tip :readTipOptions="readTipOptions" >
    <h1>You can pass data asynchronously</h1>
  <p class="readtip-content">Using function fullElement to pass data</p>
  <p>The following is the target you want to show readtip</p>
  <h4 class="readtip-target">Display readtip</h4>
  </d-read-tip>
</template>

<script setup>
const readTipOptions =   {
    trigger: 'click',
    rules: { 
      selector: 'h4',
      trigger: 'click', 
      dataFn: getDataFromDB,
      key: 'GetData' },
  };
function getDataFromDB ({ element, rule }) {
    return { content: element.innerHTML, title: rule.key }
  }
</script>

<style>
.readtip-container {
  padding: 12px;
}

.readtip-target {
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
}

.readtip-target:hover {
  text-decoration: underline;
}
.red {
  color: red
}
</style>
```

:::

### d-read-tip

d-read-tip 参数

| 参数                 | 类型               | 默认 | 说明                            | 跳转 Demo                                       | 全局配置项 |
| -------------------- | ------------------ | ---- | ------------------------------- | ----------------------------------------------- | ---------- |
| readTipOptions       | ReadTipOptions     | --   | 必选，配置提示选项              | [基本用法](#基本用法)                           | --         |
| readTipOptions.rules | ReadTipRules       | --   | 必选，配置 readtip 内容         | [包括多个提示的readtip](#包括多个提示的readtip) | --         |
| contentTemplate      | `TemplateRef<any>` | --   | 可选，传入模板显示 readtip 内容 | [传入模板显示内容](#传入模板显示内容)           | --         |



```
export interface ReadTipOptions {
  trigger?: 'hover' | 'click'; // 默认值是 hover
  showAnimate?: boolean; // 默认值是 false
  mouseenterTime?: number; // 默认值是 100
  mouseleaveTime?: number; // 默认值是 100
  position?: PositionType | PositionType[]; // 默认值是 'top'
  overlayClassName?: string; // 默认值为空字符串
  appendToBody?: boolean; // 默认值为true
  rules: ReadTipRules;
}
export type ReadTipRules = ReadTipRule | ReadTipRule[];

export interface ReadTipRule {
  key?: string;
  selector: string;
  trigger?: 'hover' | 'click'; // 可以继承自 ReadTipOptions
  title?: string;
  content?: string;
  showAnimate?: boolean; // 可以继承自 ReadTipOptions
  mouseenterTime?: number; // 可以继承自 ReadTipOptions
  mouseleaveTime?: number; // 可以继承自 ReadTipOptions
  position?: PositionType | PositionType[]; // 可以继承自 ReadTipOptions
  overlayClassName?: string; // 可以继承自 ReadTipOptions
  appendToBody?: boolean; //可以继承自 ReadTipOtions
  //customData与template搭配使用，customData为传入模板的上下文，可以自定义模板内容
  dataFn?: ({
    element,
    rule: ReadTipRule,
  }) => Observable<{ title?: string; content?: string; template?: TemplateRef<any>; customData?: any }>;
}
```

