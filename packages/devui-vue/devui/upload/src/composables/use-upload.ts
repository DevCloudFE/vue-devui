import { ref } from 'vue';
import { FileUploader } from '../file-uploader';
import { UploadStatus } from '../upload-types';

export const useUpload = () => {
  const fileUploaders = ref<Array<FileUploader>>([]);
  const filesWithSameName = ref([]);

  const checkFileSame = (fileName) => {
    let checkRel = true;

    for (let i = 0; i < fileUploaders.value.length; i++) {
      if (fileName === fileUploaders.value[i].file.name) {
        checkRel = false;
        if (filesWithSameName.value.indexOf(fileName) === -1) {
          filesWithSameName.value.push(fileName);
        }
        break;
      }
    }
    return checkRel;
  };

  const addFile = (file, options) => {
    if (options && options.checkSameName) {
      if (checkFileSame(file.name)) {
        fileUploaders.value.push(new FileUploader(file, options));
      }
    } else {
      fileUploaders.value.push(new FileUploader(file, options));
    }
  };

  const getFiles = () => {
    return fileUploaders.value.map((fileUploader) => {
      return fileUploader.file;
    });
  };

  const getFullFiles = () => {
    return fileUploaders.value.map((fileUploader) => {
      return fileUploader;
    });
  };

  const dealOneTimeUploadFiles = async (uploads) => {
    if (!uploads || !uploads.length) {
      return Promise.reject('no files');
    }
    // 触发文件上传
    let finalUploads = [];
    await uploads[0].send(uploads).finally(
      () =>
        // 根据uploads[0]的上传状态为其他file设置状态
        (finalUploads = uploads.map((file) => {
          file.status = uploads[0].status;
          file.percentage = uploads[0].percentage;
          return { file: file.file, response: uploads[0].response };
        }))
    );

    return finalUploads;
  };

  const upload = async (
    oneFile?
  ): Promise<
  | never
  | {
    file: File;
    response: any;
  }[]
  > => {
    let uploads: any[] = [];
    if (oneFile) {
      oneFile.percentage = 0;
      const uploadedFile = await oneFile.send();
      uploads.push(uploadedFile);
    } else {
      const preFiles = fileUploaders.value.filter((fileUploader) => fileUploader.status === UploadStatus.preLoad);
      const failedFiles = fileUploaders.value.filter((fileUploader) => fileUploader.status === UploadStatus.failed);
      const uploadFiles = preFiles.length > 0 ? preFiles : failedFiles;
      uploads = await Promise.all(
        uploadFiles.map(async (fileUploader) => {
          fileUploader.percentage = 0;
          const uploadedFile = await fileUploader.send();
          return uploadedFile;
        })
      );
    }
    if (uploads.length > 0) {
      return Promise.resolve(uploads);
    }

    return Promise.reject('no files');
  };

  const _oneTimeUpload = () => {
    const uploads = fileUploaders.value.filter((fileUploader) => fileUploader.status !== UploadStatus.uploaded);
    return dealOneTimeUploadFiles(uploads);
  };

  const deleteFile = (file) => {
    const deleteUploadFile = fileUploaders.value.find((fileUploader) => fileUploader.file === file);
    deleteUploadFile.cancel();
    fileUploaders.value = fileUploaders.value.filter((fileUploader) => {
      return file !== fileUploader.file;
    });
  };

  const removeFiles = () => {
    fileUploaders.value = [];
    filesWithSameName.value = [];
  };
  const getSameNameFiles = () => {
    return filesWithSameName.value.join();
  };
  const resetSameNameFiles = () => {
    filesWithSameName.value = [];
  };

  return {
    fileUploaders,
    getFiles,
    addFile,
    getFullFiles,
    deleteFile,
    upload,
    removeFiles,
    getSameNameFiles,
    resetSameNameFiles,
    _oneTimeUpload,
  };
};
