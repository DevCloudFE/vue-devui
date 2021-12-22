import type { PropType, ExtractPropTypes } from 'vue'
import { FileUploader } from './file-uploader'
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
  multiple?: boolean
  webkitdirectory: boolean
}

export enum UploadStatus {
  preLoad = 0,
  uploading,
  uploaded,
  failed
}

type DynamicUploadOptionsFn = (files, uploadOptions) => IUploadOptions
type ChangeFn = (_: any) => void
type BeforeUploadFn = (file: FileUploader) => boolean | Promise<boolean>
export const uploadProps = {
  // 规定能够通过文件上传进行提交的文件类型,例如 accept: '.xls,.xlsx,.pages,.mp3,.png'
  accept: {
    type: String
  },
  // 是否允许用户选择文件目录，而不是文件
  webkitdirectory: {
    type: Boolean,
    default: false
  },
  uploadOptions: {
    type: Object as PropType<IUploadOptions>,
    required: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  autoUpload: {
    type: Boolean,
    default: false
  },
  placeholderText: {
    type: String,
    default: '选择文件'
  },
  uploadText: {
    type: String,
    default: '上传'
  },
  uploadedFiles: {
    type: Array as PropType<File[]>,
    default: () => []
  },
  withoutBtn: {
    type: Boolean,
    default: false
  },
  enableDrop: {
    type: Boolean,
    default: false
  },
  beforeUpload: {
    type: Function as PropType<BeforeUploadFn>
  },
  /** @deprecated */
  dynamicUploadOptionsFn: {
    type: Function as PropType<DynamicUploadOptionsFn>
  },
  disabled: {
    type: Boolean,
    default: false
  },
  onChange: {
    type: Function as PropType<ChangeFn>
  },
  fileDrop: {
    type: Function as PropType<(v: any) => void>,
    default: undefined
  },
  fileOver: {
    type: Function as PropType<(v: boolean) => void>,
    default: undefined
  },
  fileSelect: {
    type: Function as PropType<(v: File) => void>,
    default: undefined
  },
  deleteUploadedFile: {
    type: Function as PropType<(v: string) => void>,
    default: undefined
  },
  'on-error': {
    type: Function as PropType<(v: { file: File; response: any; }) => void>,
    default: undefined
  },
  'on-success': {
    type: Function as PropType<(v: { file: File; response: any; }[]) => void>,
    default: undefined
  },
  oneTimeUpload: {
    type: Boolean,
    default: false
  }
} as const
export type UploadProps = ExtractPropTypes<typeof uploadProps>
