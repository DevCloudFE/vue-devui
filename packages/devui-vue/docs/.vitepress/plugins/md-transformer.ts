import { Plugin } from 'vite';
const hasDemoBlock = (str: string) => /:::demo/gim.test(str);
export function MdTransformer(): Plugin {
  return {
    name: 'devui-markdown-demo-transformer',
    transform(code, id) {
      if (!id.endsWith('.md')) {
        return;
      }
      const componentName = id.split('/').at(-2);
      const markdownStringArray = code.split('\r\n');
      if (id.split('/').at(-3) !== 'components') {
        return code;
      }
      const setup = markdownStringArray.some(hasDemoBlock)
        ? `
<script setup lang="ts">
const demoList = import.meta.globEager('../../components/${componentName}/*.vue') ?? []
</script>
      `
        : '';
      return {
        code: `${setup}\n${code}`,
      };
    },
  };
}
