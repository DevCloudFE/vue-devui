import { computed, ShallowRef, shallowRef } from 'vue';
import { TextareaProps, UseTextareaAutosize } from '../textarea-types';
import type { StyleValue } from 'vue';
import { isObject } from 'lodash';
import { computeTextareaHeight } from '../utils';

export function useTextareaAutosize(props: TextareaProps, textarea: ShallowRef<HTMLTextAreaElement | undefined>): UseTextareaAutosize {
  const textareaHeightStyle = shallowRef<StyleValue>('');
  const updateTextareaStyle = () => {
    const { autosize } = props;
    if (autosize) {
      const { minRows, maxRows } = isObject(autosize) ? autosize : { minRows: undefined, maxRows: undefined };
      textareaHeightStyle.value = {
        ...computeTextareaHeight(textarea.value, minRows, maxRows),
      };
    } else {
      textareaHeightStyle.value = {
        minHeight: computeTextareaHeight(textarea.value).minHeight,
      };
    }
  };
  const textareaStyle = computed<StyleValue>(() => [textareaHeightStyle.value, { resize: props.resize }]);

  return { textareaStyle, updateTextareaStyle };
}
