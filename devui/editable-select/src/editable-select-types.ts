import type { ExtractPropTypes, Ref, PropType, InjectionKey } from 'vue'
export type ModelValue = number | string | Array<number | string>
// porps
export const editableSelectProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
  width: {
    type: Number,
    default: 450
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
  maxHeight: {
    type: Number,
    default: 300
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Array] as PropType<ModelValue>
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(val: ModelValue) => void>,
    default: undefined,
  },
} as const

export type EditableSelectProps = ExtractPropTypes<typeof editableSelectProps>
type HorizontalConnectionPos = 'left' | 'center' | 'right';
type VerticalConnectionPos = 'top' | 'center' | 'bottom';

interface ConnectionPosition {
  originX: HorizontalConnectionPos
  originY: VerticalConnectionPos
  overlayX: HorizontalConnectionPos
  overlayY: VerticalConnectionPos
}

export interface SelectStatesReturnType {
  visible: boolean
  origin: Ref<null>
  position: ConnectionPosition
}
export interface SelectReturnType {
  toggleMenu: () => void
  handleOptionSelect: (vm: unknown) => void
}

export const selectKey = 'DSelect' as unknown as InjectionKey<SelectContext>
export interface SelectContext {
  handleOptionSelect(vm: unknown): void
}
