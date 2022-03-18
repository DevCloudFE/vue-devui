import { onMounted, onUnmounted, SetupContext, toRefs } from 'vue';
import { FullscreenProps } from '../fullscreen-types';

const ESC_KEY_CODE = 27;

export default function useKeydown(props: FullscreenProps, ctx: SetupContext): void {
  const { modelValue } = toRefs(props);

  const handleKeydown = (event: KeyboardEvent) => {
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
