import { watch, toRefs, onMounted, onUnmounted, SetupContext, Ref } from 'vue';
import { FullscreenProps } from '../fullscreen-types';
import {
  launchNormalFullscreen,
  exitNormalFullscreen,
  launchImmersiveFullScreen,
  exitImmersiveFullScreen,
  addFullScreenStyle,
  removeFullScreenStyle,
} from '../utils';

export default function useFullscreen(props: FullscreenProps, slotElement: Ref<HTMLElement>, ctx: SetupContext): void {
  const { modelValue, mode } = toRefs(props);
  let exitByKeydown = false;

  const handleNormalFullscreen = (isOpen: boolean) => {
    if (isOpen) {
      launchNormalFullscreen(slotElement.value, props);
      addFullScreenStyle();
    } else {
      exitNormalFullscreen(slotElement.value);
      removeFullScreenStyle();
    }
  };

  const handleImmersiveFullscreen = (isOpen: boolean) => {
    if (isOpen) {
      launchImmersiveFullScreen(slotElement.value);
    } else {
      if (!exitByKeydown) {
        exitImmersiveFullScreen(document);
      }
    }
  };

  watch(modelValue, (newVal) => {
    if (mode.value === 'normal') {
      handleNormalFullscreen(newVal);
    }

    if (mode.value === 'immersive') {
      handleImmersiveFullscreen(newVal);
    }
  });

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
