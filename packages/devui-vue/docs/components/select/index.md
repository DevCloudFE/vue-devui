# Select 下拉选择框

下拉选择框。

#### 何时使用

用户可以从多个选项中选择一项或几项；仅支持用户在下拉选项中选择和搜索系统提供的选项，不支持输入。

### 基本用法

通过`size`：`sm`，`md(默认)`，`lg`来设置`Select`大小，通过`overview`：`underlined`设置只有下边框样式
:::demo

```vue
<template>
  <div>
    <div class="mb-0">Small</div>
    <d-select class="mb-2" v-model="value1" :options="options" size="sm"></d-select>
    <div class="mb-0">Middle</div>
    <d-select class="mb-2" v-model="value2" :options="options"></d-select>
    <div class="mb-0">Large</div>
    <d-select class="mb-2" v-model="value3" :options="options" size="lg"></d-select>
    <div class="mb-0">Underlined</div>
    <d-select class="mb-2" v-model="value4" :options="options" size="lg" overview="underlined"></d-select>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref('');
    const value4 = ref('');
    const items = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive(items);
    return {
      value1,
      value2,
      value3,
      value4,
      options,
    };
  },
});
</script>
```

:::

### 多选

通过`multiple`：`true`来开启多选，通过设置`multiple-limit`来限制可以选择的数量
:::demo

```vue
<template>
  <div class="mb-0">基础多选</div>
  <d-select class="mb-2" v-model="value1" :options="options" :multiple="true" :multiple-limit="2" />
  <div class="mb-0">collapse-tags</div>
  <d-select class="mb-2" v-model="value2" :options="options" :multiple="true" :collapse-tags="true" />
  <div class="mb-0">collapse-tags-tooltip</div>
  <d-select class="mb-2" v-model="value3" :options="options" :multiple="true" :collapse-tags="true" :collapse-tags-tooltip="true" />
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref([]);
    const value2 = ref([]);
    const value3 = ref([]);
    const items = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive(items);

    return {
      value1,
      value2,
      value3,
      options,
    };
  },
});
</script>
```

:::

### 禁用

通过`disabled`：`true`来禁用`Select`，通过`option-disabled-key`来设置单个选项禁用，比如设置`disabled`字段，则对象上 disabled 为`true`时不可选择
:::demo

```vue
<template>
  <d-select class="mb-2" v-model="value1" :options="options1" :disabled="true" />
  <d-select class="mb-2" v-model="value2" :options="options2" option-disabled-key="disabled" />
  <d-select class="mb-2" v-model="value3" :options="options3" :multiple="true" option-disabled-key="notAllow" />
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref([]);
    const items = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options1 = reactive(items);
    const options2 = reactive([
      {
        name: 'Option 1',
        value: 0,
      },
      {
        name: 'Option 2',
        value: 1,
      },
      {
        name: 'Option 3',
        value: 2,
        disabled: true,
      },
    ]);
    const options3 = reactive([
      {
        name: 'Option 1',
        value: 0,
      },
      {
        name: 'Option 2',
        value: 1,
        notAllow: true,
      },
      {
        name: 'Option 3',
        value: 2,
      },
    ]);

    return {
      value1,
      value2,
      value3,
      options1,
      options2,
      options3,
    };
  },
});
</script>
```

:::

### 可清空

通过`allow-clear`：`true`来设置`Select`可清空
:::demo

```vue
<template>
  <d-select class="mb-2" v-model="value1" :options="options" :allow-clear="true" />
  <d-select v-model="value2" :options="options" :multiple="true" :allow-clear="true" />
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref([]);
    const items = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive(items);

    return {
      value1,
      value2,
      options,
    };
  },
});
</script>
```

:::

### 下拉列表显隐方法

通过`toggleChange`方法可以在代码中控制下拉列表的展示和隐藏。
:::demo

