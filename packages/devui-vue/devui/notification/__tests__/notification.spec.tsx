import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import DNotification from '../src/notification';
import NotificationService from '../src/notification-service';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('notification', true);
describe('d-notification', () => {
  describe('component', () => {
    it('render correctly when using component', async () => {
      const wrapper = mount({
        setup() {
          const show = ref(true);
          return () => (
            <DNotification v-model={show.value} title="标题">
              通知提示内容
            </DNotification>
          );
        },
      });
      await nextTick();
      const notification = wrapper.find(ns.b());
      const notificationTitle = notification.find(ns.e('title'));
      const notificationContent = notification.find(ns.e('content'));
      expect(notification.exists()).toBeTruthy();
      expect(notificationTitle.text()).toBe('标题');
      expect(notificationContent.text()).toBe('通知提示内容');
      wrapper.unmount();
    });
  });

  describe('service', () => {
    let notification: HTMLElement | null;

    afterEach(() => {
      notification?.parentNode?.removeChild(notification);
    });

    it('render correctly when using service', async () => {
      NotificationService.open({
        content: '通知框消息内容',
      });
      await nextTick();
      notification = document.querySelector(ns.b());
      const notificationContent = document.querySelector(ns.e('content'));
      expect(notification).toBeTruthy();
      expect(notificationContent?.innerHTML).toBe('通知框消息内容');
    });

    it('title render correctly', async () => {
      NotificationService.open({
        title: '消息标题',
        content: '通知框消息内容',
      });
      await nextTick();
      notification = document.querySelector(ns.b());
      const notificationTitle = document.querySelector(ns.e('title'));
      expect(notificationTitle?.innerHTML).toBe('消息标题');
    });

    it('notification type', async () => {
      NotificationService.open({
        title: '消息标题',
        content: '通知框消息内容',
        type: 'success',
      });
      await nextTick();
      notification = document.querySelector(ns.b());
      const notificationImage = document.querySelector(ns.e('image'));
      expect(notificationImage?.className).toContain(ns.em('image', 'success').slice(1));
    });

    it('duration', async () => {
      NotificationService.open({
        title: '消息标题',
        content: '通知框消息内容',
        duration: 1000,
      });
      await nextTick();
      notification = document.querySelector(ns.b());
      expect(notification).toBeTruthy();
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      expect(document.querySelector(ns.b())).toBeFalsy();
      notification = null;
    });

    it('close callback', async () => {
      const closeCallback = jest.fn();
      NotificationService.open({
        title: '消息标题',
        content: '通知框消息内容',
        duration: 1000,
        onClose: closeCallback,
      });
      await nextTick();
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      expect(closeCallback).toBeCalled();
      notification = null;
    });

    it('manual click close work well', async () => {
      const closeCallback = jest.fn();
      const wrapper = mount({
        setup() {
          const show = ref(true);
          return () => (
            <DNotification v-model={show.value} title="标题" onClose={closeCallback}>
              通知框消息内容
            </DNotification>
          );
        },
      });
      // 正常情况下，能找得到notification实例
      const notificationElement = wrapper.find(ns.b());
      expect(notificationElement.exists()).toBeTruthy();

      // 点击非 close icon 区域
      notificationElement.trigger('click');
      await nextTick();
      // 此时不会关闭，notification实例仍然存在
      expect(closeCallback).not.toBeCalled();
      expect(wrapper.find(ns.b()).exists()).toBeTruthy();

      // 点击标题和内容区域，不触发关闭
      const notificationTitle = notificationElement.find(ns.e('title'));
      expect(notificationTitle.text()).toBe('标题');
      notificationTitle.trigger('click');
      await nextTick();
      // 此时不会关闭，notification实例仍然存在
      expect(closeCallback).not.toBeCalled();
      expect(wrapper.find(ns.b()).exists()).toBeTruthy();

      // 点击内容区域，不触发关闭
      const notificationContent = notificationElement.find(ns.e('content'));
      expect(notificationContent.text()).toBe('通知框消息内容');
      notificationContent.trigger('click');
      await nextTick();
      // 此时不会关闭，notification实例仍然存在
      expect(closeCallback).not.toBeCalled();
      expect(wrapper.find(ns.b()).exists()).toBeTruthy();

      // 点击icon close区域，会触发关闭
      const close = notificationElement.find(ns.e('icon-close'));
      close.trigger('click');
      await nextTick();
      // 手动点击关闭后，先触发onclose函数，然后关闭
      expect(closeCallback).toBeCalled();
      // 此时找不到实例
      expect(wrapper.find(ns.b()).exists()).toBeFalsy();
    });
  });
});
