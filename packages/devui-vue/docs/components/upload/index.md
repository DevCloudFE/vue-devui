# Upload 上传

文件上传组件。

### 何时使用

当需要将文件上传到后端服务器时。

### 基本用法

单文件上传、多文件上传、拖动文件上传、禁止上传。

<h4>Basic Usage</h4>

:::demo

```vue
<template>
  <d-upload :upload-options="uploadOptions" v-model:uploaded-files="uploadedFiles" />
</template>
<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'file',
      responseType: 'json'
    })
    return {
      uploadedFiles,
      uploadOptions
    }
  }
}
</script>
```

:::

<h4>Multiple Files</h4>

:::demo

```vue
<template>
  <d-upload :upload-options="uploadOptions" v-model:uploaded-files="uploadedFiles" multiple />
</template>
<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      headers: {},
      additionalParameter,
      maximumSize: 2.5,
      method: 'POST',
      fileFieldName: 'file',
      responseType: 'json'
    })
    return {
      uploadedFiles,
      uploadOptions
    }
  }
}
</script>
```

:::

<h4>Dragdrop</h4>

:::demo

```vue
<template>
  <d-upload
    ref="uploadRef"
    accept=".png,.zip"
    :enable-drop="true"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="Drag files"
    :without-btn="true"
    :before-upload="beforeUpload"
    :on-success="onSuccess"
    :on-error="onError"
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
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'file',
      responseType: 'json'
    })
    const beforeUpload = (file) => {
      console.log('beforeUpload', file)
      return true
    }
    const onSuccess = (result) => {
      console.log('success', result)
    }
    const onError = (error) => {
      console.log(error)
    }
    const fileDrop = (files) => {
      console.log('fileDrop', files)
    }

    const fileOver = (event) => {
      console.log('fileOver', event)
    }
    const submit = () => {
      uploadRef.value.fileUpload()
    }
    return {
      uploadedFiles,
      uploadOptions,
      uploadedFiles,
      beforeUpload,
      onSuccess,
      onError,
      fileDrop,
      fileOver,
      uploadRef,
      submit
    }
  }
}
</script>
```

:::

<h4>Disabled</h4>

:::demo

```vue
<template>
  <d-upload
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="Upload"
    :before-upload="beforeUpload"
    :on-success="onSuccess"
    :on-error="onError"
    :disabled="true"
  />
</template>
<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const uploadOptions = reactive({
      uri: '/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'dFile',
      withCredentials: true,
      responseType: 'json'
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
      uploadedFiles,
      uploadOptions,
      beforeUpload,
      onSuccess,
      onError
    }
  }
}
</script>
```

:::

### 自动上传

通过 autoUpload 设置自动上传。

:::demo

```vue
<template>
  <d-upload
    accept=".xls,.xlsx,.pages,.mp3,.png"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="选择文件"
    :on-success="onSuccess1"
    :on-error="onError"
    @delete-uploaded-file="deleteUploadedFile"
    :showTip="true"
    v-model:uploadedFiles="uploadedFiles"
    :auto-upload="true"
    :before-upload="beforeUpload"
    multiple
  />
</template>
<script>
import { reactive, ref, watch } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      method: 'post',
      additionalParameter: additionalParameter,
      maximumSize: 20,
      checkSameName: true
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
    const beforeUpload = () => {
      console.log('beforeUpload')
      return true
    }
    watch(uploadedFiles, (val) => {
      console.log('uploadedFiles ', val)
    })
    return {
      uploadedFiles,
      uploadOptions,
      onSuccess1,
      onError,
      deleteUploadedFile,
      beforeUpload
    }
  }
}
</script>
```

:::

### 动态上传参数

用户可通过 beforeUpload 动态修改上传参数。

:::demo

```vue
<template>
  <d-upload
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="Upload"
    :on-success="onSuccess"
    :on-error="onError"
    :beforeUpload="beforeUpload"
  />
</template>
<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'file',
      responseType: 'json'
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
      uploadedFiles,
      uploadOptions,
      beforeUpload,
      onSuccess,
      onError
    }
  }
}
</script>
```

:::

### 任意区域上传

用户可通过默认 slot 支持文件任意区域上传。
:::demo

```vue
<template>
  <d-upload
    accept=".png"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="Upload"
    :on-success="onSuccess"
    :on-error="onError"
    :beforeUpload="beforeUpload"
    :showTip="true"
  >
    <d-button>选取文件</d-button>
    <template v-slot:preloadFiles="slotProps">
      <table class="table preload-files" v-if="slotProps.fileUploaders.length > 0">
        <tr v-for="(fileUploader, index) in slotProps.fileUploaders" :key="index" class="row">
          <td width="50%">
            <span>{{ fileUploader.file.name }}</span>
          </td>

          <td width="25%">
            <span v-if="fileUploader.status === UploadStatus.preLoad">preLoad</span>
            <span v-if="fileUploader.status === UploadStatus.uploading">Uploading}</span>
            <span v-if="fileUploader.status === UploadStatus.uploaded">Uploaded</span>
            <span v-if="fileUploader.status === UploadStatus.failed">Upload Failed</span>
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
      <table class="table uploaded-files" v-if="slotProps.uploadedFiles.length > 0">
        <tbody>
          <tr v-for="(uploadedFile, index) in slotProps.uploadedFiles" :key="index" class="row">
            <td width="50%">
              <span>{{ uploadedFile.name }}</span>
            </td>
            <td width="25%">
              <span>Uploaded</span>
            </td>
            <td>
              <d-button size="xs" @click="(event) => slotProps.deleteFile(uploadedFile)">
                Delete
              </d-button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </d-upload>
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
      failed: 3
    })
    const uploadedFiles = ref([])
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'file',
      responseType: 'json'
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
        oldValue
      })
    })
    return {
      uploadedFiles,
      uploadOptions,
      beforeUpload,
      onSuccess,
      onError,
      UploadStatus
    }
  }
}
</script>
```

