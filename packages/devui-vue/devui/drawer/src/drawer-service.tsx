import { createApp, onUnmounted, reactive } from 'vue';
import type { App } from 'vue';
import Drawer from './drawer';
import { DrawerOptions } from './drawer-types';

const defaultOptions: DrawerOptions = {
  modelValue: false,
  content: '',
  zIndex: 1000,
  showOverlay: true,
  escKeyCloseable: true,
  position: 'right',
  lockScroll: true,
  closeOnClickOverlay: true,
};

function initInstance(state: DrawerOptions): App {
  const container = document.createElement('div');
  const content = state.content;
  delete state.content;

  const app: App = createApp({
    setup() {
      const handleVisibleChange = () => {
        state.modelValue = false;
      };
      onUnmounted(() => {
        document.body.removeChild(container);
      });
      return () => (
        <Drawer {...state} onUpdate:modelValue={handleVisibleChange}>
          {content}
        </Drawer>
      );
    },
  });

  document.body.appendChild(container);
  app.mount(container);
  return app;
}

export default class DrawerService {
  open(options: DrawerOptions): { close: () => void } {
    const state: DrawerOptions = reactive({ ...defaultOptions, ...options });
    const app = initInstance(state);

    state.modelValue = true;

    return {
      close: () => {
        state.modelValue = false;
        app.unmount();
      },
    };
  }
}
