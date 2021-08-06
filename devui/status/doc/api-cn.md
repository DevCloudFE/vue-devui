# 如何使用
在module中引入：
```ts
import { StatusModule } from 'ng-devui/status';
```

在页面中使用：
```html
<d-status></d-status>
```
# d-status 
## d-status 参数

| 参数 |   类型   |   默认    | 说明                                                                         | 跳转 Demo                                   |
| :--: | :------: | :-------: | :--------------------------------------------------------------------------- | ------------------------------------------- |
| type | `success\|error\|warning\|initial\|running\|invalid` | 'invalid' | 必选，类型，值有 success、error、warning、initial、waiting、running、invalid | [基本用法](demo#basic-usage) |
