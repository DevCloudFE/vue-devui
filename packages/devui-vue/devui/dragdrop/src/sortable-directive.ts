import { matches } from './utils';

export default {
  mounted(el: HTMLElement, binding: any): void {
    let sourceElement: HTMLElement;
    let sourceIndex: number;
    let targetIndex: number;
    let mouseoverElement: HTMLElement;

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

    el.addEventListener('mouseover', (event: MouseEvent) => {
      mouseoverElement = event.target as HTMLElement;
    });

    Array.from(el.children).forEach((element: any) => {
      element.setAttribute('draggable', 'true');
      element.addEventListener('dragstart', (event: DragEvent): void => {
        if (canDrag()) {
          sourceElement = element;
          sourceIndex = Array.from(el.children).indexOf(sourceElement);
          setTimeout(() => {
            sourceElement.classList.add('devui-drag-item');
          });
        } else {
          event.preventDefault();
          event.stopPropagation();
        }
      });
    });

    el.addEventListener('dragenter', function (event: DragEvent) {
      console.log('dragenter');
    });

    el.addEventListener('dragover', function (event: DragEvent) {
      const currentIndex = Array.from(el.children).indexOf(sourceElement);
      const toIndex = getCurrentTarget(event);

      if (currentIndex !== -1 && toIndex !== -1) {
        if (currentIndex > toIndex) {
          el.removeChild(sourceElement);
          el.insertBefore(sourceElement, el.children[toIndex]);
          targetIndex = toIndex;
        } else if (currentIndex < toIndex) {
          el.removeChild(sourceElement);
          if (el.children[toIndex]?.nextSibling) {
            el.insertBefore(sourceElement, el.children[toIndex].nextSibling);
            targetIndex = toIndex + 1;
          } else {
            el.appendChild(sourceElement);
            targetIndex = el.children.length - 1;
          }
        }
        binding?.value?.dragover(event);
      }

      event.preventDefault();
    });

    // 主要用来移除shadow
    el.addEventListener('dragleave', function (event: Event) {
      console.log('dragleave');
    });

    el.addEventListener('drop', function (event: DragEvent) {
      if (binding?.value?.list) {
        const list = binding?.value?.list;
        const item = list[sourceIndex];
        list.splice(sourceIndex, 1);
        list.splice(targetIndex, 0, item);
        if (binding?.value?.drop) {
          binding.value.drop({
            event: event,
            list: list,
            fromIndex: sourceIndex,
            targetIndex: targetIndex,
          });
        }
      }
    });
  },
};
