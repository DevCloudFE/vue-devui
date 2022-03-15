import { onMounted, onUnmounted, toRefs } from 'vue';

const ESC_KEY_CODE = 27;

export default function useKeydown(props, ctx) {
  const { modelValue } = toRefs(props);

  const handleKeydown = (event) => {
    if (event.keyCode === ESC_KEY_CODE && modelValue) {
      ctx.emit('update:modelValue', false);
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
  });
}
