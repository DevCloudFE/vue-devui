

export const transferOperationProps = {
  sourceDisabled: {
    type: Boolean,
    default: (): boolean => true
  },
  targetDisabled: {
    type: Boolean,
    default: (): boolean => true
  },
  disabled: {
    type: Boolean,
    default: (): boolean => false
  },
  onUpdateSourceData: {
    type: Function as unknown as () => (() => void)
  },
  onUpdateTargetData: {
    type: Function as unknown as () => (() => void)
  }
};
