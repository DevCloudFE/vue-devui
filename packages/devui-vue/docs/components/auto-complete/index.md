# AutoComplete 自动补全

联想用户可能需要的输入结果。

#### 何时使用

当需要根据用户输入的部分字符推断出他可能想要输入的内容时。

### 基本用法

通过 source 设置自动完成的数据源。
:::demo

```vue
<template>
  <d-auto-complete
    :delay="1000"
    :source="source"
    v-model="value"
    :allow-empty-value-search="allowEmptyValueSearch"
    :select-value="selectValue"
    :trans-input-focus-emit="transInputFocusEmit"
    :position="position"
    :width="420"
    :append-to-body="false"
  >
  </d-auto-complete>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref('');
    const allowEmptyValueSearch = ref(true);
    const source = ref([
      'C#',
      'C',
      'C++',
      'CPython',
      'Java',
      'JavaScript',
      'Go',
      'Python',
      'Ruby',
      'F#',
      'TypeScript',
      'SQL',
      'LiveScript',
      'CoffeeScript',
    ]);
    const selectValue = (e) => {
      console.log('selectValue', e);
    };
    const transInputFocusEmit = () => {
      console.log('transInputFocusEmit');
    };
    const position = ref(['bottom']);
    return {
      value,
      source,
      allowEmptyValueSearch,
      transInputFocusEmit,
      selectValue,
      position,
    };
  },
});
</script>

<style></style>
```

:::

### 尺寸

支持`sm`、`md`、`lg`三种尺寸，默认为`md`。

:::demo

```vue
<template>
  <h4>Small</h4>
  <d-auto-complete size="sm" :source="source" v-model="value1" :width="420"> </d-auto-complete>
  
  <h4>Middle</h4>
  <d-auto-complete :source="source" v-model="value2" :width="420"> </d-auto-complete>
  
  <h4>Large</h4>
  <d-auto-complete size="lg" :source="source" v-model="value3" :width="420"> </d-auto-complete>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref('');
    const source = ref(['C#', 'C', 'C++']);
    return {
      value1,
      value2,
      value3,
      source,
    };
  },
});
</script>

<style></style>
```

:::

### 设置禁用

通过 disabled 设置是否禁用。
:::demo

```vue
<template>
  <d-row type="flex">
    <d-col :flex="4">
      <d-auto-complete :source="source" v-model="value" :disabled="isDisabled"> </d-auto-complete>
    </d-col>
    <d-col :flex="2">
      <d-button id="primaryBtn" @click="toggle" style="margin-left:10px">
        {{ isDisabled ? '点击启用' : '点击禁用' }}
      </d-button>
    </d-col>
  </d-row>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref('');
    const source = ref([
      'C#',
      'C',
      'C++',
      'CPython',
      'Java',
      'JavaScript',
      'Go',
      'Python',
      'Ruby',
      'F#',
      'TypeScript',
      'SQL',
      'LiveScript',
      'CoffeeScript',
    ]);
    const isDisabled = ref(false);
    function toggle() {
      isDisabled.value = !isDisabled.value;
    }
    return {
      value,
      source,
      isDisabled,
      toggle,
    };
  },
});
</script>

<style></style>
```

:::

### 自定义数据匹配方法

通过 search-fn 自定义数据的匹配方法和返回的数据格式。
:::demo

```vue
<template>
  <d-auto-complete v-model="value" :search-fn="searchFn" disabled-key="disabled" is-searching :delay="1000" :formatter="formatter">
    <template #searching="slotProps">
      <div>
        {{ `searching: ${slotProps}` }}
      </div>
    </template>
  </d-auto-complete>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref('');
    const mySource = ref([
      {
        label: 'C#',
        disabled: false,
      },
      {
        label: 'C++',
        disabled: false,
      },
      {
        label: 'CPython',
        disabled: false,
      },
      {
        label: 'Java',
        disabled: false,
      },
      {
        label: 'JavaScript',
        disabled: false,
      },
      {
        label: 'Go',
        disabled: false,
      },
      {
        label: 'Ruby',
        disabled: false,
      },
      {
        label: 'F#',
        disabled: false,
      },
      {
        label: 'TypeScript',
        disabled: false,
      },
      {
        label: 'SQL',
        disabled: true,
      },
      {
        label: 'LiveScript',
        disabled: false,
      },
      {
        label: 'CoffeeScript',
        disabled: false,
      },
    ]);
    const formatter = (item) => {
      return item.label;
    };
    //trem：input输入内容
    const searchFn = async (trem) => {
      let arr = [];
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      mySource.value.forEach((item) => {
        let cur = item.label;
        cur = cur.toLowerCase();
        if (cur.startsWith(trem)) {
          arr.push(item);
        }
      });
      return arr;
    };
    return {
      value,
      searchFn,
      formatter,
    };
  },
});
</script>

<style></style>
```

:::

