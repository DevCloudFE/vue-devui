import { defineComponent, onMounted, provide } from 'vue';
import type { SetupContext } from 'vue';
import CodeReviewHeader from './components/code-review-header';
import { CommentIcon } from './components/code-review-icons';
import { codeReviewProps, CodeReviewInjectionKey } from './code-review-types';
import type { CodeReviewProps } from './code-review-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useCodeReview } from './composables/use-code-review';
import { useCodeReviewFold } from './composables/use-code-review-fold';
import { useCodeReviewComment } from './composables/use-code-review-comment';
import './code-review.scss';

export default defineComponent({
  name: 'DCodeReview',
  props: codeReviewProps,
  emits: ['foldChange', 'addComment', 'afterViewInit', 'contentRefresh'],
  setup(props: CodeReviewProps, ctx: SetupContext) {
    const ns = useNamespace('code-review');
    const { renderHtml, reviewContentRef, diffFile, onContentClick } = useCodeReview(props, ctx);
    const { isFold, toggleFold } = useCodeReviewFold(props, ctx);
    const { commentLeft, commentTop, onMouseMove, onMouseleave, onCommentMouseLeave, onCommentIconClick, insertComment, removeComment } =
      useCodeReviewComment(reviewContentRef, props, ctx);

    onMounted(() => {
      ctx.emit('afterViewInit', { toggleFold, insertComment, removeComment });
    });

    provide(CodeReviewInjectionKey, { reviewContentRef, diffInfo: diffFile.value[0], isFold, rootCtx: ctx });

    return () => (
      <div class={ns.b()}>
        <CodeReviewHeader onClick={() => (isFold.value = !isFold.value)} />
        <div
          class={[ns.e('content'), props.outputFormat, { 'hide-content': isFold.value }]}
          v-html={renderHtml.value}
          ref={reviewContentRef}
          onClick={onContentClick}
          onMousemove={onMouseMove}
          onMouseleave={onMouseleave}></div>
        <div
          class="comment-icon"
          style={{ left: commentLeft.value + 'px', top: commentTop.value + 'px' }}
          onClick={onCommentIconClick}
          onMouseleave={onCommentMouseLeave}>
          <CommentIcon />
        </div>
      </div>
    );
  },
});
