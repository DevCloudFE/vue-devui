import type { PropType, ExtractPropTypes } from 'vue'
import { Observable } from 'rxjs'
export class IUploadOptions {
  // 上传接口地址
  uri: string
  // http 请求方法
  method?: string
  // 上传文件大小限制
  maximumSize?: number
  // 自定义请求headers
  headers?: {
    [key: string]: any
  }
  // 认证token
  authToken?: string
  // 认证token header标示
  authTokenHeader?: string
  // 上传额外自定义参数
  additionalParameter?: {
    [key: string]: any
  }
  // 上传文件字段名称，默认file
  fileFieldName?: string
  // 多文件上传,是否检查文件重名，设置为true，重名文件不会覆盖，否则会覆盖上传
  checkSameName?: boolean
  // 指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求
  withCredentials?: boolean
  //  手动设置返回数据类型
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'
}

export class IFileOptions {
  accept?: string
  multiple: boolean
  webkitdirectory: boolean
}

export enum UploadStatus {
  preLoad = 0,
  uploading,
  uploaded,
  failed,
}

type DynamicUploadOptionsFn = (files, uploadOptions) => IUploadOptions
type ChangeFn = (_: any) => void
type BeforeUploadFn = (
  file: File
) => boolean | Promise<boolean> | Observable<boolean>
export const uploadProps = {
  uploadOptions: {
    type: Object as PropType<IUploadOptions>,
    required: true,
  },
  fileOptions: {
    type: Object as PropType<IFileOptions>,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  autoUpload: {
    type: Boolean,
    default: false,
  },
  placeholderText: {
    type: String,
    default: '选择文件',
  },
  // TODO
  preloadFilesRef: {
    type: Object,
  },
  uploadText: {
    type: String,
    default: '上传',
  },
  uploadedFiles: {
    type: Array,
    default: () => [],
  },
  // TODO
  uploadedFilesRef: {
    type: Object,
  },
  withoutBtn: {
    type: Boolean,
    default: false,
  },
  enableDrop: {
    type: Boolean,
    default: false,
  },
  beforeUpload: {
    type: Function as PropType<BeforeUploadFn>,
  },
  dynamicUploadOptionsFn: {
    type: Function as PropType<DynamicUploadOptionsFn>,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showTip: {
    type: Boolean,
    default: false,
  },
  onChange: {
    type: Function as PropType<ChangeFn>,
  },
  fileDrop: {
    type: Function as PropType<(v: any) => void>,
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
  errorEvent: {
    type: Function as PropType<(v: { file: File; response: any; }) => void>,
    default: undefined,
  },
  successEvent: {
    type: Function as PropType<(v: { file: File; response: any; }[]) => void>,
    default: undefined,
  },
} as const
export const singleUploadViewProps = {
  uploadOptions: {
    type: Object as PropType<IUploadOptions>,
  },
  // TODO
  preloadFilesRef: {
    type: Object,
  },
  uploadedFiles: {
    type: Array,
  },
  // TODO
  uploadedFilesRef: {
    type: Object,
  },
  filePath: {
    type: String,
    required: true,
  },
  dynamicUploadOptionsFn: {
    type: Function as PropType<DynamicUploadOptionsFn>,
  },
}
export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type singleUploadViewProps = ExtractPropTypes<
  typeof singleUploadViewProps
>
