# Upload 上传

文件上传组件。

### 何时使用

当需要将文件上传到后端服务器时。

### 基本用法

单文件上传、拖动文件上传、v-model 双向绑定、禁止上传。

<h4>Basic Usage</h4>

:::demo

```vue
<template>
  <d-single-upload
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    :uploaded-files="uploadedFiles"
  />
</template>
<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const fileOptions = reactive({
      accept: '',
      multiple: false,
      webkitdirectory: false,
    })
    const uploadOptions = reactive({
      uri: '/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'dFile',
      withCredentials: true,
      responseType: 'json',
    })
    return {
      fileOptions,
      uploadedFiles,
      uploadOptions,
    }
  },
}
</script>
```

:::

<h4>Dragdrop</h4>

:::demo

```vue
<template>
  <d-single-upload
    :enable-drop="true"
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    :uploaded-files="uploadedFiles"
    placeholder-text="Drag files"
    :without-btn="true"
    file-path="name"
    :before-upload="beforeUpload"
    :success-event="onSuccess"
    :error-event="onError"
    :file-drop="fileDrop"
    :file-over="fileOver"
  />
  <div style="margin-top: 8px">
    <d-button>Upload</d-button>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const fileOptions = reactive({
      accept: '.png,.zip',
      multiple: false,
      webkitdirectory: false,
    })
    const uploadOptions = reactive({
      uri: '/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'dFile',
      withCredentials: true,
      responseType: 'json',
    })
    const beforeUpload = (file) => {
      console.log(file)
      return true
    }
    const onSuccess = (result) => {
      console.log('success', result)
    }
    const onError = (error) => {
      console.log(error)
    }
    const fileDrop = (files) => {
      console.log(files)
    }

    const fileOver = (event) => {
      console.log(event)
    }
    return {
      fileOptions,
      uploadedFiles,
      uploadOptions,
      uploadedFiles,
      beforeUpload,
      onSuccess,
      onError,
      fileDrop,
      fileOver,
    }
  },
}
</script>
```

:::

<h4>Disabled</h4>

:::demo

```vue
<template>
  <d-single-upload
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    :uploaded-files="uploadedFiles"
    placeholder-text="Upload"
    file-path="name"
    :before-upload="beforeUpload"
    :success-event="onSuccess"
    :error-event="onError"
    :disabled="true"
  />
</template>
<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const fileOptions = reactive({
      accept: '',
      multiple: false,
      webkitdirectory: false,
    })
    const uploadOptions = reactive({
      uri: '/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'dFile',
      withCredentials: true,
      responseType: 'json',
    })
    const beforeUpload = (file) => {
      console.log(file)
      return true
    }
    const onSuccess = (result) => {
      console.log('success', result)
    }
    const onError = (error) => {
      console.log(error)
    }
    return {
      fileOptions,
      uploadedFiles,
      uploadOptions,
      beforeUpload,
      onSuccess,
      onError,
    }
  },
}
</script>
```

:::
