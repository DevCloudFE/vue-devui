import { computed, ShallowRef, shallowRef } from 'vue';
import { TextareaProps, UseTextareaAutosize } from '../textarea-types';
import type { StyleValue } from 'vue';
import { isObject } from 'lodash';
import { calcTextareaHeight } from '../utils';

export function useTextareaAutosize(props: TextareaProps, textarea: ShallowRef<HTMLTextAreaElement | undefined>): UseTextareaAutosize {
  const textareaCalcStyle = shallowRef<StyleValue>('');
  const resizeTextarea = () => {
    const { autosize } = props;
    if (autosize) {
      const minRows = isObject(autosize) ? autosize.minRows : undefined;
      const maxRows = isObject(autosize) ? autosize.maxRows : undefined;
      textareaCalcStyle.value = {
        ...calcTextareaHeight(textarea.value, minRows, maxRows),
      };
    } else {
      textareaCalcStyle.value = {
        minHeight: calcTextareaHeight(textarea.value).minHeight,
      };
    }
  };
  const textareaStyle = computed<StyleValue>(() => [textareaCalcStyle.value, { resize: props.resize }]);

  return { textareaStyle, resizeTextarea };
}
