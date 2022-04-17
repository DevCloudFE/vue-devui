import { reactive, createApp, onUnmounted } from 'vue';
import type { App } from 'vue';
import { NotificationOption, VoidFn } from './notification-types';
import Notification from './notification';

const defaultOptions: NotificationOption = {
  modelValue: false,
  duration: 3000,
  type: 'normal',
};

function initInstance(props: NotificationOption, content: string): App {
  const container = document.createElement('div');
  const app: App = createApp({
    setup() {
      onUnmounted(() => {
        document.body.removeChild(container);
      });

      return () => (
        <Notification {...props} onDestroy={app.unmount}>
          {content}
        </Notification>
      );
    },
  });
  document.body.appendChild(container);
  app.mount(container);
  return app;
}

function close(props: NotificationOption, originOnClose: VoidFn | null): void {
  props.modelValue = false;
  originOnClose?.();
}

export default class NotificationService {
  static open(options: NotificationOption): void {
    const originOnClose: VoidFn | null = options.onClose || null;
    const content = options.content;
    let timer;
    delete options.content;

    const props: NotificationOption = reactive({
      ...defaultOptions,
      ...options,
      onClose: () => {
        close(props, originOnClose);
      },
    });

    initInstance(props, content);
    props.modelValue = true;

    clearTimeout(timer);
    if (options.duration) {
      timer = setTimeout(props.onClose, options.duration);
    }
  }
}
