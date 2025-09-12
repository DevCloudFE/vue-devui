import { shallowReactive,createApp,onUnmounted } from 'vue';
import type { App } from 'vue';
import type { EmitEventFn, MessageOption } from './message-types';
import Message from './message';

export type MessageContext = {
  id: string;
  handler?: EmitEventFn;
  props: MessageOption;
};

export const instances: MessageContext[] = shallowReactive([]);

export const getLastOffset = (id: string): number => {
  const idx = instances.findIndex((instance) => instance.id === id);
  return idx * 65 + 80;
};

export const deleteInstance = (id: string | undefined): number => {
  const idx = instances.findIndex((instance) => instance.id === id);
  if (idx !== -1) {
    instances.splice(idx, 1);
  }
  return idx;
};

export const initInstance = (id: string, props: MessageOption, message?: string): MessageContext => {
  const container = document.createElement('div');
  container.id = id;
  const app: App = createApp({
    setup() {
      onUnmounted(() => {
        document.body.removeChild(container);
      });

      return () => (
        <Message {...props} id={id} onDestroy={app.unmount}>
          {message}
        </Message>
      );
    },
  });

  document.body.appendChild(container);
  app.mount(container);

  return {
    id,
    props,
  };
};
