import { ref, computed } from 'vue';
import type { DiffFile } from 'diff2html/lib/types';
import { toClipboard } from '../../../shared/utils';
import {  getCurrentInstance } from 'vue';
import { createI18nTranslate } from '../../../locale/create';
const app = getCurrentInstance();
const t = createI18nTranslate('DCodeReview', app);

export function useCodeReviewCopy(diffInfo: DiffFile) {
  const copyTipsText = computed(() => ref(t('copyFilePath')).value);
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
