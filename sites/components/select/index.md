# Select 下拉选择框

用于从列表中选择单个或者多个数据

### 何时使用

需要从列表中选择单个或者多个数据

### 基本用法

#### Large

<br/>
<d-select v-model="selectValue1" :options="selectOptions1" size="lg"></d-select>
<br/>

#### Middle

<br/>
<d-select v-model="selectValue2" :options="selectOptions2" placeholder="这是默认选择框"></d-select>
<br/>

#### Small

<br/>
<d-select v-model="selectValue3" :options="selectOptions3" size="sm"></d-select>
<br/>

#### Underlined

<br/>
<d-select v-model="selectValue4" :options="selectOptions4" size="lg" overview="underlined"></d-select>
<br/>

```html
<d-select v-model="baseSelectValue" :options="baseSelectOptions" size="lg"></d-select>

<d-select v-model="baseSelectValue" :options="baseSelectOptions" placeholder="这是默认选择框"></d-select>

<d-select v-model="baseSelectValue" :options="baseSelectOptions" size="sm"></d-select>

<d-select v-model="baseSelectValue" :options="baseSelectOptions" size="lg" overview="underlined"></d-select>
```

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const selectValue1 = ref('')
    const selectValue2 = ref('')
    const selectValue3 = ref('')
    const selectValue4 = ref(0)
    const selectOptions1 = reactive([
      1,2,3
    ])
    const selectOptions2 = reactive([
      'test','string','text'
    ])
    const selectOptions3 = reactive([
      1,2,3,'test',4,5,6,'string','text'
    ])
    const selectOptions4 = reactive([
      {
        name: '我',
        value: 0
      }, {
        name: '看看',
        value: 1
      }, {
        name: '什么情况',
        value: 2
      }
    ])
    
    return {
      selectValue1,
      selectValue2,
      selectValue3,
      selectValue4,
      selectOptions1,
      selectOptions2,
      selectOptions3,
      selectOptions4,
    }
  }
})
</script>
