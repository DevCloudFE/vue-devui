# 级联菜单
下拉级联菜单。

:::demo

```vue
<template>
  <d-cascader :options="options" placeholder="请选择" style="width: 200px"></d-cascader>
</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const options = reactive([
      {
        label: 'option1',
        value : 1,
        children: [
          {
            label: 'option1-1',
            value : 4,
            children: [
              {
                label: 'option1-1-1',
                value : 8,
                children: []
              },
              {
                label: 'option1-1-2',
                value : 9,
                children: [
                  {
                    label: 'option1-1-2-1',
                    value : 81,
                    isLeaf: true
                  }
                ],
              }
            ]
          },
          {
            label: 'option1-2',
            value : 41,
            isLeaf: true
          },
          {
            label: 'option1-3',
            value : 42,
            isLeaf: true
          },
          {
            label: 'option1-4',
            value : 43,
            isLeaf: true
          }
        ],
      },
      {
        label: 'option2',
        value : 2,
        children: [
          {
            label: 'option2-1',
            value : 5,
            children: [
              {
                label: 'option2-1-1',
                value : 51,
                isLeaf: true
              },
              {
                label: 'option2-1-2',
                value : 61,
                isLeaf: true,
                disabled: true
              }
            ]
          },
          {
            label: 'option2-2',
            value : 6,
            children: [
              {
                label: 'option2-2-1',
                value : 512,
                isLeaf: true
              },
              {
                label: 'option2-2-2',
                value : 611,
                isLeaf: true
              }
            ]
          },
          {
            label: 'option2-3',
            value : 712,
            isLeaf: true
          }
        ]
      },
      {
        label: 'option3',
        value : 3,
        children: [],
        isLeaf: true,
        disabled: true
      }
    ])
    return {
      options
    }
  },
})
</script>
```

:::