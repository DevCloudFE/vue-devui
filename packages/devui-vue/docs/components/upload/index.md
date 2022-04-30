# Upload 上传

文件上传组件。

#### 何时使用

当需要将文件上传到后端服务器时。

### 基本用法

:::demo

```vue
<template>
  <d-upload v-model="uploadedFiles" :upload-options="uploadOptions" />
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const uploadedFiles = ref([]);
    const uploadOptions = ref({
      uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
    });

    return {
      uploadedFiles,
      uploadOptions,
    };
  },
};
</script>
```

:::

### 多文件上传

:::demo

```vue
<template>
  <d-upload v-model="uploadedFiles" :upload-options="uploadOptions" multiple />
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const uploadedFiles = ref([]);
    const uploadOptions = ref({
      uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
    });

    return {
      uploadedFiles,
      uploadOptions,
    };
  },
};
</script>
```

:::

### 拖动文件上传

:::demo

```vue
<template>
  <d-upload v-model="uploadedFiles" :upload-options="uploadOptions" droppable />
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const uploadedFiles = ref([]);
    const uploadOptions = ref({
      uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
    });

    return {
      uploadedFiles,
      uploadOptions,
    };
  },
};
</script>
```

:::

### 禁止上传

:::demo

```vue
<template>
  <d-upload v-model="uploadedFiles" :upload-options="uploadOptions" disabled />
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const uploadedFiles = ref([]);
    const uploadOptions = ref({
      uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
    });

    return {
      uploadedFiles,
      uploadOptions,
    };
  },
};
</script>
```

:::

### 任意区域上传

:::demo 用户可通过默认 slot 支持文件任意区域上传。

```vue
<template>
  <d-upload
    class="upload-demo"
    accept=".png"
    v-model="uploadedFiles"
    :upload-options="uploadOptions"
    droppable
    :on-success="onSuccess"
    :on-error="onError"
    :before-upload="beforeUpload"
    @file-over="fileOver"
    @file-drop="fileDrop"
    @file-select="fileSelect"
    @delete-uploaded-file="deleteUploadedFile"
  >
    <div class="upload-trigger">
      <div><d-icon name="upload" size="24px"></d-icon></div>
      <div style="margin-top: 20px;">
        将文件拖到此处，或
        <span class="link">点击上传</span>
      </div>
    </div>
    <template v-slot:uploaded-files="slotProps">
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
              <d-button size="xs" @click="(event) => slotProps.deleteFile(uploadedFile)">Delete</d-button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </d-upload>
</template>
<script>
import { ref, watch } from 'vue';

export default {
  setup() {
    const uploadedFiles = ref([
      {
        name: 'food.jpeg',
        url: 'https://devui.design/home',
      },
      {
        name: 'food2.jpeg',
        url: 'https://devui.design/home',
      },
    ]);

    const uploadOptions = ref({
      uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
    });

    const beforeUpload = (file) => {
      console.log(file);
      return true;
    };

    const onSuccess = (result) => {
      console.log('success', result);
    };

    const onError = () => {
      console.log(error);
    };

    const fileOver = (fileInfo) => {
      console.log('fileInfo:', fileInfo);
    };

    const fileDrop = (fileInfo) => {
      console.log('fileInfo:', fileInfo);
    };

    const fileSelect = (fileInfo) => {
      console.log('fileInfo:', fileInfo);
    };

    const deleteUploadedFile = (fileInfo) => {
      console.log('fileInfo:', fileInfo);
    };

    watch(uploadedFiles, (newValue, oldValue) => {
      console.log('uploadedFiles', {
        newValue,
        oldValue,
      });
    });

    return {
      uploadedFiles,
      uploadOptions,
      beforeUpload,
      onSuccess,
      onError,
      fileOver,
      fileDrop,
      fileSelect,
      deleteUploadedFile,
    };
  },
};
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
  color: #5e7ce0;
}
</style>
```

:::

### Upload 参数

| 参数名         | 类型                              | 默认  | 说明                                                                                         | 跳转 Demo                     |
| :------------- | :-------------------------------- | :---- | :------------------------------------------------------------------------------------------- | :---------------------------- |
| accept         | `string`                          | --    | 可选，规定能够通过文件上传进行提交的文件类型,<br>例如 `accept: '.xls,.xlsx,.png'`            | [任意区域上传](#任意区域上传) |
| before-upload  | `boolean Promise<boolean> `       | \--   | 可选，上传前的回调，通过返回`true` or `false`，<br>控制文件是否上传,参数为文件信息及上传配置 | [任意区域上传](#任意区域上传) |
| disabled       | `boolean`                         | false | 可选，是否禁用上传组件                                                                       | [禁止上传](#禁止上传)         |
| droppable      | `boolean`                         | false | 可选，是否支持拖拽                                                                           | [拖动文件上传](#拖动文件上传) |
| multiple       | `boolean`                         | false | 可选，是否支持多选文件                                                                       | [多文件上传](#多文件上传)     |
| upload-options | [IUploadOptions](#iuploadoptions) | \--   | 可选，上传配置                                                                               | [基本用法](#基本用法)         |
| uploaded-files | `Array<Object>`                   | []    | 可选，获取已上传的文件列表                                                                   | [基本用法](#基本用法)         |

### Upload 事件

| 事件名               | 类型                   | 说明                                                                                                                            | 跳转 Demo                     |
| :------------------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :---------------------------- |
| delete-uploaded-file | `(v: string) => void`  | 删除上传文件的回调函数，返回删除文件的路径信息                                                                                  | [任意区域上传](#任意区域上传) |
| file-drop            | `(v: any) => void`     | 支持拖拽上传时，当前拖拽的文件列表回调，<br>单文件上传默认返回第一个文件                                                        | [任意区域上传](#任意区域上传) |
| file-over            | `(v: boolean) => void` | 支持拖拽上传时，文件移动到可拖放区域触发事件，<br>可拖动的元素移出放置目标时返回`false`，<br>元素正在拖动到放置目标时返回`true` | [任意区域上传](#任意区域上传) |
| file-select          | `(v: File) => void`    | 文件选择后的回调函数，返回已选择文件信息                                                                                        | [任意区域上传](#任意区域上传) |

### Upload 插槽

| 插槽名         | 默认 | 说明                                                                         | 跳转 Demo                     |
| :------------- | :--- | :--------------------------------------------------------------------------- | :---------------------------- |
| default        | --   | 自定义默认内容                                                               | [任意区域上传](#任意区域上传) |
| uploaded-files | --   | 可选，用于创建自定义已上传文件列表模板，参数为 `{uploadedFiles, deleteFile}` | [任意区域上传](#任意区域上传) |

### Uplaod 类型定义

#### IUploadOptions

```ts
export class IUploadOptions {
  // 上传接口地址
  uri: string;
  // http 请求方法
  method?: string;
  // 上传文件大小限制
  maximumSize?: number;
  // 自定义请求headers
  headers?: { [key: string]: any };
  // 认证token
  authToken?: string;
  // 认证token header标示
  authTokenHeader?: string;
  // 上传额外自定义参数
  additionalParameter?: { [key: string]: any };
  // 上传文件字段名称，默认file
  fileFieldName?: string;
  // 多文件上传,是否检查文件重名，设置为true，重名文件不会覆盖，否则会覆盖上传
  checkSameName?: boolean;
  // 指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求
  withCredentials?: boolean;
  //  手动设置返回数据类型
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}
```
