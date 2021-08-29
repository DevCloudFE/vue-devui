import { ExtractPropTypes, PropType } from 'vue'
export interface ISourceOption {
    key: string
    value: string | number
    disabled: boolean
}

export interface IItem extends ISourceOption {
    checked: boolean
}

interface ITitles {
    [index: number]: string
}

interface IModel {
    [index: number]: string | number
}

export const transferProps = {
    sourceOption: {
        type: Array as () => ISourceOption[],
        require: true,
        default(): ISourceOption[] {
            return []
        }
    },
    targetOption: {
        type: Array as () => ISourceOption[],
        require: true,
        default(): ISourceOption[] {
            return []
        }
    },
    titles: {
        type: Array as PropType<ITitles>,
        default(): ITitles[] {
            return ['Source', 'Target']
        }
    },
    modelValue: {
        type: Array as PropType<string | number[]>,
        default: () => (): IModel[] => [],
    },
    height: {
        type: String,
        default: '320px'
    },
    filterable: {
        type: Boolean,
        default: false
    },
    isSourceDroppable: {
        type: Boolean,
        default: false
    },
    isTargetDroppable: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    showOptionTitle: {
        type: Boolean,
        default: false
    },
    slots: {
        type: Object
    }
}

export type TransferProps = ExtractPropTypes<typeof transferProps>;


