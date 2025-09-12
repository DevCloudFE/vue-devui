import { matches } from './utils';

export default {
  mounted(el: HTMLElement, binding: any): void {
    let sourceElement: HTMLElement;
    let sourceIndex: number;
    let targetIndex: number;
    let mouseoverElement: HTMLElement;
    let isDrop: boolean;

    const canDrag = (): boolean => {
      if (binding?.value?.handle) {
        const handleSelector = binding?.value?.handle;
        let element = mouseoverElement;
        while (element !== el) {
          if (matches(element, handleSelector)) {
            return true;
          }
          element = element.parentNode as HTMLElement;
        }
        return false;
      }
      return true;
    };

    const getCurrentTarget = (event: DragEvent): number => {
      let index = -1;
      let element: any = event.target;
      while (element !== el) {
        if (element.parentNode === el) {
          index = Array.from(el.children).indexOf(element);
        }
        element = element.parentNode;
      }
      return index;
    };

    const getDragClass = (): string => {
      return binding?.value?.dragClass || 'devui-drag-item';
    };

    const emitEvent = (funcName: string, event: any): void => {
      if (binding?.value[funcName]) {
        binding?.value[funcName](event);
      }
    };

    el.addEventListener('mouseover', (event: MouseEvent) => {
      mouseoverElement = event.target as HTMLElement;
    });

    Array.from(el.children).forEach((element: any) => {
      element.setAttribute('draggable', 'true');
      element.addEventListener('dragstart', (event: DragEvent): void => {
        if (canDrag()) {
          isDrop = false;
          sourceElement = element;
          sourceIndex = Array.from(el.children).indexOf(sourceElement);
          setTimeout(() => {
            sourceElement.classList.add(getDragClass());
          });
        } else {
          event.preventDefault();
          event.stopPropagation();
        }
        emitEvent('dragStart', event);
      });
    });

    el.addEventListener('dragenter', function (event: DragEvent) {
      emitEvent('dragEnter', event);
    });

    el.addEventListener('dragover', function (event: DragEvent) {
      const currentIndex = Array.from(el.children).indexOf(sourceElement);
      const toIndex = getCurrentTarget(event);

      if (currentIndex !== -1 && toIndex !== -1) { // 这里的算法可能是有问题的
        if (currentIndex > toIndex) {
          el.removeChild(sourceElement);
          el.insertBefore(sourceElement, el.children[toIndex]);
          targetIndex = toIndex;
        } else if (currentIndex < toIndex) {
          el.removeChild(sourceElement);
          if (el.children[toIndex]) {
            el.insertBefore(sourceElement, el.children[toIndex]);
            targetIndex = toIndex;
          } else {
            el.appendChild(sourceElement);
            targetIndex = el.children.length - 1;
          }
        }
        binding?.value?.dragover && binding?.value?.dragover(event);
      }

      event.preventDefault();
      emitEvent('dragOver', event);
    });

    el.addEventListener('dragleave', function (event: Event) {
      emitEvent('dragLeave', event);
    });

    el.addEventListener('drop', function (event: DragEvent) {
      isDrop = true;
      if (binding?.value?.list) {
        const list = binding?.value?.list;
        const item = list[sourceIndex];
        list.splice(sourceIndex, 1);
        list.splice(targetIndex, 0, item);
        if (binding?.value?.drop) {
          emitEvent('drop', {
            event: event,
            list: list,
            fromIndex: sourceIndex,
            targetIndex: targetIndex,
          });
        }
      }
    });

    el.addEventListener('dragend', function (event: DragEvent) {
      if (!isDrop) {
        if (sourceIndex !== -1 && targetIndex !== -1) {
          if (targetIndex > sourceIndex) {
            el.removeChild(sourceElement);
            el.insertBefore(sourceElement, el.children[sourceIndex]);
          } else if (sourceIndex > targetIndex) {
            el.removeChild(sourceElement);
            if (el.children[sourceIndex]) {
              el.insertBefore(sourceElement, el.children[sourceIndex]);
            } else {
              el.appendChild(sourceElement);
            }
          }
        }
      }
      sourceIndex = -1;
      targetIndex = -1;
      setTimeout(()=> {
        sourceElement.classList.remove(getDragClass());
      });
      emitEvent('dragEnd', event);
    });
  },
};