### 自定义模板展示

通过 item、nothing 自定义下拉框和无匹配提示。
:::demo

```vue
<template>
  <d-auto-complete :source="source" v-model="value">
    <template #item="slotProps">
      <div>第{{ slotProps.index }}项: {{ slotProps.item }}</div>
    </template>
    <template #nothing="slotProps">
      <div>
        {{ `没有匹配项: ${slotProps}` }}
      </div>
    </template>
  </d-auto-complete>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref('');
    const source = ref([
      'C#',
      'C',
      'C++',
      'CPython',
      'Java',
      'JavaScript',
      'Go',
      'Python',
      'Ruby',
      'F#',
      'TypeScript',
      'SQL',
      'LiveScript',
      'CoffeeScript',
    ]);

    return {
      value,
      source,
    };
  },
});
</script>

<style></style>
```

:::

### 最近输入

通过 latest-source 设置最近输入。

:::demo

```vue
<template>
  <d-auto-complete :source="source" v-model="value" :latest-source="latestSource"> </d-auto-complete>
</template>

<script>
import { defineComponent, ref, toRefs, getCurrentInstance } from 'vue';
export default defineComponent({
  setup() {
    const value = ref('');
    const latestSource = ref(['JavaScript', 'TypeScript']);
    const source = ref([
      'C#',
      'C',
      'C++',
      'CPython',
      'Java',
      'JavaScript',
      'Go',
      'Python',
      'Ruby',
      'F#',
      'TypeScript',
      'SQL',
      'LiveScript',
      'CoffeeScript',
    ]);

    return {
      value,
      source,
      latestSource,
    };
  },
});
</script>

<style></style>
```

:::

### 启用懒加载

enable-lazy-load 开启懒加载

:::demo

```vue
<template>
  <d-auto-complete
    ref="autoCompleteRef"
    :source="source"
    v-model="value"
    enable-lazy-load
    :load-more="loadMore"
    scene-type="select"
    :value-parser="valueParser"
  >
  </d-auto-complete>
</template>

<script>
import { defineComponent, ref, toRefs, getCurrentInstance } from 'vue';
export default defineComponent({
  setup() {
    const value = ref('');
    const source = ref([
      'C#',
      'C',
      'C++',
      'CPython',
      'Java',
      'JavaScript',
      'Go',
      'Python',
      'Ruby',
      'F#',
      'TypeScript',
      'SQL',
      'LiveScript',
      'CoffeeScript',
      'C1',
      'C2',
      'C3',
      'C4',
      'C5',
      'C6',
      'C7',
    ]);
    const autoCompleteRef = ref(null);

    const loadMore = () => {
      setTimeout(() => {
        source.value.push('lazyData' + source.value.length);
        autoCompleteRef.value?.loadFinish();
      }, 3000);
    };
    const valueParser = (e) => {
      return e + '123';
    };
    return {
      value,
      source,
      loadMore,
      valueParser,
      autoCompleteRef,
    };
  },
});
</script>

<style></style>
```

:::

### AutoComplete 参数

