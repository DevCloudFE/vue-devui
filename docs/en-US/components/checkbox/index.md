# CheckBox

CheckBox。

### When to use

1. Make multiple choices in a set of options；
2. Used alone can indicate switching between the two states, and can be combined with the submit operation。

### Basic usage

<d-checkbox label="Checked" :isShowTitle="false" v-model="checked" />
<d-checkbox label="Not checked" :isShowTitle="false" v-model="unchecked" />

```html
<d-checkbox label="Checked" :isShowTitle="false" v-model="checked" />
<d-checkbox label="Not checked" :isShowTitle="false" v-model="unchecked" />
```

#### use CheckboxGroup
<d-checkbox-group v-model="checkedValues" label="爱好">
  <d-checkbox label="篮球" value="basketball" />
  <d-checkbox label="足球" value="football" />
</d-checkbox-group>
<div>{{ checkedValues.reduce((prev, current) => `${current} ${prev}`, '') }}</div>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const checked = ref(true)
    const unchecked = ref(false)
    const checkedValues = ref([]);
    return {
      checked,
      unchecked,
      checkedValues
    }
  }
})
</script>