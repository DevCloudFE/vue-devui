import { nextTick } from 'vue';
import message from '../src/message-service';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('message', true);
describe('d-message', () => {

  describe('service', () => {
    it('render correctly when using service', async () => {
      message.open({
        message: 'message content',
      });
      await nextTick();
      const messageDom = document.querySelector(ns.b());
      const messageDomContent = document.querySelector(ns.e('content'));
      expect(messageDom).toBeTruthy();
      expect(messageDomContent?.innerHTML).toBe('message content');
    });

    it('message type', async () => {
      message.open({
        message: 'success type',
        type: 'success',
      });
      await nextTick();
      const messageDomImage = document.querySelector(ns.e('image'));
      expect(messageDomImage?.className).toContain(ns.em('image', 'success').slice(1));
    });

    it('message showClose', async () => {
      message.open({
        message: 'message showClose param',
        type: 'success',
        showClose: true,
      });
      await nextTick();
      const messageDomClose = document.querySelector(ns.e('close'));
      expect(messageDomClose).toBeTruthy();
    });

    it('close callback', async () => {
      const closeCallback = jest.fn();
      message.open({
        message: 'message close callback',
        duration: 1000,
        onClose: closeCallback,
      });
      await nextTick();
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      expect(closeCallback).toBeCalled();
    });

  });
});