| 参数名                   | 类型                                    | 默认                                      | 说明                                                              | 跳转 Demo                                              |
| :----------------------- | :-------------------------------------- | :---------------------------------------- | :---------------------------------------------------------------- | :----------------------------------------------------- |
| size                     | [`AutoCompleteSize`](#autocompletesize) | 'md'                                      | 可选，输入框尺寸，有三种选择`'lg'`,`'md'`,`'sm'`                  | [尺寸](#尺寸)                                          |
| placeholder              | `string`                                | 'Search'                                  | 可选，占位符                                                      | --                                                     |
| source                   | [`SourceType`](#sourcetype)             | --                                        | 必选，有 searchFn 的情况下可以不必选                              | [基本用法](#基本用法)                                  |
| allow-empty-value-search | `boolean`                               | false                                     | 可选，在绑定的输入框 value 为空时，是否进行搜索提示操作           | [基本用法](#基本用法)                                  |
| append-to-body           | `boolean`                               | false                                     | 可选，下拉弹出是否 append to body                                 | [基本用法](#基本用法)                                  |
| position                 | [`Placement`](#placement)               | `['bottom']`                              | 可选，指定下拉框与输入框的相对位置                                | [基本用法](#基本用法)                                  |
| disabled                 | `boolean`                               | false                                     | 可选，是否禁用指令                                                | [设置禁用](#设置禁用)                                  |
| delay                    | `number`                                | 300                                       | 可选，只有在 delay 时间经过后并且未输入新值，才做搜索查询（`ms`） | [基本用法](#基本用法)                                  |
| disabled-key             | `string`                                | --                                        | 可选，禁用单个选项                                                | [自定义数据匹配方法](#自定义数据匹配方法)              |
| formatter                | `(item: any) => string`                 | [`defaultFormatter`](#defaultFormatter)   | 可选，格式化函数                                                  | [自定义数据匹配方法](#自定义数据匹配方法)              |
| is-searching             | `boolean`                               | false                                     | 可选，是否在搜索中，用于控制 searchingTemplate 是否显示           | [自定义数据匹配方法](#自定义数据匹配方法)              |
| scene-type               | `string`                                | --                                        | 可选，值为 'select'、'suggest'                                    | [启用懒加载](#启用懒加载)                              |
| search-fn                | `(term: string) => Array<any>`          | [`defaultSearchFn`](#defaultSearchFn)     | 可选，自定义搜索过滤                                              | [自定义数据匹配方法](#自定义数据匹配方法)              |
| tips-text                | `string`                                | '最近输入'                                | 可选，提示文字                                                    | [设置禁用](#设置禁用)                                  |
| latest-source            | `Array<any>`                            | --                                        | 可选， 最近输入                                                   | [最近输入](#最近输入)                                  |
| value-parser             | `(item: any) => any`                    | [`defaultValueParse`](#defaultValueParse) | 可选， 对选中后数据进行处理                                       | [启用懒加载](#启用懒加载)                              |
| enable-lazy-load         | `boolean`                               | false                                     | 可选，是否允许懒加载                                              | [启用懒加载](#启用懒加载)                              |
| width                    | `number`                                | 400                                       | 可选，调整宽度（`px`）                                            | [基本用法](#基本用法)                                  |
| show-animation           | `boolean`                               | true                                      | 可选，是否开启动画                                                |                                                        |
| prefix                   | `string`                                | --                                        | 可选，自定义前缀图标                                              | [带图标的输入框](../input/index.md/#带图标的输入框)    |
| suffix                   | `string`                                | --                                        | 可选，自定义后缀图标                                              | [带图标的输入框](../input/index.md/#带图标的输入框)    |
| clearable                | `boolean`                               | false                                     | 可选，是否可清空                                                  | [参考 `d-input` 一键清空](../input/index.md/#一键清空) |

### AutoComplete 事件

| 参数                   | 类型              | 说明                                                                                                                                        | 跳转 Demo                 |
| :--------------------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------ |
| load-more              | `function`        | 懒加载触发事件，配合`enable-lazy-load`使用，<br>使用`$event.loadFinish()`关闭 loading 状态，<br>其中\$event 为 AutoCompleteComponent 的实例 | [启用懒加载](#启用懒加载) |
| select-value           | `function(value)` | 可选，选择选项之后的回调函数                                                                                                                | [基本用法](#基本用法)     |
| trans-input-focus-emit | `function`        | 可选，Input focus 时回调函数                                                                                                                | [基本用法](#基本用法)     |

### AutoComplete 插槽

| 插槽名    | 说明                                                                     | 跳转 Demo                                           |
| :-------- | :----------------------------------------------------------------------- | :-------------------------------------------------- |
| item      | 可选，自定义展示模板。slotProps：{ index: 下标索引, item: 当前项内容 }。 | [自定义模板展示](#自定义模板展示)                   |
| nothing   | 可选，没有匹配项的展示结果。slotProps：输入内容。                        | [自定义模板展示](#自定义模板展示)                   |
| searching | 可选，自定义搜索中显示模板。slotProps：输入内容。                        | [自定义数据匹配方法](#自定义数据匹配方法)           |
| prefix    | 可选，输入框头部内容                                                     | [带图标的输入框](../input/index.md/#带图标的输入框) |
| suffix    | 可选，输入框尾部内容                                                     | [带图标的输入框](../input/index.md/#带图标的输入框) |
| prepend   | 可选，输入框前置内容                                                     | [复合型输入框](../input/index.md/#复合型输入框)     |
| append    | 可选，输入框后置内容                                                     | [复合型输入框](../input/index.md/#复合型输入框)     |

### 类型定义

#### SourceType

```ts
interface SourceItemObj {
  label: string;
  disabled: boolean;
  [propName: string]: unknown;
}
type SourceType = Array<string> | Array<SourceItemObj>;
```

#### Placement

```ts
type Placement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';
```

#### defaultSearchFn

```ts
defaultSearchFn = (term: string) => {
  type ItemType = typeof source.value[0];
  const arr: ItemType[] = [];
  source.value.forEach((item) => {
    let cur = formatter.value(item as ItemType);
    cur = cur.toLowerCase();
    if (cur.startsWith(term)) {
      arr.push(item);
    }
  });
  return arr as SourceType;
};
```

term 为输入的关键字。

#### defaultFormatter

```ts
defaultFormatter = (item: string | SourceItemObj) => {
  if (typeof item === 'string') {
    return item;
  }
  return item !== null ? item.label || item.toString() : '';
};
```

item 为数据项。

#### defaultValueParse

```ts
defaultValueParse = (item) => item;
```

#### AutoCompleteSize

```ts
type AutoCompleteSize = 'sm' | 'md' | 'lg';
```
