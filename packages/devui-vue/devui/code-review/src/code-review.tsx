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
import { useCodeViewTheme } from './composables/use-code-view-theme';

export default defineComponent({
  name: 'DCodeReview',
  props: codeReviewProps,
  emits: ['foldChange', 'addComment', 'afterViewInit', 'contentRefresh'],
  setup(props: CodeReviewProps, ctx: SetupContext) {
    const ns = useNamespace('code-review');
    const { renderHtml, reviewContentRef, diffFile, onContentClick } = useCodeReview(props, ctx);
    const { isFold, toggleFold } = useCodeReviewFold(props, ctx);
    const { commentLeft, commentTop, mouseEvent, onCommentMouseLeave, onCommentIconClick, insertComment, removeComment } =
      useCodeReviewComment(reviewContentRef, props, ctx);
    const { isDarkMode } = useCodeViewTheme(() => {});
    onMounted(() => {
      ctx.emit('afterViewInit', { toggleFold, insertComment, removeComment });
    });

    provide(CodeReviewInjectionKey, { reviewContentRef, diffInfo: diffFile.value[0], isFold, rootCtx: ctx });

    return () => (
      <div class={[ns.b(), {'dp-md-mark': isDarkMode.value}]}>
        <CodeReviewHeader onClick={() => (isFold.value = !isFold.value)} />
        <div v-show={!isFold.value}>
          {props.showBlob ? (
            ctx.slots.blob?.()
          ) : (
            <div
              class={[ns.e('content'), props.outputFormat]}
              v-html={renderHtml.value}
              ref={reviewContentRef}
              onClick={(e) => {
                onContentClick(e);
                onCommentIconClick(e);
              }}
              {...mouseEvent}></div>
          )}
        </div>
        {props.allowComment && (
          <div
            class="comment-icon"
            style={{ left: commentLeft.value + 'px', top: commentTop.value + 'px' }}
            onClick={onCommentIconClick}
            onMouseleave={onCommentMouseLeave}>
            <CommentIcon />
          </div>
        )}
      </div>
    );
  },
});
