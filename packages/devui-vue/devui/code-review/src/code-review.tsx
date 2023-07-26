import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import CodeReviewHeader from './components/code-review-header';
import { codeReviewProps } from './code-review-types';
import type { CodeReviewProps } from './code-review-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useCodeReview } from './composables/use-code-review';
import 'diff2html/bundles/css/diff2html.min.css';
import './code-review.scss';

export default defineComponent({
  name: 'DCodeReview',
  props: codeReviewProps,
  emits: ['foldChange'],
  setup(props: CodeReviewProps, ctx: SetupContext) {
    const ns = useNamespace('code-review');
    const { renderHtml, isFold } = useCodeReview(props, ctx);

    return () => (
      <div class={ns.b()}>
        <CodeReviewHeader onClick={() => (isFold.value = !isFold.value)} />
        <div class={[ns.e('content'), { 'hide-content': isFold.value }]} v-html={renderHtml.value}></div>
      </div>
    );
  },
});
