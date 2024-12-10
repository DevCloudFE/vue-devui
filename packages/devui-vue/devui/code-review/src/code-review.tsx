/* @jsxImportSource vue */
import { defineComponent, onMounted, provide, toRefs, ref } from 'vue';
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
  emits: ['foldChange', 'addComment', 'afterViewInit', 'contentRefresh', 'afterCheckLines'],
  setup(props: CodeReviewProps, ctx: SetupContext) {
    const ns = useNamespace('code-review');
    const { diffType } = toRefs(props);
    const reviewContentRef = ref();
    const {
      commentLeft,
      commentTop,
      mouseEvent,
      onCommentMouseLeave,
      onCommentIconClick,
      insertComment,
      removeComment,
      clearCheckedLines,
      updateLineNumberMap,
      updateCheckedLine,
    } = useCodeReviewComment(reviewContentRef, props, ctx);
    const { renderHtml, diffFile, onContentClick } = useCodeReview(props, ctx, reviewContentRef, updateLineNumberMap, updateCheckedLine);
    const { isFold, toggleFold } = useCodeReviewFold(props, ctx);

    onMounted(() => {
      ctx.emit('afterViewInit', {
        toggleFold,
        insertComment,
        removeComment,
        clearCheckedLines,
      });
    });
    provide(CodeReviewInjectionKey, {
      diffType,
      reviewContentRef,
      diffInfo: diffFile.value[0],
      isFold,
      rootCtx: ctx,
    });

    return () => (
      <div class={ns.b()}>
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
