/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, Transition } from "vue";
const elTransition = '0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out';

const TransitionObj: Record<string, (el: Element) => void > = {
  'before-enter'(el: Element){
    (el as HTMLElement).style.transition = elTransition;
    (el as HTMLElement).setAttribute('data-oldPadding', (el as HTMLElement).style.padding);
    (el as HTMLElement).setAttribute('data-oldMargin', (el as HTMLElement).style.margin);

    (el as HTMLElement).style.height = '0';
    (el as HTMLElement).style.padding = '0';
    (el as HTMLElement).style.margin = '0';
  },
  'enter'(el: Element){
    (el as HTMLElement).dataset.oldOverflow = (el as HTMLElement).style.overflow;
    if ((el as HTMLElement).scrollHeight !== 0) {
      (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + 'px';
    } else {
      (el as HTMLElement).style.height = '';
    }
    (el as HTMLElement).style.padding = (el as HTMLElement).getAttribute('data-oldPadding') as string;
    (el as HTMLElement).style.margin = (el as HTMLElement).getAttribute('data-oldMargin') as string;

    (el as HTMLElement).style.overflow = 'hidden';
  },
  'after-enter'(el: Element){
    (el as HTMLElement).style.transition = '';
    (el as HTMLElement).style.transition = '';
    (el as HTMLElement).style.height = '';
    (el as HTMLElement).style.overflow = (el as HTMLElement).getAttribute('data-overflow') as string;
  },
  'before-leave' (el: any) {
    if (!(el as HTMLElement).dataset) {
      ((el as HTMLElement) as any).dataset = {};
    }
    (el as HTMLElement).dataset.oldPaddingTop = (el as HTMLElement).style.paddingTop;
    (el as HTMLElement).dataset.oldPaddingBottom = (el as HTMLElement).style.paddingBottom;
    (el as HTMLElement).dataset.oldOverflow = (el as HTMLElement).style.overflow;

    (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + 'px';
    (el as HTMLElement).style.overflow = 'hidden';
  },

  'leave' (el: Element) {
    if ((el as HTMLElement).scrollHeight !== 0) {
      (el as HTMLElement).style.transition = elTransition;
      (el as HTMLElement).style.height = '0';
      (el as HTMLElement).style.paddingTop = '0';
      (el as HTMLElement).style.paddingBottom = '0';
    }
  },

  'after-leave' (el: Element) {
    (el as HTMLElement).style.transition = '';
    (el as HTMLElement).style.height = '';
    (el as HTMLElement).style.overflow = (el as HTMLElement).dataset.oldOverflow as string;
    (el as HTMLElement).style.paddingTop = (el as HTMLElement).dataset.oldPaddingTop as string;
    (el as HTMLElement).style.paddingBottom = (el as HTMLElement).dataset.oldPaddingBottom as string;
  }
};

export default defineComponent({
  name: 'DMenuTransition',
  setup(prop,ctx){
    return () => {
      return (
        <Transition
          onBeforeEnter={(e)=>TransitionObj['before-enter'](e)}
          onBeforeLeave={(e)=>TransitionObj['before-leave'](e)}
          onEnter={(e)=>TransitionObj['enter'](e)}
          onAfterEnter={(e)=>TransitionObj['after-enter'](e)}
          onLeave={(e)=>TransitionObj['leave'](e)}
          onAfterLeave={(e)=>TransitionObj['after-leave'](e)}
        >
          {ctx.slots.default?.()}
        </Transition>
      );
    };
  }
});
