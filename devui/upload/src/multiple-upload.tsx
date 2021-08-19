import './upload.scss'

import { defineComponent, toRefs, ref } from 'vue'
import { Observable } from 'rxjs'
import { last, map, debounceTime } from 'rxjs/operators'
import { ToastService } from '../../toast'
import {
  uploadProps,
  UploadProps,
  UploadStatus,
  multiUploadProps,
} from './upload-types'
import { useSelectFiles } from './use-select-files'
import { useUpload } from './use-upload'
import {
  getFailedFilesCount,
  getSelectedFilesCount,
  getUploadingFilesCount,
  i18nText,
} from './i18n-upload'

export default defineComponent({
  name: 'DMultipleUpload',
  props: multiUploadProps,
  emits: [],
  setup(props, ctx) {
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
      oneTimeUpload,
      showTip,
    } = toRefs(props)
    const {
      triggerSelectFiles,
      _validateFiles,
      triggerDropFiles,
      checkAllFilesSize,
    } = useSelectFiles()
    const {
      getFiles,
      fileUploaders,
      addFile,
      getFullFiles,
      deleteFile,
      upload,
      resetSameNameFiles,
      removeFiles,
      _oneTimeUpload,
    } = useUpload()
    const isDropOVer = ref(false)
    const uploadTips = ref('')
    const alertMsg = (errorMsg: string) => {
      ToastService.open({
        value: [{ severity: 'warn', content: errorMsg }],
      })
    }
    const checkValid = () => {
      let totalFileSize = 0

      fileUploaders.value.forEach((fileUploader) => {
        totalFileSize += fileUploader.file.size

        const checkResult = _validateFiles(
          fileUploader.file,
          fileOptions.value.accept,
          fileUploader.uploadOptions
        )
        if (checkResult && checkResult.checkError) {
          deleteFile(fileUploader.file)
          alertMsg(checkResult.errorMsg)
          return
        }
      })

      if (oneTimeUpload.value) {
        const checkResult = checkAllFilesSize(
          totalFileSize,
          uploadOptions.value.maximumSize
        )
        if (checkResult && checkResult.checkError) {
          removeFiles()
          alertMsg(checkResult.errorMsg)
        }
      }
    }

    const _dealFiles = (observale) => {
      resetSameNameFiles()
      observale
        .pipe(
          map((file) => {
            addFile(file, uploadOptions.value)
            return file
          }),
          debounceTime(100)
        )
        .subscribe(() => {
          checkValid()
        })
    }

    const handleClick = () => {
      if (disabled.value) {
        return
      }
      _dealFiles(triggerSelectFiles(fileOptions.value))
    }

    const onFileDrop = (files) => {
      isDropOVer.value = false
      _dealFiles(
        triggerDropFiles(fileOptions.value, uploadOptions.value, files)
      )
      ctx.emit('fileDrop', files)
    }
    const onFileOver = (event) => {
      isDropOVer.value = event
      ctx.emit('fileOver', event)
    }
    const onDeleteFile = (event, file) => {
      event.stopPropagation()
      deleteFile(file)
    }
    const canUpload = () => {
      let uploadResult = Promise.resolve(true)
      if (beforeUpload.value) {
        const result: any = beforeUpload.value(getFullFiles())
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
    const fileUpload = (event, fileUploader?) => {
      if (event) {
        event.stopPropagation()
      }
      canUpload().then((_canUpload) => {
        if (!_canUpload) {
          removeFiles()
          return
        }
        const uploadObservable = oneTimeUpload.value
          ? _oneTimeUpload()
          : upload(fileUploader)
      })
    }

    const getStatus = () => {
      let uploadingCount = 0
      let uploadedCount = 0
      let failedCount = 0
      const filesCount = fileUploaders.value.length
      fileUploaders.value.forEach((fileUploader) => {
        if (fileUploader.status === UploadStatus.uploading) {
          uploadingCount++
        } else if (fileUploader.status === UploadStatus.uploaded) {
          uploadedCount++
        } else if (fileUploader.status === UploadStatus.failed) {
          failedCount++
        }
      })
      if (failedCount > 0) {
        uploadTips.value = getFailedFilesCount(failedCount)
        return 'failed'
      }
      if (uploadingCount > 0) {
        uploadTips.value = getUploadingFilesCount(uploadingCount, filesCount)
        return 'uploading'
      }
      if (uploadedCount === filesCount && uploadedCount !== 0) {
        return 'uploaded'
      }
      if (filesCount !== 0) {
        uploadTips.value = getSelectedFilesCount(filesCount)
        return 'selected'
      }
    }

    return {
      uploadOptions,
      fileOptions,
      placeholderText,
      autoUpload,
      withoutBtn,
      uploadText,
      disabled,
      beforeUpload,
      enableDrop,
      isDropOVer,
      onFileDrop,
      onFileOver,
      handleClick,
      fileUploaders,
      onDeleteFile,
      fileUpload,
      showTip,
      getStatus,
      uploadTips,
    }
  },
  render() {
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
      isDropOVer,
      onFileDrop,
      onFileOver,
      handleClick,
      fileUploaders,
      onDeleteFile,
      fileUpload,
      showTip,
      getStatus,
      uploadTips,
    } = this

    return (
      <>
        <div
          class="devui-upload"
          v-file-drop={{ enableDrop, isSingle: false, onFileDrop, onFileOver }}
          style={`border: ${isDropOVer ? '1px solid #15bf15' : '0'}`}
        >
          <div
            class={`devui-input-group ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
          >
            {fileUploaders.length === 0 && (
              <div class="devui-form-control devui-upload-placeholder">
                {placeholderText}
              </div>
            )}
            {fileUploaders.length > 0 && (
              <ul class="devui-form-control devui-files-list">
                {fileUploaders.map((fileUploader, index) => (
                  <li
                    key={index}
                    class="devui-file-item devui-file-tag"
                    style="display: inline-block; margin: 0 2px 2px 0"
                    title={fileUploader.file.name}
                  >
                    <span
                      class={`evui-filename ${
                        fileUploader.status === UploadStatus.failed
                          ? 'devui-failed-color'
                          : ''
                      }`}
                    >
                      {fileUploader.file.name}
                    </span>
                    <span
                      class={`icon icon-close ${
                        fileUploader?.status === UploadStatus.failed
                          ? 'devui-upload-delete-file-button'
                          : ''
                      } ${
                        fileUploader?.status === UploadStatus.uploading ||
                        fileUploader?.status === UploadStatus.uploaded
                          ? 'devui-uploading-delete'
                          : ''
                      }`}
                      onClick={(event) =>
                        onDeleteFile(event, fileUploader.file)
                      }
                    ></span>
                    {fileUploader.status === UploadStatus.uploaded && (
                      <div class="icon devui-upload-progress">
                        <d-progress
                          isCircle={true}
                          percentage={fileUploader.percentage}
                          barbgcolor="#50D4AB"
                          strokeWidth="8"
                          showContent={false}
                        ></d-progress>
                      </div>
                    )}
                    {fileUploader.status === UploadStatus.failed && (
                      <span class="icon icon-running"></span>
                    )}
                    {fileUploader.status === UploadStatus.uploaded && (
                      <span class="icon icon-right"></span>
                    )}
                  </li>
                ))}
              </ul>
            )}
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
              disabled={disabled}
              onClick={fileUpload}
            >
              {uploadText}
            </d-button>
          )}
        </div>
        {showTip && (
          <div class="devui-upload-tip">
            {getStatus() === 'selected' && (
              <span class="devui-loading">{uploadTips}</span>
            )}
            {getStatus() === 'uploading' && (
              <span class="devui-loading">
                <span style="margin-right: 8px">{uploadTips}</span>
                <a>{i18nText.cancelUpload}</a>
              </span>
            )}
            {getStatus() === 'uploaded' && (
              <div class="devui-loaded">
                <i class="icon icon-right-o"></i>
                <span style="vertical-align: middle">
                  {i18nText.uploadSuccess}
                </span>
              </div>
            )}
            {getStatus() === 'failed' && (
              <div class="devui-upload-failed">
                <i class="icon icon-info-o"></i>
                <span style="vertical-align: middle">
                  <span style="margin-right: 8px">{uploadTips}</span>
                  <a>{i18nText.reUpload}</a>
                </span>
              </div>
            )}
          </div>
        )}
      </>
    )
  },
})
