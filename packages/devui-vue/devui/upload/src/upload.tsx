import { defineComponent, toRefs, ref } from 'vue';
import { NotificationService } from '../../notification';
import type { IFileResponse } from './upload-types';
import { UploadStatus, UploadProps, uploadProps } from './upload-types';
import { useSelectFiles } from './composables/use-select-files';
import { useUpload } from './composables/use-upload';
import { getExistSameNameFilesMsg } from './i18n-upload';
import { FileUploader } from './file-uploader';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './upload.scss';

export default defineComponent({
  name: 'DUpload',
  props: uploadProps,
  emits: ['fileDrop', 'fileOver', 'fileSelect', 'deleteUploadedFile', 'update:modelValue'],
  setup(props: UploadProps, ctx) {
    const {
      uploadOptions,
      placeholder,
      autoUpload,
      disabled,
      beforeUpload,
      droppable,
      oneTimeUpload,
      modelValue,
      multiple,
      accept,
      webkitdirectory,
    } = toRefs(props);
    const ns = useNamespace('upload');
    const inputGroupNs = useNamespace('input-group');
    const formControlNs = useNamespace('form-control');
    const inputGroupAddOnNs = useNamespace('input-group-addon');
    const { triggerSelectFiles, _validateFiles, triggerDropFiles, checkAllFilesSize } = useSelectFiles();
    const { fileUploaders, addFile, getFullFiles, deleteFile, upload, resetSameNameFiles, removeFiles, _oneTimeUpload, getSameNameFiles } =
      useUpload();
    const isDropOVer = ref(false);
    const alertMsg = (errorMsg?: string) => {
      NotificationService.open({
        type: 'warning',
        content: errorMsg,
      });
    };
    const checkValid = () => {
      let totalFileSize = 0;
      fileUploaders.value.forEach((fileUploader) => {
        totalFileSize += fileUploader.file.size;

        const checkResult = _validateFiles(fileUploader.file, accept?.value || '', fileUploader.uploadOptions);
        if (checkResult && checkResult.checkError) {
          deleteFile(fileUploader.file);
          alertMsg(checkResult.errorMsg);
          return;
        }
      });
      if (oneTimeUpload.value) {
        const checkResult = checkAllFilesSize(totalFileSize, uploadOptions?.value?.maximumSize || 0);
        if (checkResult && checkResult.checkError) {
          removeFiles();
          alertMsg(checkResult.errorMsg);
        }
      }
    };
    const onFileOver = (event: boolean) => {
      isDropOVer.value = event;
      ctx.emit('fileOver', event);
    };
    // 删除已上传文件
    const deleteUploadedFile = (file: File) => {
      const newUploadedFiles = modelValue.value.filter((uploadedFile) => {
        return uploadedFile.name !== file.name;
      });
      ctx.emit('deleteUploadedFile', file);
      ctx.emit('update:modelValue', newUploadedFiles);
    };
    const onDeleteFile = (event: Event, file: File, status: UploadStatus) => {
      event.stopPropagation();
      if (status === UploadStatus.uploaded) {
        deleteUploadedFile(file);
      }
      deleteFile(file);
    };
    const canUpload = () => {
      let uploadResult = Promise.resolve(true);
      if (beforeUpload?.value) {
        const result: boolean | Promise<boolean> = beforeUpload?.value(getFullFiles());
        if (typeof result !== 'undefined') {
          if (typeof result === 'boolean') {
            uploadResult = Promise.resolve(result);
          } else {
            uploadResult = result;
          }
        }
      }
      return uploadResult;
    };
    const fileUpload = (event?: Event, fileUploader?: FileUploader) => {
      if (event) {
        event.stopPropagation();
      }
      canUpload().then((_canUpload) => {
        if (!_canUpload) {
          removeFiles();
          return;
        }
        const uploadObservable: Promise<IFileResponse[]> = oneTimeUpload.value ? _oneTimeUpload() : upload(fileUploader);
        uploadObservable
          ?.then((results: IFileResponse[]) => {
            props['on-success'] && props['on-success'](results);
            const newFiles = results.map((result) => result.file);
            const newUploadedFiles = [...newFiles, ...modelValue.value];
            ctx.emit('update:modelValue', newUploadedFiles);
          })
          .catch((error: IFileResponse) => {
            props['on-error'] && props['on-error'](error);
          });
      });
    };

    const _dealFiles = (promise: Promise<File[]>) => {
      resetSameNameFiles();
      promise
        .then((files) => {
          files.forEach((file) => {
            // 单文件上传前先清空数组
            if (!multiple.value) {
              removeFiles();
            }
            addFile(file, uploadOptions?.value);
          });
          checkValid();
          const sameNameFiles = getSameNameFiles();
          if (uploadOptions?.value && uploadOptions.value.checkSameName && sameNameFiles.length) {
            alertMsg(getExistSameNameFilesMsg(sameNameFiles));
          }
          const selectedFiles = fileUploaders.value
            .filter((fileUploader) => fileUploader.status === UploadStatus.preLoad)
            .map((fileUploader) => fileUploader.file);
          ctx.emit('fileSelect', selectedFiles);
          if (autoUpload.value) {
            fileUpload();
          }
        })
        .catch((error: Error) => {
          alertMsg(error.message);
        });
    };

    const handleClick = () => {
      if (disabled.value) {
        return;
      }
      _dealFiles(
        triggerSelectFiles({
          accept: accept?.value,
          multiple: multiple.value,
          webkitdirectory: webkitdirectory.value,
        })
      );
    };

    const onFileDrop = (files: File[]) => {
      isDropOVer.value = false;
      _dealFiles(triggerDropFiles(files));
      ctx.emit('fileDrop', files);
    };

    return () => (
      <div>
        <div
          class={ns.b()}
          v-file-drop={{ droppable, isSingle: !multiple, onFileDrop, onFileOver }}
          style={`border: ${isDropOVer.value ? '1px solid #15bf15' : '0'}`}>
          {ctx.slots.default?.() ? (
            <div onClick={handleClick}>{ctx.slots.default()}</div>
          ) : (
            <div class={[inputGroupNs.b(), disabled.value ? 'disabled' : '']} onClick={handleClick}>
              {fileUploaders.value.length === 0 && <div class={[formControlNs.b(), ns.e('placeholder')]}>{placeholder.value}</div>}
              {fileUploaders.value.length > 0 && (
                <ul class={[formControlNs.b(), ns.e('files-list')]}>
                  {fileUploaders.value.map((fileUploader, index) => (
                    <li
                      key={index}
                      class={[ns.e('file-item'), ns.e('file-tag')]}
                      style="display: inline-block; margin: 0 2px 2px 0"
                      title={fileUploader.file.name}>
                      <span class={[ns.e('filename'), fileUploader.status === UploadStatus.failed ? ns.m('failed-color') : '']}>
                        {fileUploader.file.name}
                      </span>
                      <d-icon
                        name="close"
                        class={[
                          fileUploader?.status === UploadStatus.failed ? ns.e('delete-file-button') : '',
                          fileUploader?.status === UploadStatus.uploading || fileUploader?.status === UploadStatus.uploaded
                            ? ns.e('delete')
                            : '',
                        ]}
                        onClick={(event: Event) => onDeleteFile(event, fileUploader.file, fileUploader.status)}
                      />
                      {fileUploader.status === UploadStatus.uploading && (
                        <div class={['icon', ns.e('progress')]}>
                          <d-progress
                            isCircle={true}
                            percentage={fileUploader.percentage}
                            barbgcolor="#50D4AB"
                            strokeWidth={8}
                            showContent={false}></d-progress>
                        </div>
                      )}
                      {fileUploader.status === UploadStatus.failed && <d-icon name="running" onClick={fileUpload} />}
                      {fileUploader.status === UploadStatus.uploaded && <d-icon name="right" color="#50d4ab" />}
                    </li>
                  ))}
                </ul>
              )}
              <span class={inputGroupAddOnNs.b()}>
                <d-icon name="more-operate" color="#252b3a" />
              </span>
            </div>
          )}
        </div>
        <div>
          {ctx.slots['uploaded-files']?.({
            uploadedFiles: modelValue.value,
            deleteFile: deleteUploadedFile,
          })}
        </div>
      </div>
    );
  },
});
