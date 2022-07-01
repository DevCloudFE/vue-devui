import type { PropType, ExtractPropTypes, UnwrapRef } from 'vue';
import { FileUploader } from './file-uploader';

export class IUploadOptions {
  // 上传接口地址
  uri!: string | URL;
  // http 请求方法
  method?: string;
  // 上传文件大小限制
  maximumSize?: number;
  // 自定义请求headers
  headers?: {
    [key: string]: string;
  };
  // 认证token
  authToken?: string;
  // 认证token header标示
  authTokenHeader?: string;
  // 上传额外自定义参数
  additionalParameter?: {
    [key: string]: string | Blob;
  };
  // 上传文件字段名称，默认file
  fileFieldName?: string;
  // 多文件上传,是否检查文件重名，设置为true，重名文件不会覆盖，否则会覆盖上传
  checkSameName?: boolean;
  // 指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求
  withCredentials?: boolean;
  //  手动设置返回数据类型
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}

export class IFileOptions {
  accept?: string;
  multiple?: boolean;
  webkitdirectory?: boolean;
}

export enum UploadStatus {
  preLoad = 0,
  uploading,
  uploaded,
  failed,
}

export interface IFileResponse<T = unknown> {
  file: File;
  response: T;
}

type DynamicUploadOptionsFn = (files: unknown, uploadOptions: unknown) => IUploadOptions;
type ChangeFn = (files: File[], uploadFiles: File[]) => void;
type BeforeUploadFn = (file: UnwrapRef<FileUploader[]>) => boolean | Promise<boolean>;

export const uploadProps = {
  // 规定能够通过文件上传进行提交的文件类型,例如 accept: '.xls,.xlsx,.pages,.mp3,.png'
  accept: {
    type: String,
  },
  // 是否允许用户选择文件目录，而不是文件
  webkitdirectory: {
    type: Boolean,
    default: false,
  },
  uploadOptions: {
    type: Object as PropType<IUploadOptions>,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Array as PropType<File[]>,
    default: () => [],
  },
  droppable: {
    type: Boolean,
    default: false,
  },
  beforeUpload: {
    type: Function as PropType<BeforeUploadFn>,
  },
  /** @deprecated */
  dynamicUploadOptionsFn: {
    type: Function as PropType<DynamicUploadOptionsFn>,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onChange: {
    type: Function as PropType<ChangeFn>,
  },
  fileDrop: {
    type: Function as PropType<(v: unknown) => void>,
    default: undefined,
  },
  fileOver: {
    type: Function as PropType<(v: boolean) => void>,
    default: undefined,
  },
  fileSelect: {
    type: Function as PropType<(v: File) => void>,
    default: undefined,
  },
  deleteUploadedFile: {
    type: Function as PropType<(v: string) => void>,
    default: undefined,
  },
  onError: {
    type: Function as PropType<(v: { file: File; response: unknown }) => void>,
    default: undefined,
  },
  onSuccess: {
    type: Function as PropType<(v: { file: File; response: unknown }[]) => void>,
    default: undefined,
  },
  onExceed: {
    type: Function as PropType<(files: File[], uploadFiles: File[]) => void>,
    default: undefined,
  },
  onProgress: {
    type: Function as PropType<(files: File[], uploadFiles: File[]) => void>,
    default: undefined,
  },
  onPreview: {
    type: Function as PropType<(file: File) => void>,
    default: undefined,
  },
  oneTimeUpload: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 0,
  },
  httpRequest: {
    type: Function as PropType<(files: File[]) => void>,
    default: undefined,
  },
} as const;

export type UploadProps = ExtractPropTypes<typeof uploadProps>;
