interface BindingType {
  value: {
    droppable?: boolean;
    isSingle?: boolean;
    onFileDrop?: (files: File[]) => void;
    onFileOver?: (event: unknown) => void;
  };
}

const getTransfer = (event: DragEvent): DataTransfer => {
  return event.dataTransfer ? event.dataTransfer : event.originalEvent?.dataTransfer;
};

const haveFiles = (types?: readonly string[]) => {
  if (!types) {
    return false;
  }
  if (types.indexOf) {
    return types.indexOf('Files') !== -1;
  } else if (types.contains) {
    return types.contains('Files');
  } else {
    return false;
  }
};

const preventAndStop = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
};

const onDragOver = (el: HTMLElement, binding: BindingType) => {
  const { onFileOver } = binding.value;
  el.addEventListener('dragover', (event) => {
    const transfer = getTransfer(event);
    if (!haveFiles(transfer.types)) {
      return;
    }
    preventAndStop(event);
    onFileOver && onFileOver(true);
  });
};

const onDragLeave = (el: HTMLElement, binding: BindingType) => {
  const { onFileOver } = binding.value;
  el.addEventListener('dragleave', (event) => {
    if (event.currentTarget === el) {
      return;
    }
    preventAndStop(event);
    onFileOver && onFileOver(true);
  });
};

const onDrop = (el: HTMLElement, binding: BindingType) => {
  const { onFileDrop, isSingle } = binding.value;
  el.addEventListener('drop', (event) => {
    const transfer = getTransfer(event);
    if (!transfer) {
      return;
    }
    preventAndStop(event);
    if (isSingle) {
      onFileDrop && onFileDrop([transfer.files[0]]);
    } else {
      onFileDrop && onFileDrop(Array.from(transfer.files));
    }
  });
};

const fileDropDirective = {
  mounted: (el: HTMLElement, binding: BindingType): void => {
    const { droppable } = binding.value;
    if (!droppable) {
      return;
    }
    onDragOver(el, binding);
    onDragLeave(el, binding);
    onDrop(el, binding);
  },
};

export default fileDropDirective;
