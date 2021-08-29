import { ExtractPropTypes, PropType } from 'vue'

export const transferOperationProps = {
    sourceDisabled: {
        type: Boolean,
        default: (): boolean => true
    },
    targetDisabled: {
        type: Boolean,
        default: (): boolean => true
    },
    onUpdateSourceData: {
        type: Function as unknown as () => (() => void)
    },
    onUpdateTargetData: {
        type: Function as unknown as () => (() => void)
    }
}
