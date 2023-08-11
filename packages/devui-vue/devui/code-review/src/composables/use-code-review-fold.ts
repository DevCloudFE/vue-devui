import { toRefs, ref, watch } from 'vue';
import type { SetupContext } from 'vue';
import type { CodeReviewProps } from '../code-review-types';

export function useCodeReviewFold(props: CodeReviewProps, ctx: SetupContext) {
  const { fold } = toRefs(props);
  const isFold = ref(fold.value);

  const toggleFold = (status?: boolean) => {
    if (status !== undefined) {
      isFold.value = status;
    } else {
      isFold.value = !isFold.value;
    }
  };

  watch(fold, (val) => {
    isFold.value = val;
  });

  watch(isFold, () => {
    ctx.emit('foldChange', isFold.value);
  });

  return { isFold, toggleFold };
}
