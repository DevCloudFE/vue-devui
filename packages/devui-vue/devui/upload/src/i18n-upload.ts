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
export const getAllFilesBeyondMaximalFileSizeMsg = (maximalSize: number): string =>
  `最大支持上传${maximalSize}MB的文件, 您本次上传的所有文件超过可上传文件大小`;
export const getBeyondMaximalFileSizeMsg = (filename: string, maximalSize: number): string => {
  return `最大支持上传${maximalSize}MB的文件, 您上传的文件"${filename}"超过可上传文件大小`;
};
export const getNotAllowedFileTypeMsg = (filename: string, scope: string): string => {
  return `支持的文件类型: "${scope}", 您上传的文件"${filename}"不在允许范围内，请重新选择文件`;
};
export const getExistSameNameFilesMsg = (sameNames: string): string => {
  return `您上传的 "${sameNames}" 存在重名文件, 请重新选择文件`;
};
