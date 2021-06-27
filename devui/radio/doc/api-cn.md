# 如何使用

在 module 中引入：

```ts
import { DRadio } from 'vue-devui';
```

在页面中使用

```html
<d-radio name="radio" value="value"></d-radio>
<d-radio-group name="radioGroup" value="v"></d-radio-group>
```

# d-radio
## d-radio 参数

|     参数     |              类型               | 默认  | 说明                                                                            | 跳转 Demo                            |
| :----------: | :-----------------------------: | :---: | :------------------------------------------------------------------------------ | ------------------------------------ |
|     name     |            `string`             |  --   | 必选，单选项名称                                                                | [互相独立的单选项](demo#radio-row) |
|    value     |            `string`             |  --   | 必选，单选项值                                                                  | [互相独立的单选项](demo#radio-row) |
|   disabled   |            `boolean`            | false | 可选，是否禁用该单选项                                                          | [禁用](demo#radio-disabled)                |     |
| beforeChange | `Function \| Promise` |  --   | 可选，radio 切换前的回调函数，返回 boolean 类型，返回 false 可以阻止 radio 切换 | [回调切换](demo#radio-prevent)    |

## d-radio 事件

|     事件      |        类型         | 说明                                        | 跳转 Demo                            |
| :-----------: | :-----------------: | :------------------------------------------ | ------------------------------------ |
| change | `EventEmitter<string>` | Form 事件，单选项值改变时触发，返回选中的值 | [互相独立的单选项](demo#radio-row) |
| update:checked | `EventEmitter<string>` | Form 事件，单选项值改变时触发，返回选中的值 | [互相独立的单选项](demo#radio-row) |


# d-radio-group
## d-radio-group 参数

|     参数     |              类型               |   默认   |                                             说明                                              | 跳转 Demo                              |
| :----------: | :-----------------------------: | :------: | :-------------------------------------------------------------------------------------------: | -------------------------------------- |
|     name     |            `string`             |    --    |                             必选，单选项名称 （radio 唯一标识符）                             | [竖向排列](demo#radio-column)              |
|    value    |             `string`             |    --    |                                       必选，单选数据组                                        | [竖向排列](demo#radio-column)              |
|   cssStyle   |       `'row' \| 'column'`       | 'column' |                                   可选，设置横向或纵向排列                                    | [横向排列](demo#radio-row)            |     |
| beforeChange | `Function \| Promise` |    --    | 可选，radio-group 切换前的回调函数，返回 boolean 类型，返回 false 可以阻止 radio-group 的切换 | [回调切换](demo#radio-prevent) |

## d-radio-group 事件

|  事件  |        类型         | 说明                             | 跳转 Demo                 |
| :----: | :-----------------: | :------------------------------- | ------------------------- |
| change | `EventEmitter<string>` | 单选项值改变时触发，返回选中的值 | [竖向排列](demo#radio-column) |
| update:value | `EventEmitter<string>` | 单选项值改变时触发，返回选中的值 | [竖向排列](demo#radio-column) |
