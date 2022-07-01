export const i18nText = {
  warning: '提醒',
  upload: '上传',
  chooseFile: '选择文件',
  chooseFiles: '选择多个文件',
  preload: '预加载',
  uploading: '上传中...',
  uploaded: '已上传',
  uploadFailed: '上传失败',
  uploadSuccess: '上传成功!',
  delete: '删除',
  reUpload: '重新上传',
  cancelUpload: '取消上传',
};

export const getFailedFilesCount = (failedCount: number): string => `${failedCount}个文件上传失败！`;
export const getUploadingFilesCount = (uploadingCount: number, filesCount: number): string => `${uploadingCount}/${filesCount}正在上传`;
export const getSelectedFilesCount = (filesCount: number): string => `已添加${filesCount}个文件`;