```vue
<template>
  <div>
    <d-button @click.stop="toggleChange" @pointerup.stop="() => {}"  class="mb-2">展开 / 隐藏</d-button>
    <d-select ref="demoSelect" v-model="toggleValue" :options="options"></d-select>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const toggleValue = ref('');
    const visitable = ref(false);
    const items = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive(items);
    const demoSelect = ref(null);
    const toggleChange = () => {
      visitable.value = !visitable.value;
      demoSelect.value.toggleChange(visitable.value);
    };
    return {
      toggleValue,
      options,
      demoSelect,
      toggleChange,
    };
  },
});
</script>
```

:::

### 自定义下拉面板显示

通过 d-option 设置单个内容
:::demo

```vue
<template>
  <div class="mb-0">d-option</div>
  <d-select class="mb-2" v-model="value1" :allow-clear="true">
    <d-option v-for="(item, index) in options.data" :key="index" :value="item.value" :name="item.name"></d-option>
  </d-select>
  <div class="mb-0">d-option自定义内容及样式</div>
  <d-select class="mb-2" v-model="value2" :allow-clear="true">
    <d-option v-for="(item, index) in options1.data" :key="index" :value="item">
      <div class="clear-float">
        <span style="float: left;">{{ item }}</span>
        <span style="float: right;">{{ index + 1 }}</span>
      </div>
    </d-option>
  </d-select>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    const items = new Array(6).fill(0).map((item, i) => {
      return {
        value: `Option ${i + 1}`,
        name: `Option ${i + 1}`,
      };
    });
    const items1 = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive({
      data: items,
    });
    const options1 = reactive({
      data: items1,
    });
    return {
      value1,
      value2,
      options,
      options1,
    };
  },
});
</script>
<style>
.clear-float:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
}
</style>
```

:::

### 将选项进行分组

通过 d-option-group 设置选项分组，它的 label 属性为分组名
:::demo

```vue
<template>
  <d-select v-model="groupValue" :allow-clear="true" class="select-option-group">
    <d-option-group label="分组一">
      <d-option v-for="(item, index) in options1.data" :key="index" :value="item.value" :name="item.name"></d-option>
    </d-option-group>
    <d-option-group label="分组二" :disabled="true">
      <d-option v-for="(item, index) in options2.data" :key="index" :value="item.value" :name="item.name"></d-option>
    </d-option-group>
  </d-select>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const groupValue = ref('');
    const items = new Array(6).fill(0).map((item, i) => {
      return {
        value: `Option ${i + 1}`,
        name: `Option ${i + 1}`,
      };
    });
    const items1 = new Array(6).fill(0).map((item, i) => {
      return {
        value: `Test ${i + 1}`,
        name: `Test ${i + 1}`,
      };
    });
    const options1 = reactive({
      data: items,
    });
    const options2 = reactive({
      data: items1,
    });
    return {
      groupValue,
      options1,
      options2,
    };
  },
});
</script>
<style>
.select-option-group {
  ul {
    padding: 0;
    li {
      list-style-type: none;
    }
  }
}
</style>
```

:::

### 筛选、搜索选项

可以利用筛选、搜索功能快速查找选项

添加 `filter` 属性开启筛选功能。传人值为 `true` 时，默认找出 `name` 属性包含输入值得选项。
如果希望通过其它筛选逻辑，`filter` 可传入一个 `Function`, 输入值发生变化时调用，参数为输入值。
添加 `remote` 属性开启远程搜索功能。当为远程搜索时，配合`loading` 属性使用，加载时显示`loading-text`定义文本。
:::demo

