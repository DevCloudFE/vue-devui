import { watch, toRefs, onMounted, onUnmounted } from 'vue';
import {
  launchNormalFullscreen,
  exitNormalFullscreen,
  launchImmersiveFullScreen,
  exitImmersiveFullScreen,
  addFullScreenStyle,
  removeFullScreenStyle,
} from '../utils';

export default function useFullscreen(props, slotElement, ctx) {
  const { modelValue, mode } = toRefs(props);
  let exitByKeydown = false;

  watch(modelValue, (newVal) => {
    if (mode.value === 'normal') {
      handleNormalFullscreen(newVal);
    }

    if (mode.value === 'immersive') {
      handleImmersiveFullscreen(newVal);
    }
  });

  const handleNormalFullscreen = (isOpen) => {
    if (isOpen) {
      launchNormalFullscreen(slotElement.value, props);
      addFullScreenStyle();
    } else {
      exitNormalFullscreen(slotElement.value);
      removeFullScreenStyle();
    }
  };

  const handleImmersiveFullscreen = (isOpen) => {
    if (isOpen) {
      launchImmersiveFullScreen(slotElement.value);
    } else {
      if (!exitByKeydown) {
        exitImmersiveFullScreen(document);
      }
    }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      ctx.emit('update:modelValue');

      exitByKeydown = true;
    } else {
      exitByKeydown = false;
    }
  };

  onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
  });

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
  });
}
