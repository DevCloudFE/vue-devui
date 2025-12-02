# CategorySearch 分类搜索

按类型进行搜索，目前支持的类型包括：`radio`、`checkbox`、`label`、`textInput`，`numberRange`，`keyword`。

### 基本用法

:::demo

```vue
<template>
  <d-category-search
    :category="category"
    :selected-tags="selectedTags"
    search-key="basic"
    :default-search-field="defaultSearchField"
    :filter-name-rules="rules"
    placeholder="Click here to choose a filter condition"
    @search="onSearch"
    @selectedTagsChange="onSelectedTagsChange"
    @clearAll="onClearAll"
    @createFilter="onCreateFilter"
    @searchKeyChange="onSearchKeyChange"
  ></d-category-search>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const category = ref([
      {
        label: 'status',
        field: 'status',
        type: 'radio',
        group: 'Basic',
        filterKey: 'status',
        options: [
          { status: 'new' },
          { status: 'developing' },
          { status: 'completed' },
          { status: 'under acceptance' },
          { status: 'closed-loop' },
        ],
      },
      {
        label: 'checker',
        field: 'checker',
        type: 'checkbox',
        group: 'Personnel-related',
        filterKey: 'name',
        options: [
          { name: 'Jack', value: 'Jack' },
          { name: 'Tom', value: 'Tom' },
          { name: 'Jerry', value: 'Jerry' },
        ],
      },
      {
        label: 'tag',
        field: 'tag',
        type: 'label',
        group: 'Basic',
        filterKey: 'label',
        colorKey: 'color',
        options: [
          { label: 'Bug', color: '#f66f6a' },
          { label: 'Epic', color: '#5e7ce0' },
          { label: 'Story', color: '#50d4ab' },
        ],
      },
      {
        label: 'release version',
        field: 'releaseVersion',
        type: 'textInput',
        group: 'Basic',
        maxLength: 10,
        validateRules: [
          { required: true, message: '不能为空', trigger: 'change' },
          { min: 3, max: 10, message: '不小于3个字符，不大于6个字符', trigger: 'change' },
        ],
      },
      {
        label: 'commit number',
        field: 'commitNumber',
        type: 'numberRange',
        group: 'User-defined',
        min: { left: 0 },
        max: { left: 30, right: 50 },
        step: { left: 2, right: 3 },
        placeholder: { left: 'min', right: 'max' },
      },
    ]);
    const selectedTags = ref([
      {
        label: 'status',
        field: 'status',
        value: {
          status: 'developing',
          value: 'developing',
        },
      },
    ]);
    const defaultSearchField = ['creator', 'status'];
    const rules = [
      { required: true, message: '不能为空', trigger: 'change' },
      { min: 3, max: 16, message: '不小于3个字符，不大于6个字符', trigger: 'change' },
    ];

    const onSearch = (e) => {
      console.log('search items:', e);
    };
    const onSelectedTagsChange = (e) => {
      console.log('selected tags change', e);
    };
    const onClearAll = (e) => {
      console.log('clear all:', e);
    };
    const onCreateFilter = (e) => {
      console.log('create filter', e);
    };
    const onSearchKeyChange = (e) => {
      console.log('search key change:', e);
    };

    return {
      category,
      selectedTags,
      defaultSearchField,
      rules,
      onSelectedTagsChange,
      onClearAll,
      onCreateFilter,
      onSearchKeyChange,
      onSearch,
    };
  },
});
</script>
```

:::

### 自定义展示模板

:::demo 自定义分类下拉展示模板和选中后的标签展示模板。分类下拉展示模板的插槽名为`${field}Menu`，标签展示模板的插槽名为`${field}Tag`，`field`为分类的字段名；插槽参数为`category`参数中对应分类的数据。

