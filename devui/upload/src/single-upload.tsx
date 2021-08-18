import './upload.scss'

import { defineComponent, toRefs, computed, ref } from 'vue'
import { Observable } from 'rxjs'
import { last, map } from 'rxjs/operators'
import { ToastService } from '../../toast'
import { uploadProps, UploadProps, UploadStatus } from './upload-types'
import { useUpload } from './use-upload'
import { useSelectFiles } from './use-select-files'

export default defineComponent({
  name: 'DSingleUpload',
  props: uploadProps,
  emits: ['fileDrop', 'fileOver', 'fileSelect', 'successEvent', 'errorEvent'],
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
    } = toRefs<UploadProps>(props)
    const isDropOVer = ref(false)
    const {
      getFiles,
      fileUploaders,
      addFile,
      getFullFiles,
      deleteFile,
      upload,
    } = useUpload()
    const { triggerSelectFiles, _validateFiles, triggerDropFiles } =
      useSelectFiles()
    const filename = computed(() => (getFiles()[0] || {}).name || '')

    const alertMsg = (errorMsg) => {
      ToastService.open({
        value: [{ severity: 'warn', content: errorMsg }],
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
          } else if (result.subscribe) {
            uploadResult = (result as Observable<boolean>).toPromise()
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
          .pipe(last())
          .subscribe(
            (results: Array<{ file: File; response: any; }>) => {
              ctx.emit('successEvent', results)
              // results.forEach((result) => {
              //   this.singleUploadViewComponent.uploadedFilesComponent.addAndOverwriteFile(
              //     result.file
              //   )
              // })
            },
            (error) => {
              console.error(error)
              if (fileUploaders.value[0]) {
                fileUploaders.value[0].percentage = 0
              }
              // this.singleUploadViewComponent.uploadedFilesComponent.cleanUploadedFiles()
              ctx.emit('errorEvent', error)
            }
          )
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

    const _dealFiles = (observale) => {
      observale
        .pipe(
          map((file) => {
            addFile(file, uploadOptions.value)
            return file
          })
        )
        .subscribe(
          () => {
            // this.singleUploadViewComponent.uploadedFilesComponent.cleanUploadedFiles();
            checkValid()
            const file = fileUploaders[0]?.file
            if (props.onChange) {
              props.onChange(file)
            }
            if (file) {
              ctx.emit('fileSelect', file)
            }
            if (autoUpload.value) {
              fileUpload()
            }
          },
          (error: Error) => {
            alertMsg(error.message)
          }
        )
    }

    const handleClick = () => {
      if (
        disabled.value ||
        (fileUploaders.value[0] &&
          fileUploaders.value[0]?.status === UploadStatus.uploading)
      ) {
        return
      }
      _dealFiles(triggerSelectFiles(fileOptions.value))
    }

    const onDeleteFile = (event) => {
      event.stopPropagation()
      const files = getFiles()
      deleteFile(files[0])
    }
    const onFileDrop = (files) => {
      isDropOVer.value = false
      _dealFiles(
        triggerDropFiles(fileOptions.value, uploadOptions.value, files)
      )
      ctx.emit('fileDrop', files[0])
    }
    const onFileOver = (event) => {
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
    } = this

    return (
      <div
        class="devui-upload"
        v-file-drop={{ enableDrop, isSingle: true, onFileDrop, onFileOver }}
        style={`border: ${isDropOVer ? '1px solid #15bf15' : '0'}`}
      >
        <div
          class={`devui-input-group ${
            disabled || fileUploaders[0]?.status === UploadStatus.uploading
              ? 'disabled'
              : ''
          }`}
          onClick={handleClick}
        >
          <div class="devui-form-control devui-files-list">
            {!filename && (
              <div class="devui-file-item devui-upload-placeholder">
                {placeholderText}
              </div>
            )}
            {!!filename && (
              <div
                class="devui-file-tag devui-file-item"
                title={filename}
                style="display: inline-block; margin: 0 2px 2px 0"
              >
                <span
                  class={`devui-filename ${
                    fileUploaders[0]?.status === UploadStatus.failed
                      ? 'devui-failed-color'
                      : ''
                  }`}
                >
                  {filename}
                </span>
                <span
                  class={`icon icon-close ${
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
                ></span>
                {fileUploaders[0].status === UploadStatus.failed && (
                  <span class="icon icon-running" onClick={fileUpload}></span>
                )}
                {fileUploaders[0].status === UploadStatus.uploaded && (
                  <span class="icon icon-right"></span>
                )}
              </div>
            )}
          </div>
          <span class="devui-input-group-addon">
            <svg
              class="svg-icon-dot"
              height="1em"
              width="1em"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m400.31892 176.970574c0-61.574381 50.113351-111.680569 111.679545-111.680569 61.576427 0 111.680569 50.106188 111.680569 111.680569 0 61.568241-50.104141 111.679545-111.680569 111.679545-61.566194 0-111.679545-50.111304-111.679545-111.679545zm0 335.028403c0-61.568241 50.113351-111.678522 111.679545-111.678522 61.576427 0 111.680569 50.110281 111.680569 111.678522 0 61.574381-50.105165 111.682615-111.680569 111.682615-61.566194 0-111.679545-50.108235-111.679545-111.682615zm0 335.037612c0-61.572334 50.113351-111.679545 111.679545-111.679545 61.575404 0 111.680569 50.107211 111.680569 111.679545 0 61.567217-50.105165 111.672382-111.680569 111.672382-61.566194 0-111.679545-50.105164-111.679545-111.672382zm0 0" />
            </svg>
          </span>
        </div>

        {!autoUpload && !withoutBtn && (
          <d-button
            style="marginLeft: 8px"
            bsStyle="common"
            onClick={fileUpload}
            disabled={
              disabled || fileUploaders[0]?.status === UploadStatus.uploading
            }
          >
            {(!fileUploaders[0] || !fileUploaders[0]?.status) && (
              <span>{uploadText}</span>
            )}
            {fileUploaders[0]?.status === UploadStatus.uploading && (
              <span>上传中...</span>
            )}
            {fileUploaders[0]?.status === UploadStatus.uploaded && (
              <span>已上传</span>
            )}
            {fileUploaders[0]?.status === UploadStatus.failed && (
              <span>上传失败</span>
            )}
          </d-button>
        )}
      </div>
    )
  },
})
