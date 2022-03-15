export default function genDirectiveTemplate() {
  return `\
// can export function.
export default {
  created() { },
  beforeMount() { },
  mounted() { },
  beforeUpdate() { },
  updated() { },
  beforeUnmount() { },
  unmounted() { }
}`;
}
