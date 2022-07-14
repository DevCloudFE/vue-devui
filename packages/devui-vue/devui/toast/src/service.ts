import { createApp } from 'vue';
import type { App } from 'vue';
import type { ToastProps } from './toast-types';
import ToastComponent from './toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hideToast = (app: App, vm: any, duration = 5000, sticky: boolean) => {
  if (sticky) {
    return false;
  }
  vm.timer1 = setTimeout(() => {
    vm.setVisible(false);
    clearTimeout(vm.timer1);
    vm.timer1 = null;
  }, duration);
  vm.timer2 = setTimeout(() => {
    app.unmount();
    clearTimeout(vm.timer2);
    vm.timer2 = null;
  }, duration + 300);
};

const showToast = (app: App, duration = 5000, sticky: boolean) => {
  const fragment = document.createDocumentFragment();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vm: any = app.mount(fragment);
  vm.setVisible(true);
  document.body.appendChild(fragment);
  hideToast(app, vm, duration, sticky);
};

const Toast = (props: ToastProps): void => {
  const messageApp = createApp(ToastComponent, props);
  showToast(messageApp, (props.life = 5000), props.sticky);
};

export default Toast;
