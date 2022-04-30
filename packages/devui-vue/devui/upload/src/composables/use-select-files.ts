import { ref } from 'vue';
import type { IFileOptions, IUploadOptions } from '../upload-types';
import { getNotAllowedFileTypeMsg, getBeyondMaximalFileSizeMsg, getAllFilesBeyondMaximalFileSizeMsg } from '../i18n-upload';

export interface IReturnMessage {
  checkError: boolean;
  errorMsg?: string;
}

export interface IUseSelectFiles {
  triggerSelectFiles: (options: IFileOptions) => Promise<File[]>;
  _validateFiles: (file: File, accept: string, uploadOptions?: IUploadOptions) => IReturnMessage;
  triggerDropFiles: (files: File[]) => Promise<File[]>;
  checkAllFilesSize: (fileSize: number, maximumSize: number) => IReturnMessage | void;
}

export const useSelectFiles = (): IUseSelectFiles => {
  const BEYOND_MAXIMAL_FILE_SIZE_MSG = ref('');
  const simulateClickEvent = (input: HTMLInputElement) => {
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    input.dispatchEvent(evt);
  };
  const selectFiles = ({ multiple, accept, webkitdirectory }: IFileOptions): Promise<File[]> => {
    return new Promise((resolve) => {
      const tempNode = document.getElementById('d-upload-temp');
      if (tempNode) {
        document.body.removeChild(tempNode);
      }
      const input = document.createElement('input');

      input.style.position = 'fixed';
      input.style.left = '-2000px';
      input.style.top = '-2000px';

      input.setAttribute('id', 'd-upload-temp');
      input.setAttribute('type', 'file');
      if (multiple) {
        input.setAttribute('multiple', '');
      }
      if (accept) {
        input.setAttribute('accept', accept);
      }

      if (webkitdirectory) {
        input.setAttribute('webkitdirectory', '');
      }

      input.addEventListener('change', (event) => {
        resolve(Array.prototype.slice.call((event.target as HTMLInputElement).files));
      });
      document.body.appendChild(input); // Fix compatibility issue with Internet Explorer 11
      simulateClickEvent(input);
    });
  };

  const isAllowedFileType = (accept: string, file: File) => {
    if (accept) {
      const acceptArr = accept.split(',');
      const baseMimeType = file.type.replace(/\/.*$/, '');
      return acceptArr.some((type: string) => {
        const validType = type.trim();
        //  suffix name (e.g. '.png,.xlsx')
        if (validType.startsWith('.')) {
          return (
            file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.toLowerCase().length - validType.toLowerCase().length) > -1
          );
          // mime type like 'image/*'
        } else if (/\/\*$/.test(validType)) {
          return baseMimeType === validType.replace(/\/.*$/, '');
        }
        //  mime type like 'text/plain,application/json'
        return file.type === validType;
      });
    }
    return true;
  };

  const beyondMaximalSize = (fileSize: number, maximumSize?: number) => {
    if (maximumSize) {
      return fileSize > 1024 * 1024 * maximumSize;
    }
    return false;
  };

  const _validateFiles = (file: File, accept: string, uploadOptions?: IUploadOptions): IReturnMessage => {
    if (!isAllowedFileType(accept, file)) {
      return {
        checkError: true,
        errorMsg: getNotAllowedFileTypeMsg(file.name, accept),
      };
    }
    if (uploadOptions && beyondMaximalSize(file.size, uploadOptions.maximumSize)) {
      return {
        checkError: true,
        errorMsg: getBeyondMaximalFileSizeMsg(file.name, uploadOptions.maximumSize || 0),
      };
    }
    return { checkError: false, errorMsg: undefined };
  };

  const triggerSelectFiles = (fileOptions: IFileOptions) => {
    const { multiple, accept, webkitdirectory } = fileOptions;
    return selectFiles({ multiple, accept, webkitdirectory });
  };
  const triggerDropFiles = (files: File[]): Promise<File[]> => {
    return Promise.resolve(files);
  };
  const checkAllFilesSize = (fileSize: number, maximumSize: number) => {
    if (beyondMaximalSize(fileSize, maximumSize)) {
      BEYOND_MAXIMAL_FILE_SIZE_MSG.value = getAllFilesBeyondMaximalFileSizeMsg(maximumSize);
      return { checkError: true, errorMsg: BEYOND_MAXIMAL_FILE_SIZE_MSG.value };
    }
  };
  return {
    triggerSelectFiles,
    _validateFiles,
    triggerDropFiles,
    checkAllFilesSize,
  };
};
