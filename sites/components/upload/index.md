# Upload 上传

文件上传组件。

### 何时使用

当需要将文件上传到后端服务器时。

### Demo

<section>
  <single-basic-upload />
</section>

<script lang="ts">
  import { defineComponent, ref, h } from 'vue'
  import { Upload } from '../../../devui/upload';
  import SingleBasicUpload from './demos/basic/single-basic.vue'
  export default defineComponent({
    components: {
      Upload,
      SingleBasicUpload
    },
    setup() {
      return {
          
      }
    }
  })
</script>
