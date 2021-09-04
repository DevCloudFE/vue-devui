# Transfer 穿梭框

双栏穿梭选择框。

### 何时使用

需要在多个可选项中进行多选时。穿梭选择框可用只管的方式在两栏中移动数据，完成选择行为。其中左边一栏为source，右边一栏为target。最终返回两栏的数据，提供给开发者使用。

### 基本用法

穿梭框基本用法。

<section>
    <d-transfer v-model="options.modelValues"
        :titles="options.titles" 
        :sourceOption="options.source"
        :targetOption="options.target"
        isSearch
    >
    </d-transfer>
</section>

<script lang="ts">
    import {defineComponent, reactive} from 'vue'
    type TData = {
        id: number
        age: number
        value: string
        disabled?: boolean
    }
    export default defineComponent({
        setup() {
            const options = reactive({
                titles: ['sourceHeader', 'targetHeader'],
                source: [
                    {
                        key: '北京',
                        value: '北京',
                        disabled: false
                    },
                    {
                        key: '上海',
                        value: '上海',
                        disabled: true
                    },
                    {
                        key: '广州',
                        value: '广州',
                        disabled: false
                    },
                    {
                        key: '深圳',
                        value: '深圳',
                        disabled: false
                    },
                    {
                        key: '成都',
                        value: '成都',
                        disabled: false
                    },
                    {
                        key: '武汉',
                        value: '武汉',
                        disabled: false
                    },
                    {
                        key: '西安',
                        value: '西安',
                        disabled: false
                    },
                    {
                        key: '福建',
                        value: '福建',
                        disabled: false
                    },
                    {
                        key: '大连',
                        value: '大连',
                        disabled: false
                    },
                    {
                        key: '重庆',
                        value: '重庆',
                        disabled: false
                    }
                ],
                target: [
                    {
                        key: '南充',
                        value: '南充',
                        disabled: false
                    },
                    {
                        key: '广元',
                        value: '广元',
                        disabled: true
                    },
                    {
                        key: '绵阳',
                        value: '绵阳',
                        disabled: false
                    }
                ],
                isSearch: true,
                modelValues: ['深圳', '成都', '绵阳'] // , '绵阳'
            })
            return {
                options
            }
        }
    })
</script>

```html
<d-transfer v-model="options.modelValues"
    :titles="options.titles" 
    :sourceOption="options.source"
    :targetOption="options.target"
    isSearch
>
</d-transfer>
```

```ts
import {defineComponent, reactive} from 'vue'
    type TData = {
        id: number
        age: number
        value: string
        disabled?: boolean
    }
    export default defineComponent({
        setup() {
            const options = reactive({
                titles: ['sourceHeader', 'targetHeader'],
                source: [
                    {
                        key: '北京',
                        value: '北京',
                        disabled: false
                    },
                    {
                        key: '上海',
                        value: '上海',
                        disabled: true
                    },
                    {
                        key: '广州',
                        value: '广州',
                        disabled: false
                    },
                    {
                        key: '深圳',
                        value: '深圳',
                        disabled: false
                    },
                    {
                        key: '成都',
                        value: '成都',
                        disabled: false
                    },
                    {
                        key: '武汉',
                        value: '武汉',
                        disabled: false
                    },
                    {
                        key: '西安',
                        value: '西安',
                        disabled: false
                    },
                    {
                        key: '福建',
                        value: '福建',
                        disabled: false
                    },
                    {
                        key: '大连',
                        value: '大连',
                        disabled: false
                    },
                    {
                        key: '重庆',
                        value: '重庆',
                        disabled: false
                    }
                ],
                target: [
                    {
                        key: '南充',
                        value: '南充',
                        disabled: false
                    },
                    {
                        key: '广元',
                        value: '广元',
                        disabled: true
                    },
                    {
                        key: '绵阳',
                        value: '绵阳',
                        disabled: false
                    }
                ],
                isSearch: true,
                modelValues: ['深圳', '成都', '绵阳']
            })
            return {
                options
            }
        }
    })
```

### 参数

| **参数**           | **类型**                                                     | **默认**                  | **说明**                                                     | **跳转 Demo**                |
| ------------------ | ------------------------------------------------------------ | ------------------------- | ------------------------------------------------------------ | ---------------------------- |
| sourceOption   | Array   | []     | 可选参数，穿梭框源数据     |  [基本用法](#基本用法)   |
| targetOption   | Array   | []     | 可选参数，穿梭框目标数据   |  [基本用法](#基本用法)   |
| titles         | Array   | []     | 可选参数，穿梭框标题      |  [基本用法](#基本用法)   |
| height         | string  | 320px  | 可选参数，穿梭框高度      |  [基本用法](#基本用法)   |
| isSearch       | boolean | true   | 可选参数，是否可以搜索    |  [基本用法](#基本用法)   | 
| disabled       | boolean | false  | 可选参数 穿梭框禁止使用   |  [基本用法](#基本用法)   |  
