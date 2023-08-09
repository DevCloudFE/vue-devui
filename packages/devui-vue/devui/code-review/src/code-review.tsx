import { defineComponent, onMounted } from 'vue';
import type { SetupContext } from 'vue';
import CodeReviewHeader from './components/code-review-header';
import { CommentIcon } from './components/code-review-icons';
import { codeReviewProps } from './code-review-types';
import type { CodeReviewProps } from './code-review-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useCodeReview } from './composables/use-code-review';
import { useCodeReviewComment } from './composables/use-code-review-comment';
import './code-review.scss';

export default defineComponent({
  name: 'DCodeReview',
  props: codeReviewProps,
  emits: ['foldChange', 'addComment', 'afterViewInit'],
  setup(props: CodeReviewProps, ctx: SetupContext) {
    const ns = useNamespace('code-review');
    const { renderHtml, isFold, reviewContentRef, toggleFold } = useCodeReview(props, ctx);
    const {
      commentLeft,
      commentTop,
      onMouseEnter,
      onMouseMove,
      onMouseleave,
      onCommentMouseLeave,
      onCommentIconClick,
      insertComment,
      removeComment,
    } = useCodeReviewComment(reviewContentRef, ctx);

    onMounted(() => {
      ctx.emit('afterViewInit', { toggleFold, insertComment, removeComment });
    });

    return () => (
      <div class={ns.b()}>
        <CodeReviewHeader onClick={() => (isFold.value = !isFold.value)} />
        <div
          class={[ns.e('content'), { 'hide-content': isFold.value }]}
          v-html={renderHtml.value}
          ref={reviewContentRef}
          onMouseenter={onMouseEnter}
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
