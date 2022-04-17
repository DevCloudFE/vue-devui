import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DHighlight',
  props: {
    code: String,
    language: String
  },
  setup(props, ctx) {
    return () => {
      return (
        <pre class={`language-${props.language}`}>
          {/* 暂做处理避免tsx语法被解析为html标签 */}
          <code innerHTML={props.code?.replace(/(<)/g, '&lt;')}></code>
        </pre>
      );
    };
  }
});
