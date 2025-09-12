import { PropType, VNodeChild, defineComponent } from 'vue';

export interface IDragPreviewContext {
  data: any; // dragPreviewData
  draggedEl: HTMLElement;
  dragData: any;
  batchDragData?: any[];
  dragSyncDOMElements?: HTMLElement[];
}

export interface IDragPreviewTemplate {
  template: (context: IDragPreviewContext) => VNodeChild;
}
export const DragPreviewTemplate = defineComponent({
  name: 'DDragPreviewTemplate',
  setup(props, { slots, expose }) {
    expose({
      template: slots.default,
    } as IDragPreviewTemplate);

    return () => null;
  },
});

export const DragPreviewComponent = defineComponent({
  name: 'DDragPreviewContainer',
  props: {
    template: Function as PropType<(context: IDragPreviewContext) => VNodeChild>,
    context: Object as PropType<IDragPreviewContext>,
  },
  setup(props) {
    return () => props.template?.(props.context!);
  },
});
export default DragPreviewComponent;
