# Transfer 穿梭框

穿梭框。

### 何时使用

需要手动输入文字使用。

### 基本用法
<d-transfer v-model="options.modelValues"
    :titles="options.titles" 
    :sourceOption="options.source"
    :targetOption="options.target"
    filterable
>
</d-transfer>

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
                        disabled: true
                    },
                    {
                        key: '上海',
                        value: '上海',
                        disabled: false
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
                        key: '广元',
                        value: '广元',
                        disabled: true
                    },
                    {
                        key: '南充',
                        value: '南充',
                        disabled: false
                    },
                    {
                        key: '绵阳',
                        value: '绵阳',
                        disabled: false
                    }
                ],
                filterable: true,
                modelValues: ['深圳', '成都']
            })
            return {
                options
            }
        }
    })
</script>
