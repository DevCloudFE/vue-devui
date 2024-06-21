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

      const tag = '<script setup>';
      if (code.includes(tag)) {
        console.log("!!!!!!")
        code = code.replace(
          tag,
          `
<script setup lang="ts">
const demoList = import.meta.glob('../../components/${componentName}/*.vue') ?? []
console.log(demoList);
`
        );
      } else {
        code = `
<script setup lang="ts">
const demoList = import.meta.glob('../../components/${componentName}/*.vue') ?? []
</script>
${code}
`;
      }
      console.log(code);
      return {
        code,
      };
    },
  };
}
