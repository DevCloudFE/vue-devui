import { defineComponent, onMounted, reactive, ref, watch, PropType } from 'vue';


export default defineComponent({
  name: 'DSticky',
  props: {
    zIndex: {
      type: Number,
    },
    container: {
      type: Object as PropType<Element>
    },
    view: {
      type: Object,
      default: () => { return { top: 0, bottom: 0 }; },
    },
    scrollTarget: {
      type: Object as PropType<Element>
    },
  },
  emits: ['statusChange'],
  setup(props, ctx) {
    const { slots } = ctx;
    let container: Element;
    let scrollTarget: Element | Window;

    let scrollTimer: any;
    let scrollPreStart: number | null;

    const THROTTLE_DELAY = 16;
    const THROTTLE_TRIGGER = 100;

    let parentNode: Element;
    let containerLeft = 0;

    const state = reactive({
      status: 'normal'
    });

    watch(
      () => props.zIndex,
      () => {
        init();
      }
    );
    watch(
      () => props.container,
      () => {
        init();
      }
    );
    watch(
      () => props.scrollTarget,
      () => {
        init();
      }
    );
    watch(
      () => state.status,
      () => {
        ctx.emit('statusChange', state.status);
      },
      { immediate: true }
    );

    const init = () => {
      parentNode = stickyRef.value.parentElement;
      if (!props.container) {
        container = parentNode;
      } else {
        container = props.container;
      }

      stickyRef.value.style.zIndex = props.zIndex;

      scrollTarget = props.scrollTarget || window;
      scrollTarget.addEventListener('scroll', throttle);

      initScrollStatus(scrollTarget);
    };

    // 初始化，判断位置，如果有滚用动则用handler处理
    const initScrollStatus = (target: any) => {
      const scrollTargets = target === window ?
        [document.documentElement, document.body] : [target];
      let flag = false;
      scrollTargets.forEach((scrollTarget) => {
        if (scrollTarget.scrollTop && scrollTarget.scrollTop > 0) {
          flag = true;
        }
      });
      if (flag) {
        setTimeout(scrollHandler);
      }
    };


    const statusProcess = (status: any) => {
      const wrapper = stickyRef.value || document.createElement('div');
      switch (status) {
      case 'normal':
        wrapper.style.top = 'auto';
        wrapper.style.left = 'auto';
        wrapper.style.position = 'static';
        break;
      case 'follow':
        const scrollTargetElement: any = scrollTarget;
        const viewOffset = scrollTarget && scrollTarget !== window ?
          scrollTargetElement.getBoundingClientRect().top : 0;
        wrapper.style.top = +viewOffset + ((props.view && props.view.top) || 0) + 'px';
        wrapper.style.left = wrapper.getBoundingClientRect().left + 'px';
        wrapper.style.position = 'fixed';
        break;
      case 'stay':
        wrapper.style.top = calculateRelativePosition(wrapper, parentNode, 'top') + 'px';
        wrapper.style.left = 'auto';
        wrapper.style.position = 'relative';
        break;
      case 'remain':
        if (wrapper.style.position !== 'fixed' && wrapper.style.position !== 'absolute') {
          wrapper.style.top = calculateRelativePosition(wrapper, parentNode, 'top') + 'px';
          wrapper.style.left = 'auto';
          wrapper.style.position = 'absolute';
        }
        wrapper.style.top =
            calculateRemainPosition(wrapper, parentNode, container) + 'px';
        wrapper.style.left = calculateRelativePosition(wrapper, parentNode, 'left') + 'px';
        wrapper.style.position = 'relative';
        break;
      default:
        break;
      }
    };

    const throttle = () => {
      const fn = scrollAndResizeHock;
      const time = Date.now();
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      if (!scrollPreStart) {
        scrollPreStart = time;
      }
      if (time - scrollPreStart > THROTTLE_TRIGGER) {
        fn();
        scrollPreStart = null;
        scrollTimer = null;
      } else {
        scrollTimer = setTimeout(() => {
          fn();
          scrollPreStart = null;
          scrollTimer = null;
        }, THROTTLE_DELAY);
      }
    };

    const scrollAndResizeHock = () => {
      if (container.getBoundingClientRect().left - (containerLeft || 0) !== 0) {
        state.status = 'stay';
        containerLeft = container.getBoundingClientRect().left;
      } else {
        scrollHandler();
      }
    };

    const scrollHandler = () => {
      const scrollTargetElement: any = scrollTarget;
      const wrapper = stickyRef.value || document.createElement('div');
      const viewOffsetTop = scrollTarget && scrollTarget !== window ?
        scrollTargetElement.getBoundingClientRect().top : 0;
      const computedStyle = window.getComputedStyle(container);
      if (parentNode.getBoundingClientRect().top - viewOffsetTop > ((props.view && props.view.top) || 0)) {
        state.status = 'normal';
        statusProcess(state.status);
      } else if (
        container.getBoundingClientRect().top +
        parseInt(computedStyle.paddingTop, 10) +
        parseInt(computedStyle.borderTopWidth, 10) -
        viewOffsetTop >=
        ((props.view && props.view.top) || 0)
      ) {
        state.status = 'normal';
        statusProcess(state.status);
      } else if (
        container.getBoundingClientRect().bottom -
        parseInt(computedStyle.paddingBottom, 10) -
        parseInt(computedStyle.borderBottomWidth, 10) <
        viewOffsetTop +
        ((props.view && props.view.top) || 0) +
        wrapper.getBoundingClientRect().height +
        ((props.view && props.view.bottom) || 0)
      ) {
        state.status = 'remain';
        statusProcess(state.status);
      } else if (
        container.getBoundingClientRect().top + parseInt(computedStyle.paddingTop, 10) - viewOffsetTop <
        ((props.view && props.view.top) || 0)
      ) {
        state.status = 'follow';
        statusProcess(state.status);
      }
    };


    const calculateRelativePosition = (element: any, relativeElement: any, direction: 'left' | 'top') => {
      const key = {
        left: ['left', 'Left'],
        top: ['top', 'Top'],
      };
      if (window && window.getComputedStyle) {
        const computedStyle = window.getComputedStyle(relativeElement);
        return (
          element.getBoundingClientRect()[key[direction][0]] -
          relativeElement.getBoundingClientRect()[key[direction][0]] -
          parseInt(computedStyle[direction === 'left' ? 'paddingLeft' : 'paddingTop'], 10) -
          parseInt(computedStyle[direction === 'left' ? 'borderLeftWidth' : 'borderTopWidth'], 10)
        );
      }
    };

    const calculateRemainPosition = (element: any, relativeElement: any, container: any) => {
      if (window && window.getComputedStyle) {
        const computedStyle = window.getComputedStyle(container);
        const result =
          container.getBoundingClientRect().height -
          element.getBoundingClientRect().height +
          container.getBoundingClientRect().top -
          relativeElement.getBoundingClientRect().top -
          parseInt(computedStyle['paddingTop'], 10) -
          parseInt(computedStyle['borderTopWidth'], 10) -
          parseInt(computedStyle['paddingBottom'], 10) -
          parseInt(computedStyle['borderBottomWidth'], 10);
        return result < 0 ? 0 : result;
      }
    };

    onMounted(() => {
      init();
    });

    const stickyRef = ref();


    return () => {
      return (
        <div ref={stickyRef}>
          {slots.default ? slots.default() : ''}
        </div>
      );
    };
  }
});