```vue
<template>
  <div class="mb-0">默认筛选</div>
  <d-select class="mb-2" v-model="value1" :allow-clear="true" filter>
    <d-option v-for="(item, index) in options.data" :key="index" :value="item.value" :name="item.name"></d-option>
  </d-select>
  <div class="mb-0">远程搜索</div>
  <d-select class="mb-2" v-model="value2" :allow-clear="true" :filter="filterFunc" remote placeholder="请输入搜索关键字" :loading="loading">
    <d-option v-for="(item, index) in options1.data" :key="index" :value="item.value" :name="item.name"></d-option>
  </d-select>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    const loading = ref(false);
    const items = new Array(6).fill(0).map((item, i) => {
      return {
        value: `Option ${i + 1}`,
        name: `Option ${i + 1}`,
      };
    });
    const options = reactive({
      data: items,
    });
    const options1 = reactive({
      data: [],
    });
    const filterFunc = (query) => {
      if (query) {
        loading.value = true;
        setTimeout(() => {
          options1.data = items.filter((item) => {
            return item.name.toLowerCase().includes(query.toLowerCase());
          });
          loading.value = false;
        }, 200);
      } else {
        options1.data = [];
      }
    };
    return {
      value1,
      value2,
      options,
      options1,
      loading,
      filterFunc,
    };
  },
});
</script>
```

:::

### 新增选项

添加 `allow-create` 属性开启新增选项功能。为了使 `allow-create` 正确的工作，`filter` 的值必须为 `true`。

:::demo

```vue
<template>
  <d-select v-model="value" :options="options" :allow-clear="true" multiple filter allow-create> </d-select>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref([]);
    const list = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive(list);
    return {
      value,
      options,
    };
  },
});
</script>
```

:::

### 远程加载数据

:::demo

```vue
<template>
  <d-select v-model="value" :options="options.data" :allow-clear="true" :loading="loading" @toggleChange="toggleChange"></d-select>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref([]);
    const list = new Array(6).fill(0).map((item, i) => `Option ${i + 1}`);
    const options = reactive({
      data: [],
    });
    const loading = ref(false);
    const toggleChange = (bool) => {
      if (bool) {
        loading.value = true;
        setTimeout(() => {
          options.data = list;
          loading.value = false;
        }, 3000);
      }
    };
    return {
      value,
      options,
      loading,
      toggleChange,
    };
  },
});
</script>
```

:::

### Select 参数

