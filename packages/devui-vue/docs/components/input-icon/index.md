# InputIcon 输入框

文本输入框。

### 何时使用

需要手动输入文字使用。

### 基本用法

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {

    const eventValue = ref<string>('')
    const handleIconClick = (val: string) => {
        console.log(eventValue.value = val)
    }

    return {
      eventValue,
      handleIconClick,
    }
  }
})
</script>
<d-input :value="eventValue" />
<d-input-icon name="calendar" @iconclick="handleIconClick" />