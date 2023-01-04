# Button 按钮

按钮用于开始一个即时操作。

#### 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### 形态

:::demo 通过`variant`设置按钮形态，目前支持`solid`、`outline`、`text`三种形态，默认为`outline`。

button/shape

:::

### 主题色

:::demo 通过`color`设置按钮的主题色，目前支持`primary`、`secondary`、`danger`三种主题色，默认为`secondary`。<br>注意：如果`variant`设置成`solid`，则默认使用`primary`主题色。

button/theme

:::

### 尺寸

:::demo 通过`size`设置按钮尺寸，支持`sm`、`md`、`lg`三种类型的尺寸，默认为`md`。

button/size

:::

### 禁用状态

:::demo 通过`disabled`参数设置按钮禁用状态。

button/disable

:::

### 加载中状态

:::demo 通过`loading`参数设置按钮加载中状态。

button/loading

:::

### 图标按钮

:::demo

button/icon

:::

### 按钮组

将多个按钮作为一组放入按钮组容器中。按钮组可通过 size 设置尺寸，并与下拉菜单混合使用。

:::demo

button/buttonGroup

:::

### Button 参数

| 参数名   | 类型                              | 默认        | 说明                      | 跳转 Demo                 |
| :------- | :-------------------------------- | :---------- | :------------------------ | :------------------------ |
| variant  | [IButtonVariant](#ibuttonvariant) | 'outline'   | 可选，按钮形态            | [形态](#形态)             |
| color    | [IButtonColor](#ibuttoncolor)     | 'secondary' | 可选，按钮主题            | [主题色](#主题色)         |
| size     | [IButtonSize](#ibuttonsize)       | 'md'        | 可选，按钮尺寸            | [尺寸](#尺寸)             |
| icon     | `string`                          | --          | 可选，自定义按钮图标      | [图标按钮](#图标按钮)     |
| shape    | [IButtonShape](#ibuttonshape)     | --          | 可选，按钮形状(圆形/圆角) | [图标按钮](#图标按钮)     |
| disabled | `boolean`                         | false       | 可选，是否禁用 button     | [禁用状态](#禁用状态)     |
| loading  | `boolean`                         | false       | 可选，设置加载中状态      | [加载中状态](#加载中状态) |

### Button 类型定义

#### IButtonVariant

```ts
type IButtonVariant = 'solid' | 'outline' | 'text';
```

#### IButtonSize

```ts
type IButtonSize = 'lg' | 'md' | 'sm';
```

#### IButtonColor

```ts
type IButtonColor = 'primary' | 'secondary' | 'danger';
```

#### IButtonShape

```ts
type IButtonShape = 'circle' | 'round';
```

### ButtonGroup 参数

| 参数名 | 类型                             | 默认 | 说明             | 跳转 Demo         |
| :----- | :------------------------------- | :--- | :--------------- | :---------------- |
| size   | [IButtonSize](#iButtonGroupSize) | 'md' | 可选，按钮组尺寸 | [按钮组](#按钮组) |

### ButtonGroup 类型定义

#### IButtonGroupSize

```ts
type IButtonGroupSize = 'lg' | 'md' | 'sm';
```
