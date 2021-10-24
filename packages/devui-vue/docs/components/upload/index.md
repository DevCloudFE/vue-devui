# Upload 上传

文件上传组件。

### 何时使用

当需要将文件上传到后端服务器时。

### 基本用法

单文件上传、拖动文件上传、禁止上传。

<h4>Basic Usage</h4>

:::demo

```vue
<template>
  <d-single-upload
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
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
      uri: 'http://localhost:4000/files/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'file',
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
    ref="uploadRef"
    :enable-drop="true"
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="Drag files"
    :without-btn="true"
    :before-upload="beforeUpload"
    @success-event="onSuccess"
    @error-event="onError"
    @file-drop="fileDrop"
    @file-over="fileOver"
  />
  <div style="margin-top: 8px">
    <d-button @click="submit">Upload</d-button>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadRef = ref(null)
    const uploadedFiles = ref([])
    const fileOptions = reactive({
      accept: '.png,.zip',
      multiple: false,
      webkitdirectory: false,
    })
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'file',
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
    const submit = () => {
      uploadRef.value.fileUpload()
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
      uploadRef,
      submit,
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
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="Upload"
    :before-upload="beforeUpload"
    @success-event="onSuccess"
    @error-event="onError"
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

### 多文件上传

多文件上传，支持拖动文件上传、禁止上传。

<h4>Basic Usage</h4>

:::demo

```vue
<template>
  <d-multiple-upload
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    @success-event="onSuccess"
    @error-event="onError"
    :showTip="true"
    @file-select="fileSelect"
  />
</template>
<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const fileOptions = reactive({
      accept: 'image/png,image/jpeg',
      multiple: true,
      webkitdirectory: false,
    })
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      additionalParameter,
      maximumSize: 2,
      method: 'POST',
      checkSameName: true,
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
    const fileSelect = (files) => {
      console.log('fileSelect ', files)
    }
    const deleteUploadedFile = (filePath) => {
      console.log(`delete ${filePath}`)
    }
    return {
      fileOptions,
      uploadedFiles,
      uploadOptions,
      beforeUpload,
      onSuccess,
      onError,
      fileSelect,
      deleteUploadedFile,
    }
  },
}
</script>
```

:::

<h4>Upload Directory</h4>

:::demo

```vue
<template>
  <d-multiple-upload
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    @success-event="onSuccess"
    @error-event="onError"
    :showTip="true"
    @file-select="fileSelect"
  />
