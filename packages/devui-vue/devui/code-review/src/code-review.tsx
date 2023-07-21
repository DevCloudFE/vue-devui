import { defineComponent } from 'vue';
import { codeReviewProps } from './code-review-types';
import type { CodeReviewProps } from './code-review-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useCodeReview } from './composables/use-code-review';
import 'diff2html/bundles/css/diff2html.min.css';
import './code-review.scss';

export default defineComponent({
  name: 'DCodeReview',
  props: codeReviewProps,
  setup(props: CodeReviewProps) {
    const ns = useNamespace('code-review');
    const { renderHtml } = useCodeReview(props);

    return () => <div class={ns.b()} v-html={renderHtml.value}></div>;
  },
});
