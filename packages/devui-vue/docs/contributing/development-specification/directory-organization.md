# 组件目录和文件组织规范

Vue DevUI 包含丰富的组件，都在`devui-vue`子包的`devui`目录下，该目录下的每一个子目录都是一个组件的源码，每个组件都有一个或多个贡献者。

组件目录和文件组织规范的目的就是规范组件的目录结构和各组件文件的组织形式。

目录规范分成以下部分：

1. 组件目录结构
2. 入口文件 `index.ts`
3. 组件文件 `my-component.tsx`
4. 类型文件 `my-component-types.ts`
5. Composable `use-my-composable.ts`
6. 样式文件 `my-component-scss`
7. 单元测试文件 `my-component.spec.ts`

### 组件目录结构


以下是组件目录结构的基本模板

```
my-component
├── __tests__                 // 单元测试
|  └── my-component.spec.ts
├── index.ts                  // 入口文件
└── src                       // 组件源码
   └── components             // 子组件
      ├── my-sub-component.ts
   └── composables            // 组件的逻辑部分 composable
      ├── my-use-composable.ts
   ├── my-component-types.ts  // 组件类型
   ├── my-component.scss      // 组件样式
   └── my-component.tsx       // 组件
```

### 入口文件 `index.ts`

```ts
import type { App } from 'vue';
import MyComponent from './src/my-component';

export * from './src/my-component-types';

export { MyComponent };

export default {
  title: 'MyComponent 我的组件',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.component(MyComponent.name, MyComponent);
  },
};
```

### 组件文件 `my-component.tsx`

```ts
import { defineComponent, toRefs } from 'vue';
import type { SetupContext } from 'vue';

import { myComponentProps, MyComponentProps } from './my-component-types';
import useMyComposable from './composables/use-my-composable';

import './my-component.scss';

export default defineComponent({
  name: 'DMyComponent',
  props: myComponentProps,
  emits: ['update:modelValue'],
  setup(props: MyComponentProps, ctx: SetupContext) {
    const { myProp } = toRefs(props);
    const { myUseVar, myUseMethod } = useMyComposable(myUseParam);

    return () => {
      return (
        <div class="devui-my-component">{ myProp.value }</div>
      );
    };
  },
});
```

###  类型文件 `my-component-types.ts`

```ts
import { PropType, ExtractPropTypes } from 'vue';

export const myComponentProps = {
  myProp: {
    type: Number,
    default: 1
  },
  myProp2: {
    type: Array as PropType<number[]>,
    default: [5, 10, 20, 50]
  },
} as const;

export type MyComponentProps = ExtractPropTypes<typeof myComponentProps>;
```

### Composable `use-my-composable.ts`

```ts
import { ref } from 'vue';

export default function useMyComposable(myUseParam) {
  const myUseVar = ref(xxx);

  const myUseMethod = () => {
    
  };

  return { myUseVar, myUseMethod };
}
```

### 样式文件 `my-component-scss`

```scss
@import '../../styles-var/devui-var.scss';

.devui-my-component {

}
```

### 单元测试文件 `my-component.spec.ts`

```ts
import { mount, DOMWrapper } from '@vue/test-utils';
import { ref } from 'vue';
import DMyComponent from '../src/my-component';

describe('MyComponent', () => {
  it('should render correctly', async () => {
    const wrapper = mount({
      components: { DMyComponent },
      template: `
        <d-my-component my-prop="xxx" />
      `,
      setup() {
        const myVar = ref(xxx);
        return { myVar };
      }
    });

    expect(xxx).toEqual(xxx);
  });
});
```