</template>
<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const fileOptions = reactive({
      multiple: true,
      webkitdirectory: true,
    })
    const uploadOptions = reactive({
      uri: '/upload',
      method: 'post',
      maximumSize: 20,
      checkSameName: true,
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
    const fileSelect = (files) => {
      console.log('fileSelect ', files)
    }
    const deleteUploadedFile = (filePath) => {
      console.log(`delete ${filePath}`)
    }
    return {
      fileOptions,
      uploadedFiles,
      uploadOptions,
      beforeUpload,
      onSuccess,
      onError,
      fileSelect,
      deleteUploadedFile,
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
  <d-multiple-upload
    :enable-drop="true"
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    @success-event="onSuccess"
    @error-event="onError"
    :showTip="true"
    @file-select="fileSelect"
    :one-time-upload="true"
    @file-drop="fileDrop"
    @file-over="fileOver"
    @delete-uploaded-file-event="deleteUploadedFile"
  />
</template>
<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const fileOptions = reactive({
      multiple: true,
      accept: '.xls,.xlsx,.pages,.mp3,.png',
      webkitdirectory: true,
    })
    const uploadOptions = reactive({
      uri: '/upload',
      method: 'post',
      additionalParameter: additionalParameter,
      maximumSize: 20,
      checkSameName: true,
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
    const fileSelect = (files) => {
      console.log('fileSelect ', files)
    }
    const deleteUploadedFile = (filePath) => {
      console.log(`delete ${filePath}`)
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
      beforeUpload,
      onSuccess,
      onError,
      fileSelect,
      deleteUploadedFile,
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
  <d-multiple-upload
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="Upload"
    :before-upload="beforeUpload"
    @success-event="onSuccess"
    @error-event="onError"
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

### 自动上传

通过 autoUpload 设置自动上传。

:::demo

```vue
<template>
  <d-multiple-upload
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="选择文件"
    @success-event="onSuccess1"
    @error-event="onError"
    @delete-uploaded-file-event="deleteUploadedFile"
    :showTip="true"
    v-model:uploadedFiles="uploadedFiles"
    :auto-upload="true"
  />
</template>
<script>
import { reactive, ref, watch } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const fileOptions = reactive({
      multiple: true,
      accept: '.xls,.xlsx,.pages,.mp3,.png',
    })
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      method: 'post',
      additionalParameter: additionalParameter,
      maximumSize: 20,
      checkSameName: true,
    })
    const onSuccess1 = (result) => {
      console.log('success', result, uploadedFiles)
    }
    const onError = (error) => {
      console.log(error)
    }
    const deleteUploadedFile = (file) => {
      console.log('deleteUploadedFile ', file)
    }
    watch(uploadedFiles, (val) => {
      console.log('uploadedFiles ', val)
    })
    return {
      fileOptions,
      uploadedFiles,
      uploadOptions,
      onSuccess1,
      onError,
      deleteUploadedFile,
    }
  },
}
</script>
```

:::

### 自定义

自定义上传按钮，通过 slot preloadFiles 设置已选择文件列表模板，通过 slot uploadedFiles 设置已上传文件列表模版。

:::demo

```vue
<template>
  <div class="upload-row">
    <div class="upload-body">
      <d-multiple-upload
        :file-options="fileOptions"
        :upload-options="uploadOptions"
        v-model:uploaded-files="uploadedFiles"
        placeholder-text="选择文件"
        @success-event="onSuccess"
        @error-event="onError"
        @delete-uploaded-file-event="deleteUploadedFile"
        v-model:uploadedFiles="uploadedFiles"
        :setCustomUploadOptions="setCustomUploadOptions"
        :withoutBtn="true"
        ref="uploadRef"
      >
        <template v-slot:preloadFiles="slotProps">
          <table
            class="table preload-files"
            v-if="slotProps.fileUploaders.length > 0"
          >
            <tr
              v-for="(fileUploader, index) in slotProps.fileUploaders"
              :key="index"
              class="row"
            >
              <td width="50%">
                <span>{{ fileUploader.file.name }}</span>
              </td>

              <td width="25%">
                <span v-if="fileUploader.status === UploadStatus.preLoad"
                  >preLoad</span
                >
                <span v-if="fileUploader.status === UploadStatus.uploading"
                  >Uploading}</span
                >
                <span v-if="fileUploader.status === UploadStatus.uploaded"
                  >Uploaded</span
                >
                <span v-if="fileUploader.status === UploadStatus.failed"
                  >Upload Failed</span
                >
              </td>

              <td>
                <d-button
                  size="xs"
                  v-if="fileUploader.status !== UploadStatus.uploaded"
                  :disabled="fileUploader.status === UploadStatus.uploading"
                  @click="
                    (event) => slotProps.deleteFile(fileUploader.filePath)
                  "
                >
                  Delete
                </d-button>
              </td>
            </tr>
          </table>
        </template>
        <template v-slot:uploadedFiles="slotProps">
          <table
            class="table uploaded-files"
            v-if="slotProps.uploadedFiles.length > 0"
          >
            <tbody>
              <tr
                v-for="(uploadedFile, index) in slotProps.uploadedFiles"
                :key="index"
                class="row"
              >
                <td width="50%">
                  <span>{{ uploadedFile.name }}</span>
                </td>
                <td width="25%">
                  <span>Uploaded</span>
                </td>
                <td>
                  <d-button
                    size="xs"
                    @click="(event) => slotProps.deleteFile(uploadedFile)"
                  >
                    Delete
                  </d-button>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </d-multiple-upload>
    </div>
    <div class="upload-btn">
      <d-button type="primary" @click="submit">自定义上传</d-button>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const UploadStatus = ref({
      preLoad: 0,
      uploading: 1,
      uploaded: 2,
      failed: 3,
    })
    const uploadRef = ref(null)
    const uploadedFiles = ref([])
    const fileOptions = reactive({
      multiple: true,
      accept: '.xls,.xlsx,.pages,.mp3,.png',
    })
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      method: 'post',
      additionalParameter: additionalParameter,
      maximumSize: 20,
      checkSameName: true,
    })
    const onSuccess = (result) => {
      console.log('success', result, uploadedFiles)
    }
    const onError = (error) => {
      console.log(error)
    }
    const deleteUploadedFile = (file) => {
      console.log('deleteUploadedFile ', file)
    }
    const setCustomUploadOptions = (file, options) => {
      let uploadOptions = options
      if (
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        uploadOptions = {
          uri: '/upload',
          additionalParameter: additionalParameter,
          maximumSize: 0.1,
          checkSameName: true,
        }
      }
      if (file.type === 'image/png') {
        uploadOptions = {
          uri: 'http://localhost:4000/files/upload',
          additionalParameter: additionalParameter,
          maximumSize: 0.5,
          checkSameName: true,
        }
      }
      return uploadOptions
    }
    const submit = () => {
      console.log(uploadRef)
      uploadRef.value.fileUpload()
    }
    watch(uploadedFiles, (val) => {
      console.log('uploadedFiles ', val)
    })
    return {
      fileOptions,
      uploadedFiles,
      uploadOptions,
      onSuccess,
      onError,
      deleteUploadedFile,
      setCustomUploadOptions,
      uploadRef,
      submit,
      UploadStatus,
    }
  },
}
</script>
<style>
.upload-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.upload-row .upload-body {
  width: 65%;
}
.upload-row .upload-btn {
  width: 30%;
  align-self: baseline;
}
.upload-row .table {
  width: 100%;
  max-width: 100%;
  margin: 8px 0 0 8px;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
}
.upload-row .table .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}
.upload-row .table tr {
  border: none;
}
.upload-row .table td {
  border: none;
  padding: 0;
}
</style>
```

:::

### 动态上传参数

用户可通过 beforeUpload 动态修改上传参数。

:::demo

```vue
<template>
  <d-multiple-upload
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="Upload"
    @success-event="onSuccess"
    @error-event="onError"
    :beforeUpload="beforeUpload"
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
      uri: 'http://localhost:4000/files/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'file',
      responseType: 'json',
    })
    const beforeUpload = (files) => {
      if (!files || !files.length) {
        return
      }
      files[0].uploadOptions.uri = '/upload2'
      console.log(files)
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

### 任意区域上传

用户可通过默认 slot 支持文件任意区域上传。
:::demo

```vue
<template>
  <d-single-upload
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="Upload"
    @success-event="onSuccess"
    @error-event="onError"
    :beforeUpload="beforeUpload"
    :showTip="true"
  >
    <d-button type="primary">选取文件</d-button>
    <template v-slot:preloadFiles="slotProps">
      <table
        class="table preload-files"
        v-if="slotProps.fileUploaders.length > 0"
      >
        <tr
          v-for="(fileUploader, index) in slotProps.fileUploaders"
          :key="index"
          class="row"
        >
          <td width="50%">
            <span>{{ fileUploader.file.name }}</span>
          </td>

          <td width="25%">
            <span v-if="fileUploader.status === UploadStatus.preLoad"
              >preLoad</span
            >
            <span v-if="fileUploader.status === UploadStatus.uploading"
              >Uploading}</span
            >
            <span v-if="fileUploader.status === UploadStatus.uploaded"
              >Uploaded</span
            >
            <span v-if="fileUploader.status === UploadStatus.failed"
              >Upload Failed</span
            >
          </td>

          <td>
            <d-button
              size="xs"
              v-if="fileUploader.status !== UploadStatus.uploaded"
              :disabled="fileUploader.status === UploadStatus.uploading"
              @click="(event) => slotProps.deleteFile(event)"
            >
              Delete
            </d-button>
          </td>
        </tr>
      </table>
    </template>
    <template v-slot:uploadedFiles="slotProps">
      <table
        class="table uploaded-files"
        v-if="slotProps.uploadedFiles.length > 0"
      >
        <tbody>
          <tr
            v-for="(uploadedFile, index) in slotProps.uploadedFiles"
            :key="index"
            class="row"
          >
            <td width="50%">
              <span>{{ uploadedFile.name }}</span>
            </td>
            <td width="25%">
              <span>Uploaded</span>
            </td>
            <td>
              <d-button
                size="xs"
                @click="(event) => slotProps.deleteFile(uploadedFile)"
              >
                Delete
              </d-button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </d-single-upload>
</template>
<script>
import { reactive, ref, watch } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const UploadStatus = ref({
      preLoad: 0,
      uploading: 1,
      uploaded: 2,
      failed: 3,
    })
    const uploadedFiles = ref([])
    const fileOptions = reactive({
      accept: '.png',
      multiple: false,
      webkitdirectory: false,
    })
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'file',
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
    watch(uploadedFiles, (newValue, oldValue) => {
      console.log('uploadedFiles', {
        newValue,
        oldValue,
      })
    })
    return {
      fileOptions,
      uploadedFiles,
      uploadOptions,
      beforeUpload,
      onSuccess,
      onError,
      UploadStatus,
    }
  },
}
</script>
```

:::

自定义默认 slot，初始显示已上传文件。

:::demo

```vue
<template>
  <d-single-upload
    :file-options="fileOptions"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="Upload"
    @success-event="onSuccess"
    @error-event="onError"
    :beforeUpload="beforeUpload"
    :showTip="true"
    :withoutBtn="true"
    class="upload-demo"
    :autoUpload="true"
  >
    <div class="upload-trigger">
      <div>
        <d-icon name="upload" size="24px" />
      </div>
      <div style="marginTop: 20px">
        将文件拖到此处，或
        <span class="link">点击上传</span>
      </div>
    </div>
    <template v-slot:preloadFiles="slotProps">
      <table
        class="table preload-files"
        v-if="slotProps.fileUploaders.length > 0"
      >
        <tr
          v-for="(fileUploader, index) in slotProps.fileUploaders"
          :key="index"
          class="row"
        >
          <td width="50%">
            <span>{{ fileUploader.file.name }}</span>
          </td>

          <td width="25%">
            <span v-if="fileUploader.status === UploadStatus.preLoad"
              >preLoad</span
            >
            <span v-if="fileUploader.status === UploadStatus.uploading"
              >Uploading</span
            >
            <span v-if="fileUploader.status === UploadStatus.uploaded"
              >Uploaded</span
            >
            <span v-if="fileUploader.status === UploadStatus.failed"
              >Upload Failed</span
            >
          </td>

          <td>
            <d-button
              size="xs"
              v-if="fileUploader.status !== UploadStatus.uploaded"
              :disabled="fileUploader.status === UploadStatus.uploading"
              @click="(event) => slotProps.deleteFile(event)"
            >
              Delete
            </d-button>
          </td>
        </tr>
      </table>
    </template>
    <template v-slot:uploadedFiles="slotProps">
      <table
        class="table uploaded-files"
        v-if="slotProps.uploadedFiles.length > 0"
      >
        <tbody>
          <tr
            v-for="(uploadedFile, index) in slotProps.uploadedFiles"
            :key="index"
            class="row"
          >
            <td width="50%">
              <span>{{ uploadedFile.name }}</span>
            </td>
            <td width="25%">
              <span>Uploaded</span>
            </td>
            <td>
              <d-button
                size="xs"
                @click="(event) => slotProps.deleteFile(uploadedFile)"
              >
                Delete
              </d-button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </d-single-upload>
</template>
<script>
import { reactive, ref, watch } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const UploadStatus = ref({
      preLoad: 0,
      uploading: 1,
      uploaded: 2,
      failed: 3,
    })
    const uploadedFiles = ref([])
    const fileOptions = reactive({
      accept: '.png',
      multiple: false,
      webkitdirectory: false,
    })
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'file',
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
    watch(uploadedFiles, (newValue, oldValue) => {
      console.log('uploadedFiles', {
        newValue,
        oldValue,
      })
    })
    return {
      fileOptions,
      uploadedFiles,
      uploadOptions,
      beforeUpload,
      onSuccess,
      onError,
      UploadStatus,
    }
  },
}
</script>
<style>
.upload-demo .upload-trigger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.upload-demo .upload-trigger .link {
  color: blue;
}
</style>
```

:::

### API

d-single-upload 参数

| **参数**               | **类型**                          | **默认**   | 说明                                                                                     | **跳转 Demo**         |
| ---------------------- | --------------------------------- | ---------- | ---------------------------------------------------------------------------------------- | --------------------- |
| fileOptions            | [IFileOptions](#ifileoptions)     | --         | 必选，待上传文件配置                                                                     | [基本用法](#基本用法) |
| uploadOptions          | [IUploadOptions](#iuploadoptions) | \--        | 必选，上传配置                                                                           | [基本用法](#基本用法) |
| autoUpload             | `boolean`                         | false      | 可选，是否自动上传                                                                       | [基本用法](#基本用法) |
| placeholderText        | `string`                          | '选择文件' | 可选，上传输入框中的 Placeholder 文字                                                    | [基本用法](#基本用法) |
| uploadText             | `string`                          | '上传'     | 可选，上传按钮文字                                                                       | [基本用法](#基本用法) |
| uploadedFiles          | `Array<Object>`                   | []         | 可选，获取已上传的文件列表                                                               | [基本用法](#基本用法) |
| withoutBtn             | `boolean`                         | false      | 可选，是否舍弃按钮                                                                       | [基本用法](#基本用法) |
| enableDrop             | `boolean`                         | false      | 可选，是否支持拖拽                                                                       | [基本用法](#基本用法) |
| beforeUpload           | `boolean Promise<boolean> `       | \--        | 可选，上传前的回调，通过返回`true` or `false` ,控制文件是否上传,参数为文件信息及上传配置 | [基本用法](#基本用法) |
| dynamicUploadOptionsFn | [IUploadOptions](#iuploadoptions) | \--        | 为文件动态设置自定义的上传参数, 参数为当前选中文件及`uploadOptions`的值                  | [基本用法](#基本用法) |
| disabled               | `boolean`                         | false      | 可选，是否禁用上传组件                                                                   | [基本用法](#基本用法) |
| showTip                | `boolean`                         | false      | 可选，是否显示上传提示信息                                                               | [自动上传](#自动上传) |

d-single-upload 事件

| 参数                    | 类型                                               | 说明                                                                                                                   | 跳转 Demo             |
| ----------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------- |
| fileOver                | `EventEmitter<boolean>`                            | 支持拖拽上传时，文件移动到可拖放区域触发事件,可拖动的元素移出放置目标时返回`false`，元素正在拖动到放置目标时返回`true` | [基本用法](#基本用法) |
| fileDrop                | `EventEmitter<any>`                                | 支持拖拽上传时，当前拖拽的文件列表回调，单文件上传默认返回第一个文件                                                   | [基本用法](#基本用法) |
| successEvent            | `EventEmitter<Array<{file: File; response: any}>>` | 上传成功时的回调函数,返回文件及 xhr 的响应信息                                                                         | [基本用法](#基本用法) |
| errorEvent              | `EventEmitter<{file: File; response: any}>`        | 上传错误时的回调函数，返回上传失败的错误信息                                                                           | [基本用法](#基本用法) |
| deleteUploadedFileEvent | `EventEmitter<string>`                             | 删除上传文件的回调函数，返回删除文件的路径信息                                                                         | [基本用法](#基本用法) |
| fileSelect              | `EventEmitter<File>`                               | 文件选择后的回调函数，返回已选择文件信息                                                                               | [基本用法](#基本用法) |

d-multiple-upload 参数

| **参数**               | **类型**                          | **默认**       | 说明                                                                                     | **跳转 Demo**             |
| ---------------------- | --------------------------------- | -------------- | ---------------------------------------------------------------------------------------- | ------------------------- |
| fileOptions            | [IFileOptions](#ifileoptions)     | --             | 必选，待上传文件配置                                                                     | [多文件上传](#多文件上传) |
| uploadOptions          | [IUploadOptions](#iuploadoptions) | \--            | 必选，上传配置                                                                           | [多文件上传](#多文件上传) |
| autoUpload             | `boolean`                         | false          | 可选，是否自动上传                                                                       | [自动上传](#自动上传)     |
| placeholderText        | `string`                          | '选择多个文件' | 可选，上传输入框中的 Placeholder 文字                                                    | [基本用法](#基本用法)     |
| uploadText             | `string`                          | '上传'         | 可选，上传按钮文字                                                                       | [基本用法](#基本用法)     |
| uploadedFiles          | `Array<Object>`                   | []             | 可选，获取已上传的文件列表                                                               | [多文件上传](#多文件上传) |
| withoutBtn             | `boolean`                         | false          | 可选，是否舍弃按钮                                                                       | [自定义](#自定义)         |
| enableDrop             | `boolean`                         | false          | 可选，是否支持拖拽                                                                       | [多文件上传](#多文件上传) |
| beforeUpload           | `boolean Promise<boolean>`        | \--            | 可选，上传前的回调，通过返回`true` or `false` ,控制文件是否上传,参数为文件信息及上传配置 | [多文件上传](#多文件上传) |
| dynamicUploadOptionsFn | [IUploadOptions](#iuploadoptions) | \--            | 为文件动态设置自定义的上传参数, 参数为当前选中文件及`uploadOptions`的值                  | [多文件上传](#多文件上传) |
| disabled               | `boolean`                         | false          | 可选，是否禁用上传组件                                                                   | [多文件上传](#多文件上传) |
| showTip                | `boolean`                         | false          | 可选，是否显示上传提示信息                                                               | [多文件上传](#多文件上传) |
| setCustomUploadOptions | [IUploadOptions](#iuploadoptions) | --             | 为每个文件设置自定义的上传参数, 参数为当前选中文件及`uploadOptions`的值                  | [自定义](#自定义)         |

d-multiple-upload 事件

| 参数                    | 类型                                               | 说明                                                                                                                   | 跳转 Demo                 |
| ----------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| fileOver                | `EventEmitter<boolean>`                            | 支持拖拽上传时，文件移动到可拖放区域触发事件,可拖动的元素移出放置目标时返回`false`，元素正在拖动到放置目标时返回`true` | [多文件上传](#多文件上传) |
| fileDrop                | `EventEmitter<any>`                                | 支持拖拽上传时，当前拖拽的文件列表回调，单文件上传默认返回第一个文件                                                   | [多文件上传](#多文件上传) |
| successEvent            | `EventEmitter<Array<{file: File; response: any}>>` | 上传成功时的回调函数,返回文件及 xhr 的响应信息                                                                         | [多文件上传](#多文件上传) |
| errorEvent              | `EventEmitter<{file: File; response: any}>`        | 上传错误时的回调函数，返回上传失败的错误信息                                                                           | [多文件上传](#多文件上传) |
| deleteUploadedFileEvent | `EventEmitter<string>`                             | 删除上传文件的回调函数，返回删除文件的路径信息                                                                         | [多文件上传](#多文件上传) |
| fileSelect              | `EventEmitter<File>`                               | 文件选择后的回调函数，返回已选择文件信息                                                                               | [多文件上传](#多文件上传) |

### slot

| name          | 默认 | 说明                                                                          | 跳转 Demo         |
| ------------- | ---- | ----------------------------------------------------------------------------- | ----------------- |
| preloadFiles  | --   | 可选，用于创建自定义 已选择文件列表模板，参数为 `{fileUploaders, deleteFile}` | [自定义](#自定义) |
| uploadedFiles | --   | 可选，用于创建自定义 已上传文件列表模板，参数为 `{uploadedFiles, deleteFile}` | [自定义](#自定义) |

### 接口 & 类型定义

### IUploadOptions

```typescript
export class IUploadOptions {
  // 上传接口地址
  uri: string
  // http 请求方法
  method?: string
  // 上传文件大小限制
  maximumSize?: number
  // 自定义请求headers
  headers?: { [key: string]: any }
  // 认证token
  authToken?: string
  // 认证token header标示
  authTokenHeader?: string
  // 上传额外自定义参数
  additionalParameter?: { [key: string]: any }
  // 上传文件字段名称，默认file
  fileFieldName?: string
  // 多文件上传,是否检查文件重名，设置为true，重名文件不会覆盖，否则会覆盖上传
  checkSameName?: boolean
  // 指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求
  withCredentials?: boolean
  //  手动设置返回数据类型
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
}
```

### IFileOptions

```typescript
export class IFileOptions {
  // 规定能够通过文件上传进行提交的文件类型,例如 accept: '.xls,.xlsx,.pages,.mp3,.png'
  accept?: string
  // 输入字段可选择多个值
  multiple?: boolean
  // 是否允许用户选择文件目录，而不是文件
  webkitdirectory?: boolean
}
```
