import { defineComponent, inject } from 'vue';
import type { SetupContext } from 'vue';
import { Popover } from '../../../popover';
import { FoldIcon, CopyIcon } from './code-review-icons';
import { CodeReviewInjectionKey } from '../code-review-types';
import type { CodeReviewContext } from '../code-review-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { useCodeReviewCopy } from '../composables/use-code-review-header';

export default defineComponent({
  name: 'DCodeReviewHeader',
  emits: ['click'],
  setup(_, ctx: SetupContext) {
    const ns = useNamespace('code-review');
    const { diffType, diffInfo, isFold, rootCtx } = inject(CodeReviewInjectionKey) as CodeReviewContext;
    const { copyTipsText, tipsPopType, onCopy } = useCodeReviewCopy(diffInfo);
    const onClick = (e: Event) => {
      const composedPath = e.composedPath();
      const isPreventEvent = composedPath.some(
        (item) => (item as HTMLElement).classList?.contains('operate-area') || (item as HTMLElement).classList?.contains('icon-copy')
      );
      if (!isPreventEvent) {
        ctx.emit('click');
      }
    };

    return () => (
      <div class={[ns.e('header'), { [ns.em('header', 'unfold')]: !isFold.value }]} onClick={onClick}>
        <span class={['diff-type', diffType.value]}>{diffType.value[0].toUpperCase()}</span>
        <div class="file-info">
          <FoldIcon class={{ invert: !isFold.value }} />
          <span class="file-name">{diffInfo.newName}</span>
          <span class="diff-lines add-lines">+{diffInfo.addedLines}</span>
          <span class="diff-lines delete-lines">-{diffInfo.deletedLines}</span>
          <Popover content={copyTipsText.value} pop-type={tipsPopType.value} trigger="hover" position={['right']}>
            <CopyIcon class="icon-copy" onClick={onCopy} />
          </Popover>
        </div>
        {rootCtx.slots.headOperate && <div class="operate-area">{rootCtx.slots.headOperate()}</div>}
      </div>
    );
  },
});
