import { ref } from 'vue';
import type { DiffFile } from 'diff2html/lib/types';
import { toClipboard } from '../../../shared/utils';

export function useCodeReviewCopy(diffInfo: DiffFile) {
  const copyTipsText = ref('复制文件路径');
  const tipsPopType = ref('default');

  const onCopy = () => {
    toClipboard(diffInfo.newName).then(() => {
      // 点击后，popover消失，待popover问题解决后放开此处
      /* copyTipsText.value = '复制成功';
      tipsPopType.value = 'success'; */
    });
  };

  return { copyTipsText, tipsPopType, onCopy };
}
