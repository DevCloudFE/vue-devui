<template>
  <div>
    <h4 class="title">Basic Usage</h4>
    <upload
      :file-options="fileOptions"
      :upload-options="uploadOptions"
      :uploaded-files="uploadedFiles"
    />
    <h4 class="title">Dragdrop</h4>
    <upload
      :enable-drop="true"
      :file-options="fileOptions2"
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
    <h4 class="title">Disabled</h4>
    <upload
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Upload } from '../../../../../devui/upload'
export default defineComponent({
  name: 'SingleBasicUpload',
  components: {
    Upload,
  },
  setup() {
    const additionalParameter = { name: 'tom', age: 11 }
    const uploadedFiles = ref([])
    const fileOptions = reactive({
      accept: '',
      multiple: false,
      webkitdirectory: false,
    })
    const fileOptions2 = reactive({
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
    const beforeUpload = (file: File) => {
      console.log(file)
      return true
    }
    const onSuccess = (result: { file: File; response: any }[]) => {
      console.log('success', result)
    }
    const onError = (error: { file: File; response: any }) => {
      console.log(error)
    }
    const fileDrop = (files: File[]) => {
      console.log(files)
    }

    const fileOver = (event: boolean) => {
      console.log(event)
    }
    return {
      fileOptions,
      fileOptions2,
      uploadOptions,
      uploadedFiles,
      beforeUpload,
      onSuccess,
      onError,
      fileDrop,
      fileOver,
    }
  },
})
</script>
<style scoped>
.title {
  color: #575d6c;
  font-weight: 700;
  font-size: 12px;
  margin: 16px 0;
}
</style>
