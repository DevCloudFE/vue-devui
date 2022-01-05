import { defineComponent, toRefs, computed, ref } from 'vue'
import { ToastService } from '../../toast'
import { uploadProps, UploadProps, UploadStatus } from './upload-types'
import { useUpload } from './use-upload'
import { useSelectFiles } from './use-select-files'
import { i18nText } from './i18n-upload'
import './upload.scss'

export default defineComponent({
  name: 'DSingleUpload',
  props: uploadProps,
  emits: [
    'fileDrop',
    'fileOver',
    'fileSelect',
    'successEvent',
    'errorEvent',
    'deleteUploadedFileEvent',
    'update:uploadedFiles'
  ],
  setup(props: UploadProps, ctx) {
    const {
      uploadOptions,
      fileOptions,
      placeholderText,
      autoUpload,
      withoutBtn,
      uploadText,
      disabled,
      beforeUpload,
      enableDrop,
      showTip,
      uploadedFiles
    } = toRefs<UploadProps>(props)
    const isDropOVer = ref(false)
    const { getFiles, fileUploaders, addFile, getFullFiles, deleteFile, upload, removeFiles } =
      useUpload()
    const { triggerSelectFiles, _validateFiles, triggerDropFiles } = useSelectFiles()
    const filename = computed(() => (getFiles()[0] || {}).name || '')

    const alertMsg = (errorMsg: string) => {
      ToastService.open({
        value: [{ severity: 'warn', content: errorMsg }]
      })
    }

    const canUpload = () => {
      let uploadResult = Promise.resolve(true)
      if (beforeUpload.value) {
        const result: any = beforeUpload.value(
          (getFullFiles()[0] as unknown as File) || ({} as File)
        )
        if (typeof result !== 'undefined') {
          if (result.then) {
            uploadResult = result
          } else {
            uploadResult = Promise.resolve(result)
          }
        }
      }
      return uploadResult
    }

    const fileUpload = () => {
      canUpload().then((canUpload) => {
        if (!canUpload) {
          return
        }
        upload()
          .then((results: { file: File; response: any; }[]) => {
            ctx.emit('successEvent', results)
            const newFiles = results.map((result) => result.file)
            const newUploadedFiles = [...newFiles, ...uploadedFiles.value]
            ctx.emit('update:uploadedFiles', newUploadedFiles)
          })
          .catch((error) => {
            console.error(error)
            if (fileUploaders.value[0]) {
              fileUploaders.value[0].percentage = 0
            }
            ctx.emit('errorEvent', error)
          })
      })
    }

    const checkValid = () => {
      fileUploaders.value.forEach((fileUploader) => {
        const checkResult = _validateFiles(
          fileUploader.file,
          fileOptions.value.accept,
          fileUploader.uploadOptions
        )
        if (checkResult.checkError) {
          deleteFile(fileUploader.file)
          alertMsg(checkResult.errorMsg)
        }
      })
    }

    const _dealFiles = (promise: Promise<File[]>) => {
      promise
        .then((files) => {
          files.forEach((file) => {
            // 单文件上传前先清空数组
            removeFiles()
            addFile(file, uploadOptions.value)
          })
          checkValid()
          const file = fileUploaders.value[0]?.file
          if (props.onChange) {
            props.onChange(file)
          }
          if (file) {
            ctx.emit('fileSelect', file)
          }
          if (autoUpload.value) {
            fileUpload()
          }
        })
        .catch((error: Error) => {
          alertMsg(error.message)
        })
    }

    const handleClick = () => {
      if (
        disabled.value ||
        (fileUploaders.value[0] && fileUploaders.value[0]?.status === UploadStatus.uploading)
      ) {
        return
      }
      _dealFiles(triggerSelectFiles(fileOptions.value))
    }

    const onDeleteFile = (event: Event) => {
      event.stopPropagation()
      const files = getFiles()
      deleteFile(files[0])
    }
    // 删除已上传文件
    const deleteUploadedFile = (file: File) => {
      const newUploadedFiles = uploadedFiles.value.filter((uploadedFile) => {
        return uploadedFile.name !== file.name
      })
      ctx.emit('deleteUploadedFileEvent', file)
      ctx.emit('update:uploadedFiles', newUploadedFiles)
    }
    const onFileDrop = (files: File[]) => {
      isDropOVer.value = false
      _dealFiles(triggerDropFiles(files))
      ctx.emit('fileDrop', files[0])
    }
    const onFileOver = (event: boolean) => {
      isDropOVer.value = event
      ctx.emit('fileOver', event)
    }
    return {
      placeholderText,
      filename,
      autoUpload,
      withoutBtn,
      fileUploaders,
      uploadText,
      handleClick,
      onDeleteFile,
      fileUpload,
      enableDrop,
      onFileDrop,
      onFileOver,
      isDropOVer,
      showTip,
      uploadedFiles,
      deleteUploadedFile
    }
  },
  render() {
    const {
      placeholderText,
      filename,
      autoUpload,
      withoutBtn,
      fileUploaders,
      uploadText,
      handleClick,
      onDeleteFile,
      fileUpload,
      enableDrop,
      onFileDrop,
      onFileOver,
      isDropOVer,
      disabled,
      showTip,
      uploadedFiles,
      deleteUploadedFile
    } = this
    return (
      <div>
        <div
          class='devui-upload'
          v-file-drop={{ enableDrop, isSingle: true, onFileDrop, onFileOver }}
          style={`border: ${isDropOVer ? '1px solid #15bf15' : '0'}`}
        >
          {this.$slots.default?.() ? (
            <div onClick={handleClick}>{this.$slots.default()}</div>
          ) : (
            <div
              class={`devui-input-group ${
                disabled || fileUploaders[0]?.status === UploadStatus.uploading ? 'disabled' : ''
              }`}
              onClick={handleClick}
            >
              <div class='devui-form-control devui-files-list'>
                {!filename && (
                  <div class='devui-file-item devui-upload-placeholder'>{placeholderText}</div>
                )}
                {!!filename && (
                  <div
                    class='devui-file-tag devui-file-item'
                    title={filename}
                    style='display: inline-block; margin: 0 2px 2px 0'
                  >
                    <span
                      class={`devui-filename ${
                        fileUploaders[0]?.status === UploadStatus.failed ? 'devui-failed-color' : ''
                      }`}
                    >
                      {filename}
                    </span>
                    <d-icon
                      name='close'
                      class={`${
                        fileUploaders[0]?.status === UploadStatus.failed
                          ? 'devui-upload-delete-file-button'
                          : ''
                      } ${
                        fileUploaders[0]?.status === UploadStatus.uploading ||
                        fileUploaders[0]?.status === UploadStatus.uploaded
                          ? 'devui-uploading-delete'
                          : ''
                      }`}
                      onClick={(event) => onDeleteFile(event)}
                    />
                    {fileUploaders[0]?.status === UploadStatus.uploading && (
                      <div class='icon devui-upload-progress'>
                        <d-progress
                          isCircle={true}
                          percentage={fileUploaders[0].percentage}
                          barbgcolor='#50D4AB'
                          strokeWidth={8}
                          showContent={false}
                        ></d-progress>
                      </div>
                    )}
                    {fileUploaders[0].status === UploadStatus.failed && (
                      <d-icon name='running' onClick={fileUpload} />
                    )}
                    {fileUploaders[0].status === UploadStatus.uploaded && (
                      <d-icon name='right' color='#50d4ab' />
                    )}
                  </div>
                )}
              </div>
              <span class='devui-input-group-addon'>
                <d-icon name='more-operate' color='#252b3a' />
              </span>
            </div>
          )}
          {!autoUpload && !withoutBtn && (
            <d-button
              style='marginLeft: 8px'
              variant='common'
              onClick={fileUpload}
              disabled={disabled || fileUploaders[0]?.status === UploadStatus.uploading}
            >
              {(!fileUploaders[0] || !fileUploaders[0]?.status) && <span>{uploadText}</span>}
              {fileUploaders[0]?.status === UploadStatus.uploading && <span>上传中...</span>}
              {fileUploaders[0]?.status === UploadStatus.uploaded && <span>已上传</span>}
              {fileUploaders[0]?.status === UploadStatus.failed && <span>上传失败</span>}
            </d-button>
          )}
        </div>
        {showTip && (
          <div class='devui-upload-tip'>
            {fileUploaders[0]?.status === UploadStatus.uploading && (
              <span class='devui-loading'>{i18nText.uploading}</span>
            )}
            {fileUploaders[0]?.status === UploadStatus.uploaded && (
              <div class='devui-loaded'>
                <d-icon name='right-o' color='#50d4ab' />
                <span style='vertical-align: middle'>{i18nText.uploadSuccess}</span>
              </div>
            )}
            {fileUploaders[0]?.status === UploadStatus.failed && (
              <div class='devui-upload-failed'>
                <d-icon name='info-o' color='#f66f6a' />
                <span style='vertical-align: middle'>
                  <span style='margin-right: 8px'>{i18nText.uploadFailed}</span>
                  <a onClick={fileUpload}>{i18nText.reUpload}</a>
                </span>
              </div>
            )}
          </div>
        )}
        <div>
          {this.$slots.preloadFiles?.({
            fileUploaders,
            deleteFile: onDeleteFile
          })}
        </div>
        <div>
          {this.$slots.uploadedFiles?.({
            uploadedFiles,
            deleteFile: deleteUploadedFile
          })}
        </div>
      </div>
    )
  }
})
