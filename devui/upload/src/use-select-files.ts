import { from, Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { IFileOptions, IUploadOptions } from './upload-types'

export const useSelectFiles = () => {
  const getNotAllowedFileTypeMsg = (filename, scope) => {
    return `支持的文件类型: "${scope}", 您上传的文件"${filename}"不在允许范围内，请重新选择文件`
  }
  const getBeyondMaximalFileSizeMsg = (filename, maximalSize) => {
    return `最大支持上传${maximalSize}MB的文件, 您上传的文件"${filename}"超过可上传文件大小`
  }
  const simulateClickEvent = (input) => {
    const evt = document.createEvent('MouseEvents')
    evt.initMouseEvent(
      'click',
      true,
      true,
      window,
      1,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    )
    input.dispatchEvent(evt)
  }
  const selectFiles = ({
    multiple,
    accept,
    webkitdirectory,
  }: IFileOptions): Promise<File[]> => {
    return new Promise((resolve) => {
      const tempNode = document.getElementById('d-upload-temp')
      if (tempNode) {
        document.body.removeChild(tempNode)
      }
      const input = document.createElement('input')

      input.style.position = 'fixed'
      input.style.left = '-2000px'
      input.style.top = '-2000px'

      input.setAttribute('id', 'd-upload-temp')
      input.setAttribute('type', 'file')
      if (multiple) {
        input.setAttribute('multiple', '')
      }
      if (accept) {
        input.setAttribute('accept', accept)
      }

      if (webkitdirectory) {
        input.setAttribute('webkitdirectory', '')
      }

      input.addEventListener('change', (event) => {
        resolve(
          Array.prototype.slice.call((event.target as HTMLInputElement).files)
        )
      })
      document.body.appendChild(input) // Fix compatibility issue with Internet Explorer 11
      simulateClickEvent(input)
    })
  }

  const isAllowedFileType = (accept: string, file: File) => {
    if (accept) {
      const acceptArr = accept.split(',')
      const baseMimeType = file.type.replace(/\/.*$/, '')
      return acceptArr.some((type: string) => {
        const validType = type.trim()
        //  suffix name (e.g. '.png,.xlsx')
        if (validType.startsWith('.')) {
          return (
            file.name
              .toLowerCase()
              .indexOf(
                validType.toLowerCase(),
                file.name.toLowerCase().length - validType.toLowerCase().length
              ) > -1
          )
          // mime type like 'image/*'
        } else if (/\/\*$/.test(validType)) {
          return baseMimeType === validType.replace(/\/.*$/, '')
        }
        //  mime type like 'text/plain,application/json'
        return file.type === validType
      })
    }
    return true
  }

  const beyondMaximalSize = (fileSize, maximumSize) => {
    if (maximumSize) {
      return fileSize > 1024 * 1024 * maximumSize
    }
    return false
  }

  const _validateFiles = (file, accept, uploadOptions) => {
    if (!isAllowedFileType(accept, <File>file)) {
      return {
        checkError: true,
        errorMsg: getNotAllowedFileTypeMsg((<File>file).name, accept),
      }
    }
    if (
      uploadOptions &&
      beyondMaximalSize((<File>file).size, uploadOptions.maximumSize)
    ) {
      return {
        checkError: true,
        errorMsg: getBeyondMaximalFileSizeMsg(
          (<File>file).name,
          uploadOptions.maximumSize
        ),
      }
    }
    return { checkError: false, errorMsg: undefined }
  }

  const triggerSelectFiles = (fileOptions: IFileOptions) => {
    const { multiple, accept, webkitdirectory } = fileOptions
    return from(selectFiles({ multiple, accept, webkitdirectory })).pipe(
      mergeMap((file) => <any>file)
    )
  }
  const triggerDropFiles = (
    fileOptions: IFileOptions,
    uploadOptions: IUploadOptions,
    files: any
  ) => {
    return new Observable((observer) => observer.next(files)).pipe(
      mergeMap((file) => <any>file)
    )
  }
  return {
    triggerSelectFiles,
    _validateFiles,
    triggerDropFiles,
  }
}