:::

自定义默认 slot，初始显示已上传文件。

:::demo

```vue
<template>
  <d-upload
    accept=".png"
    :upload-options="uploadOptions"
    v-model:uploaded-files="uploadedFiles"
    placeholder-text="Upload"
    :on-success="onSuccess"
    :on-error="onError"
    :beforeUpload="beforeUpload"
    :showTip="true"
    :withoutBtn="true"
    class="upload-demo"
    :autoUpload="true"
    :enable-drop="true"
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
      <table class="table preload-files" v-if="slotProps.fileUploaders.length > 0">
        <tr v-for="(fileUploader, index) in slotProps.fileUploaders" :key="index" class="row">
          <td width="50%">
            <span>{{ fileUploader.file.name }}</span>
          </td>

          <td width="25%">
            <span v-if="fileUploader.status === UploadStatus.preLoad">preLoad</span>
            <span v-if="fileUploader.status === UploadStatus.uploading">Uploading</span>
            <span v-if="fileUploader.status === UploadStatus.uploaded">Uploaded</span>
            <span v-if="fileUploader.status === UploadStatus.failed">Upload Failed</span>
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
      <table class="table uploaded-files" v-if="slotProps.uploadedFiles.length > 0">
        <tbody>
          <tr v-for="(uploadedFile, index) in slotProps.uploadedFiles" :key="index" class="row">
            <td width="50%">
              <span>{{ uploadedFile.name }}</span>
            </td>
            <td width="25%">
              <span>Uploaded</span>
            </td>
            <td>
              <d-button size="xs" @click="(event) => slotProps.deleteFile(uploadedFile)">
                Delete
              </d-button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </d-upload>
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
      failed: 3
    })
    const uploadedFiles = ref([
      {
        name: 'food.jpeg',
        url: 'https://devui.design/home'
      },
      {
        name: 'food2.jpeg',
        url: 'https://devui.design/home'
      }
    ])
    const uploadOptions = reactive({
      uri: 'http://localhost:4000/files/upload',
      headers: {},
      additionalParameter,
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'file',
      responseType: 'json'
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
        oldValue
      })
    })
    return {
      uploadedFiles,
      uploadOptions,
      beforeUpload,
      onSuccess,
      onError,
      UploadStatus
    }
  }
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

d-upload 参数

| **参数**        | **类型**                          | **默认**   | 说明                                                                                     | **跳转 Demo**         |
| --------------- | --------------------------------- | ---------- | ---------------------------------------------------------------------------------------- | --------------------- |
| accept          | `string`                          | --         | 规定能够通过文件上传进行提交的文件类型,例如 accept: '.xls,.xlsx,.png'                    | [基本用法](#基本用法) |
| multiple        | `boolean`                         | false      | 是否支持多选文件                                                                         | [基本用法](#基本用法) |
| uploadOptions   | [IUploadOptions](#iuploadoptions) | \--        | 必选，上传配置                                                                           | [基本用法](#基本用法) |
| autoUpload      | `boolean`                         | false      | 可选，是否自动上传                                                                       | [基本用法](#基本用法) |
| placeholderText | `string`                          | '选择文件' | 可选，上传输入框中的 Placeholder 文字                                                    | [基本用法](#基本用法) |
| uploadText      | `string`                          | '上传'     | 可选，上传按钮文字                                                                       | [基本用法](#基本用法) |
| uploadedFiles   | `Array<Object>`                   | []         | 可选，获取已上传的文件列表                                                               | [基本用法](#基本用法) |
| withoutBtn      | `boolean`                         | false      | 可选，是否舍弃按钮                                                                       | [基本用法](#基本用法) |
| enableDrop      | `boolean`                         | false      | 可选，是否支持拖拽                                                                       | [基本用法](#基本用法) |
| beforeUpload    | `boolean Promise<boolean> `       | \--        | 可选，上传前的回调，通过返回`true` or `false` ,控制文件是否上传,参数为文件信息及上传配置 | [基本用法](#基本用法) |
| disabled        | `boolean`                         | false      | 可选，是否禁用上传组件                                                                   | [基本用法](#基本用法) |
| oneTimeUpload   | `boolean`                         | false      | 可选，是否只调用一次接口上传所有文件                                                     |                       |

d-upload 事件

| 参数               | 类型                   | 说明                                                                                                                   | 跳转 Demo             |
| ------------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------- |
| fileOver           | `(v: boolean) => void` | 支持拖拽上传时，文件移动到可拖放区域触发事件,可拖动的元素移出放置目标时返回`false`，元素正在拖动到放置目标时返回`true` | [基本用法](#基本用法) |
| fileDrop           | `(v: any) => void`     | 支持拖拽上传时，当前拖拽的文件列表回调，单文件上传默认返回第一个文件                                                   | [基本用法](#基本用法) |
| deleteUploadedFile | `(v: string) => void`  | 删除上传文件的回调函数，返回删除文件的路径信息                                                                         | [基本用法](#基本用法) |
| fileSelect         | `(v: File) => void`    | 文件选择后的回调函数，返回已选择文件信息                                                                               | [基本用法](#基本用法) |

### slot

| name          | 默认 | 说明                                                                          | 跳转 Demo         |
| ------------- | ---- | ----------------------------------------------------------------------------- | ----------------- |
| -             | --   | 自定义默认内容                                                                | [自定义](#自定义) |
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