```vue
<template>
  <d-category-search
    ref="categorySearchRef"
    :category="category"
    :selected-tags="selectedTags"
    search-key="custom"
    :default-search-field="defaultSearchField"
    :text-config="textConfig"
    :tag-max-width="160"
  >
    <template #statusMenu="scope">
      <ul class="dp-dropdown-menu-template">
        <li
          v-for="(item, index) in scope.tagOption.options"
          :key="index"
          :class="['dp-dropdown-item', { active: scope.tagOption.value.status === item.status }]"
          @click="() => chooseItem(scope.tagOption, item)"
        >
          <span>Status Name: {{ item.status }}</span>
        </li>
      </ul>
    </template>
    <template #tagTag="scope">
      <span>{{ scope.tag.label }}: </span>
      <template v-for="(item, index) in scope.tag.value.cache" :key="index">
        <span style="margin:0 4px">{{ index + 1 }}.</span>
        <span :style="{ color: item.color }">{{ item.label }}</span>
      </template>
    </template>
  </d-category-search>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const category = ref([
      {
        label: 'status',
        field: 'status',
        type: 'radio',
        group: 'Basic',
        filterKey: 'status',
        options: [
          { status: 'new' },
          { status: 'developing' },
          { status: 'completed' },
          { status: 'under acceptance' },
          { status: 'closed-loop' },
        ],
      },
      {
        label: 'tag',
        field: 'tag',
        type: 'label',
        group: 'Basic',
        filterKey: 'label',
        colorKey: 'color',
        options: [
          { label: 'Bug', color: '#f66f6a' },
          { label: 'Epic', color: '#5e7ce0' },
          { label: 'Story', color: '#50d4ab' },
        ],
      },
    ]);
    const selectedTags = ref([
      {
        label: 'status',
        field: 'status',
        value: {
          status: 'developing',
          value: 'developing',
        },
      },
    ]);
    const categorySearchRef = ref();
    const defaultSearchField = ['status'];
    const textConfig = {
      keywordName: '模糊查找',
      labelConnector: '&&',
    };
    const chooseItem = (tag, item) => {
      categorySearchRef.value.chooseItem(tag, item);
    };

    return { category, selectedTags, categorySearchRef, defaultSearchField, textConfig, chooseItem };
  },
});
</script>
```

:::

### 自定义扩展按钮

:::demo 自定义分类下拉展示模板和选中后的标签展示模板。分类下拉展示模板的插槽名为`${field}Menu`，标签展示模板的插槽名为`${field}Tag`，`field`为分类的字段名；插槽参数为`category`参数中对应分类的数据。

```vue
<template>
  <d-category-search
    ref="categorySearchRef"
    :category="category"
    :selected-tags="selectedTags"
    :default-search-field="defaultSearchField"
    :text-config="textConfig"
    :extend-config="extendConfig"
    :show-search-category="showSearchCategory"
    @selectedTagsChange="onSelectedTagsChange"
  >
    <template #operation>
      <div :class="['dp-category-search-icon reset', { disabled: !extendConfig.save.disabled }]" @click="reset">
        <svg width="14px" height="14px" viewBox="0 0 16 16">
          <title>reset status</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path
              d="M2.21674752,9.5653401 C3.07840863,12.7589841 6.38381399,14.6542343 9.59957703,13.7985 C11.2074586,13.3706328 12.4884935,12.3360318 13.2598504,11.0091921 L15,12.0069575 C13.9715241,13.7760771 12.2634775,15.1555451 10.1196355,15.7260346 C5.83195146,16.8670137 1.42474431,14.3400134 0.275862827,10.0818215 C-0.0982576084,8.69518874 -0.0807292122,7.29596891 0.261105679,6 L5.12807455,8.79061807 L2.21674752,9.5653401 L2.21674752,9.5653401 Z M15.7241372,5.91817855 C16.0982576,7.30481126 16.0807292,8.70403109 15.7388943,10 L10.8719255,7.20938193 L13.7832525,6.4346599 C12.9215914,3.24101592 9.61618601,1.34576568 6.40042297,2.20150001 C4.79254145,2.62936717 3.51150652,3.66396818 2.74014961,4.99080789 L1,3.99304254 C2.02847588,2.22392292 3.73652245,0.844454904 5.88036448,0.273965353 C10.1680485,-0.867013747 14.5752557,1.65998658 15.7241372,5.91817855 L15.7241372,5.91817855 Z"
              fill-rule="nonzero"
            ></path>
          </g>
        </svg>
      </div>
    </template>
  </d-category-search>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const category = ref([
      {
        label: 'status',
        field: 'status',
        type: 'radio',
        group: 'Basic',
        filterKey: 'status',
        options: [
          { status: 'new' },
          { status: 'developing' },
          { status: 'completed' },
          { status: 'under acceptance' },
          { status: 'closed-loop' },
        ],
      },
    ]);
    const selectedTags = ref([
      {
        label: 'status',
        field: 'status',
        value: {
          status: 'developing',
          value: 'developing',
        },
      },
    ]);
    const categorySearchRef = ref();
    const extendConfig = reactive({
      show: true,
      save: { disabled: false },
      customTemplate: undefined,
    });
    const defaultSearchField = ['status'];
    const textConfig = {
      createFilter: '自定义过滤器',
      filterTitle: '自定义过滤器标题',
      noCategoriesAvailable: '自定义无可用分类',
    };
    const showSearchCategory = reactive({
      keyword: false,
      fieldDescription: (label) => `添加至 ${label} `,
      category: false,
    });
    const onSelectedTagsChange = (event) => {
      console.log('selected tag', event);
      extendConfig.save.disabled = true;
    };
    const reset = () => {
      selectedTags.value = [
        {
          label: 'status',
          field: 'status',
          value: {
            status: 'developing',
            value: 'developing',
          },
        },
      ];
      extendConfig.save.disabled = false;
    };

    return {
      category,
      selectedTags,
      categorySearchRef,
      defaultSearchField,
      textConfig,
      extendConfig,
      showSearchCategory,
      onSelectedTagsChange,
      reset,
    };
  },
});
</script>
```

