import { computed, ExtractPropTypes, PropType, ComputedRef, SetupContext } from 'vue'
import { ISourceOption } from './use-transfer'


export const transferBaseProps = {
    sourceOption: {
        type: Array as () => ISourceOption[],
        default(): Array<ISourceOption> {
            return []
        }
    },
    targetOption: {
        type: Array as () => ISourceOption[],
        default(): Array<ISourceOption> {
            return []
        }
    },
    type: {
        type: String,
        default: 'source'
    },
    title: {
        type: String,
        default: 'Source'
    },
    filterable: {
        type: Boolean,
        default: false
    },
    allChecked: {
        type: Boolean,
        default: (): boolean => false
    },
    query: {
        type: String,
        default: (): string => ''
    },
    alltargetState: {
        type: Boolean,
        default: (): boolean => false
    },
    checkedNum: {
        type: Number,
        default: (): number => 0
    },
    scopedSlots: {
        type: Object
    },
    onChangeSource: {
        // type: Function as unknown as () => ((item: ISourceOption, idx: number) => void)
        type: Function as PropType<(item: ISourceOption, idx: number) => void>
    },
    onChangeAllSource: {
        type: Function as unknown as () => (() => void)
    },
    onChangeQuery: {
        type: Function as PropType<(val: string) => void>
    }
}

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


export type TransferOperationProps = ExtractPropTypes<typeof transferBaseProps>

export const TransferBaseClass = (props: TransferOperationProps): ComputedRef => {
    return computed(() => {
        return `devui-transfer-panel devui-transfer-${props.type}`
    })
}

export const Query = ((props: TransferOperationProps): ComputedRef => {
    return computed(() => props.query)
})

