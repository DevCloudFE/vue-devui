# Avatar

Display user's avatar.

#### When to Use

When users want to display their own profile avatar.

### Basic Rules

When the profile picture gadget transfers the name attribute, the profile picture field is displayed based on certain rules. For details, please see API.

:::demo

```vue
<template>
  <div class="avatar-demo-1">
    <d-avatar style="text-align: right" gender="Female" name="组件头像"></d-avatar>
    <d-avatar name="MyAvatar"></d-avatar>
    <d-avatar name="Avatar1 Avatar2"></d-avatar>
    <d-avatar name="1Avatar"></d-avatar>
  </div>
</template>

<style>
.avatar-demo-1 .devui-avatar {
  margin-right: 10px;
}
</style>
```

:::

### Basic Configuration

The width, height, and whether the avatar is a circular can be set. In addition, the display fields of the avatar can be customized, and the customized image can be transferred.

:::demo

```vue
<template>
  <div class="avatar-demo-2">
    <d-avatar name="Avatar" :width="28" :height="28"></d-avatar>
    <d-avatar customText="DevUI" :width="80" :height="80" :isRound="false"></d-avatar>
    <d-avatar imgSrc="/../../assets/logo.svg" :width="100" :height="100" :isRound="false"></d-avatar>
  </div>
</template>

<style>
.avatar-demo-2 {
  display: flex;
  align-items: center;
}
.avatar-demo-2 .devui-avatar {
  margin-right: 10px;
}
</style>
```

:::

### Special Display

The avatar component processes some special situations, for example, the user does not exist or the default avatar is displayed. For details, please see API.

:::demo

```vue
<template>
  <div class="avatar-demo-3">
    <d-avatar></d-avatar>
    <d-avatar name=""></d-avatar>
  </div>
</template>

<style>
.avatar-demo-3 .devui-avatar {
  margin-right: 10px;
}
</style>
```

:::

### Avatar Parameter

| Parameter   | Type                       | Default | Description                                                                                                                    | Jump to Demo                                |
| :---------- | :------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------ |
| name        | `string`                   | --      | Required. The input character string is used to create a profile picture.                                                      | [Basic Rules](#basic-rules)                 |
| gender      | `string \| male \| female` | --      | Optional. The profile picture color is differentiated by gender. The input string can be in the format of<br/>`female \| male` | [Basic Rules](#basic-rules)                 |
| width       | `number`                   | 40      | Optional. Width of the avatar`px`                                                                                              | [Basic Configuration](#basic-configuration) |
| height      | `number`                   | 40      | Optional. Set the height of the avatar`px`                                                                                     | [Basic Configuration](#basic-configuration) |
| is-round    | `boolean`                  | true    | Optional. Indicating whether to display a circular avatar                                                                      | [Basic Configuration](#basic-configuration) |
| img-src     | `string`                   | --      | Optional. Import a customized image as the avatar                                                                              | [Basic Configuration](#basic-configuration) |
| custom-text | `string`                   | --      | Optional. Input the customized display text                                                                                    | [Basic Configuration](#basic-configuration) |

### Other Instructions

#### Basic Profile Picture Display Rules

- `Begin with Chinese`: Use the last two characters.
- `Begin with English`: Use the first two characters.
- `Use multiple English names together`: Use the first two letters of the first English name.
- `Not starting with Chinese or English`: Use the first two characters.

#### Basic Profile Picture Display Rules

- If`name`，`customText`，`imgSrc`are not transferred, the user who uses the avatar does not exist.

- If the values of`name`，`customText`，`imgSrc` are empty, the user who uses the avatar does not have a nickname and the default avatar is used.

#### Display Priority

imgSrc > customText > name
