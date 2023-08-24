import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { codeEditorProps, CodeEditorProps } from './code-editor-types';
import { useCodeEditor } from './composables/use-code-editor';
import './code-editor.scss';

export default defineComponent({
    name: 'DCodeEditor',
    props: codeEditorProps,
    emits: ['update:modelValue', 'afterEditorInit', 'click'],
    setup(props: CodeEditorProps, ctx: SetupContext) {
        const { editorEl } = useCodeEditor(props, ctx);

        return () => <div ref={editorEl} class="devui-code-editor"></div>;
    }
});