| 参数名                | 类型                  | 默认             | 说明                                                                                                                                                           | 跳转 Demo                         |
| :-------------------- | :-------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| options               | `array`               | []               | 可选, 和使用 option 子组件互斥，两者必须有且只有一个。                                                                                                         | [基本用法](#基本用法)             |
| multiple              | `boolean`             | false            | 可选,是否支持多选                                                                                                                                              | [多选](#多选)                     |
| size                  | `string`              | 'md'             | 可选,下拉选框尺寸,有三种选择'lg','md','sm'                                                                                                                     | [基本用法](#基本用法)             |
| disabled              | `boolean`             | false            | 可选,是否禁用下拉框                                                                                                                                            | [禁用](#禁用)                     |
| placeholder           | `string`              | '请选择'         | 可选,输入框的 placeholder                                                                                                                                      |                                   |
| overview              | `string`              | 'border'         | 可选,决定选择框样式显示,默认有边框'border','underlined'                                                                                                        | [基本用法](#基本用法)             |
| option-disabled-key   | `string`              | ''               | 可选,禁用单个选项;<br>当传入资源 options 类型为 Object,比如设置为'disabled',<br>则当对象的 disabled 属性为 true 时,该选项将禁用;<br>当设置为''时不禁用单个选项 | [禁用](#禁用)                     |
| allow-clear           | `boolean`             | false            | 可选, 配置是否允许清空选值，仅单选场景适用                                                                                                                     | [可清空](#可清空)                 |
| collapse-tags         | `boolean`             | false            | 可选, 配置是否允许将所选项合并为数量显示                                                                                                                       | [多选](#多选)                     |
| collapse-tags-tooltip | `boolean`             | false            | 可选, 配置是否启用鼠标悬停折叠文字以显示具体所选值                                                                                                             | [多选](#多选)                     |
| filter                | `boolean \| function` | false            | 可选, 配置是否开启筛选功能；配置为函数，为自定义搜索过滤方法                                                                                                   | [筛选、搜索选项](#筛选、搜索选项) |
| remote                | `boolean`             | false            | 可选, 配置是否启用远程搜索，配合 filter 函数使用                                                                                                               | [筛选、搜索选项](#筛选、搜索选项) |
| allow-create          | `boolean`             | false            | 可选, 配置是否启用新增选项，配合 filter 为 true 时使用                                                                                                         | [新增选项](#新增选项)             |
| no-data-text          | `string`              | '无数据'         | 可选, 无选项时显示的文本，也可通过 empty 插槽自定义                                                                                                            | [筛选、搜索选项](#筛选、搜索选项) |
| no-match-text         | `string`              | '找不到相关记录' | 可选, 搜索条件无匹配时显示的文本，也可通过 empty 插槽自定义                                                                                                    | [筛选、搜索选项](#筛选、搜索选项) |
| loading               | `boolean`             | false            | 可选, 配置下拉选项是否远程加载，配合 loading-text 使用                                                                                                         | [远程加载数据](#远程加载数据)     |
| loading-text          | `string`              | '加载中'         | 可选, 远程搜索时显示的文本                                                                                                                                     | [远程加载数据](#远程加载数据)     |
| multiple-limit        | `number`              | '0'              | 可选, multiple 属性设置为 true 时生效，表示用户最多可以选择的项目数， 为 0 则不限制                                                                            | [多选](#多选)                     |

### Select 事件

| 事件名        | 类型                      | 说明                                                           | 跳转 Demo |
| :------------ | :------------------------ | :------------------------------------------------------------- | :-------- |
| value-change  | `Function(data)`          | 可选，当选中值发生变化时触发，参数为目前选中的值(多选时为数组) |           |
| toggle-change | `Function(boolean)`       | 可选，下拉打开关闭 toggle 事件                                 |           |
| focus         | `Function(e: FocusEvent)` | 可选，获取焦点时触发                                           |
| blur          | `Function(e: FocusEvent)` | 可选，失去焦点时触发                                           |
| clear         | `Function()`              | 可选, 通过右侧删除图标清空所有选项时触发                       |
| remove-tag    | `Function(value)`         | 可选，多选时删除单个 tag 时触发，参数为当前 tag 的值           |

### Select 插槽

| 名称    | 说明                                              |
| :------ | :------------------------------------------------ |
| default | 自定义 Select 下拉面板内容（OptionGroup/ Option） |
| empty   | 自定义无选项时下拉面板内容                        |

### Select 方法

| 名称         | 说明                        | 跳转 Demo                             |
| :----------- | :-------------------------- | :------------------------------------ |
| focus        | 使选择器的输入框获取焦点    | -                                     |
| blur         | 使选择器的输入框失去焦点    | -                                     |
| toggleChange | 使选择器的下拉列表显示/隐藏 | [下拉列表显隐方法](#下拉列表显隐方法) |

### OptionGroup 参数

| 参数名   | 类型      | 默认  | 说明                             | 跳转 Demo                         |
| :------- | :-------- | :---- | :------------------------------- | :-------------------------------- |
| label    | `string`  | ''    | 可选，分组的组名                 | [将选项进行分组](#将选项进行分组) |
| disabled | `boolean` | false | 可选，是否禁用该分组下的所有选项 | [将选项进行分组](#将选项进行分组) |

### OptionGroup 插槽

| 名称    | 说明                             |
| :------ | :------------------------------- |
| default | 自定义单个选项显示内容（Option） |

### Option 参数

| 参数名   | 类型               | 默认  | 说明               | 跳转 Demo                                 |
| :------- | :----------------- | :---- | :----------------- | :---------------------------------------- |
| value    | `string \| number` | ''    | 必填，选项唯一标识 | [自定义下拉面板显示](#自定义下拉面板显示) |
| name     | `string`           | ''    | 可选，选项显示内容 | [自定义下拉面板显示](#自定义下拉面板显示) |
| disabled | `boolean`          | false | 可选，禁用单个选项 | [自定义下拉面板显示](#自定义下拉面板显示) |

### Option 插槽

| 名称    | 说明                   |
| :------ | :--------------------- |
| default | 自定义单个选项显示内容 |