:::

### CategorySearch 参数

| 参数名               | 类型                                                                                                 | 默认值 | 说明                                                                                     | 跳转                              |
| :------------------- | :--------------------------------------------------------------------------------------------------- | :----- | :--------------------------------------------------------------------------------------- | :-------------------------------- |
| category             | [ICategorySearchTagItem[]](#icategorysearchtagitem)                                                  | []     | 必选，传入分类搜索源数据                                                                 | [基本用法](#基本用法)             |
| default-search-field | `String[]`                                                                                           | []     | 可选，配置输入关键字时可在哪些分类中筛选                                                 | [基本用法](#基本用法)             |
| selected-tags        | [ICategorySearchTagItem[]](#icategorysearchtagitem)                                                  | []     | 可选，传入需要默认选中的分类数据                                                         | [基本用法](#基本用法)             |
| search-key           | `string`                                                                                             | ''     | 可选，搜索框内的默认展示值                                                               | [基本用法](#基本用法)             |
| placeholder          | `string`                                                                                             | ''     | 可选， 自定义搜索输入框占位文字                                                          | [基本用法](#基本用法)             |
| input-read-only      | `boolean`                                                                                            | false  | 可选，是否可通过搜索框输入关键字搜索，`true`则无法输入关键字，仅可根据提供的分类数据筛选 |                                   |
| before-tag-change    | `(tag: ICategorySearchTagItem, searchKey: string, operation: string) => boolean \| Promise<boolean>` | --     | 可选，改变标签前调用的方法，返回 false 可以阻止分类值改变                                |                                   |
| show-search-category | `boolean \| SearchConfig`                                                                            | true   | 可选，是否显示搜索关键字下拉菜单                                                         |                                   |
| filter-name-rules    | `Record<string, any>[]`                                                                              | --     | 可选，配置保存过滤器标题的校验规则，详细规则参见 vue-devui 库的 form 组件                | [基本用法](#基本用法)             |
| text-config          | [TextConfig]                                                                                         | --     | 可选，配置组件默认文案                                                                   | [自定义展示模板](#自定义展示模板) |
| extend-config        | [ExtendConfig](#extendconfig)                                                                        | --     | 可选，配置右侧扩展按钮功能                                                               | [自定义扩展按钮](#自定义扩展按钮) |
| tag-max-width        | `number`                                                                                             | --     | 可选，单个过滤条件的最大宽度，超过则显示省略号，不设置则不限制                           | [自定义展示模板](#自定义展示模板) |
| append-to-body       | `boolean`                                                                                            | true   | 可选，下拉菜单是否 append to body                                                        |                                   |

### CategorySearch 事件

| 事件名             | 回调参数                      | 说明                                                         |
| :----------------- | :---------------------------- | :----------------------------------------------------------- |
| search             | `Function(SearchEvent)`       | 点击搜索按钮时触发，返回值为当前选中分类数据和搜索框中关键字 |
| selectedTagsChange | `Function(SelectedTagsEvent)` | 分类数据变更时触发，返回值为当前选中的分类数据               |
| createFilter       | `Function(CreateFilterEvent)` | 点击保存按钮时触发，返回值为当前选中分类数据和搜索框中关键字 |
| clearAll           | `Function(e:Event)`           | 点击清除按钮时触发，返回值为当前选中分类数据和搜索框中关键字 |
| searchKeyChange    | `Function(val: string)`       | 搜索关键字变更时触发，返回值为输入框的绑定值                 |

### CategorySearch 插槽

| 插槽名       | 说明                                                                                                                | 参数                                                       | 跳转                              |
| :----------- | :------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------- | :-------------------------------- |
| ${field}Menu | 自定义不同分类的下拉面板，`field`为分类的字段名，tagOption 参数为当前分类的数据，close 参数为关闭当前下拉面板的方法 | `{ tagOption: ICategorySearchTagItem, close: () => void }` | [自定义展示模板](#自定义展示模板) |
| ${field}Tag  | 自定义不同分类的选中标签，`field`为分类的字段名，tag 参数为当前分类的数据                                           | `{ tag: ICategorySearchTagItem }`                          | [自定义展示模板](#自定义展示模板) |
| clear        | 自定义清空图标                                                                                                      |                                                            |                                   |
| save         | 自定义保存图标                                                                                                      |                                                            |                                   |
| more         | 自定义更多图标                                                                                                      |                                                            |                                   |
| operation    | 自定义除`clear`、`save`、`more`外的其他图标                                                                         |                                                            | [自定义扩展按钮](#自定义扩展按钮) |
| searchIcon   | 自定义搜索图标                                                                                                      |                                                            |                                   |

### CategorySearch 方法

| 方法名              | 说明                                                                              | 参数                                                          |
| :------------------ | :-------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| chooseItem          | 调用组件方法处理选中数据，针对`radio`类型，参数为当前 tag 和选中项                | (tag: ICategorySearchTagItem, chooseItem: ITagOption) => void |
| chooseItems         | 调用组件方法处理选中数据，针对`checkbox \| label`类型，参数为当前 tag             | (tag: ICategorySearchTagItem) => void                         |
| getTextInputValue   | 调用组件方法处理选中数据，针对`textInput`类型，参数为当前 tag 和输入内容          | (tag: ICategorySearchTagItem, inputValue: string) => void     |
| getNumberRangeValue | 调用组件方法处理选中数据，针对`numberRange`类型，参数为当前 tag 和输入内容        | (tag: ICategorySearchTagItem, rangeValue: number[]) => void   |
| toggleTagMenu       | 控制某个已选择 tag 所对应下拉框的展开收起状态，可通过`status`参数指定展开收起状态 | `(field: string, status?: boolean) => void`                   |

### 类型定义

#### ICategorySearchTagItem

```ts
interface ICategorySearchTagItem {
  /**
   * 搜索字段，tag的键，用于区分不同的分类，需要唯一
   */
  field: string;
  /**
   * tag 键的显示值
   */
  label: string;
  /**
   * 配置项可生产的tag类型
   */
  type?: CategorySearchTagType;
  /**
   * 配置项所属的分组
   */
  group?: string;
  /**
   * tag 值的选择项数据
   */
  options?: Array<ITagOption>;
  /**
   * 用于显示的 tag 值的键值，如未设置默认取label
   */
  filterKey?: string | 'label';
  /**
   * 用于显示的label类型中色值的键值，如未设置默认取color
   */
  colorKey?: string | 'color';
  /**
   * 已选中值
   */
  value?: {
    label?: string;
    value?: string | ITagOption | Array<ITagOption | number | string | Date>;
    cache?: string | ITagOption | Array<ITagOption | number | string | Date>;
    [propName: string]: any;
  };
  /**
   * textInput 类型设置最大长度
   */
  maxLength?: number;
  /**
   * textInput | numberRange 类型设置占位符，numberRange需传入对象分别设置左右
   */
  placeholder?: string | { left: string; right: string };
  /**
   * textInput 表单校验规则
   */
  validateRules?: any[];
  [propName: string]: any;
}
```

#### CategorySearchTagType

```ts
type CategorySearchTagType = 'radio' | 'checkbox' | 'label' | 'textInput' | 'numberRange' | 'keyword';
```

#### ITagOption

```ts
interface ITagOption {
  /**
   * 选项，label和color默认都会取对应的 filterKey 和 colorKey，如未设置取默认值
   */
  label?: string; // 通用默认属性，用于设置分类名称
  color?: string; // label 专用，用于设置标签颜色
  [propName: string]: any;
}
```

#### SearchEvent

```ts
interface SearchEvent {
  selectedTags: Array<ICategorySearchTagItem>;
  searchKey: string;
}
```

#### SelectedTagsEvent

```ts
interface SelectedTagsEvent {
  selectedTags: Array<ICategorySearchTagItem>;
  currentChangeTag: ICategorySearchTagItem;
  operation: 'add' | 'delete' | 'clear';
}
```

#### CreateFilterEvent

```ts
interface CreateFilterEvent {
  name: string;
  selectedTags: Array<ICategorySearchTagItem>;
  keyword: string;
}
```

#### ExtendConfig

```ts
interface ExtendConfig {
  show?: boolean;
  clear?: {
    show?: boolean;
    disabled?: boolean;
  };
  save?: {
    show?: boolean;
    disabled?: boolean;
  };
  more?: {
    show?: boolean;
    disabled?: boolean;
  };
}
```

#### TextConfig

```ts
interface TextConfig {
  keywordName?: string; // 关键字
  createFilter?: string; // 保存过滤器
  filterTitle?: string; // 过滤器标题
  labelConnector?: string; // 链接符，默认'|'
  noCategoriesAvailable?: string; // 没有筛选条件
  tagMenuEmpty?: string; // 分类下拉菜单无数据展示的内容，默认'暂无数据'
}
```
