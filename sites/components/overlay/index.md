## 浮层

### 固定浮层
<d-button @click="() => fixedVisible = !fixedVisible">{{fixedVisible ? '隐藏' : '显示固定浮层' }}</d-button>
<d-fixed-overlay v-model:visible="fixedVisible" backgroundClass="justify-center items-center" backgroundBlock>
  <div style="height: 100px; width: 100px; background: red;">hello world</div>
</d-fixed-overlay>


### 弹性浮层
<div class="h-1000 w-full flex items-center justify-center">
  <div ref="origin" class="flex items-center justify-center h-100 w-100 text-white bg-gray">orgin</div>
  <d-button @click="() => visible = !visible">{{visible ? '隐藏' : '显示' }}</d-button>
</div>

<d-flexible-overlay :origin="origin" v-model:visible="visible">
  <div style="height: 100px; width: 100px; background: red;">hello world</div>
</d-flexible-overlay>


<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  setup() { 
    const origin = ref();
    const visible = ref(false);
    const fixedVisible = ref(false);
    onMounted(() => {
      console.log(origin.value);
    });
    return {
      origin,
      fixedVisible,
      visible
    }
  },
})
</script>
<style>
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.h-100 {
  height: 100px;
}

.w-100 {
  width: 100px;
}

.text-white {
  color: white;
}

.bg-gray {
  background: gray;
}

.h-1000 {
  height: 1000px;
}

.w-full {
  width: 100%;
}

</style>