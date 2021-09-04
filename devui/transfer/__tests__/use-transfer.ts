import { ExtractPropTypes, PropType } from 'vue'
import { IItem, ITitles, IModel } from '../types'

export const transferProps = {
    sourceOption: {
        type: Array as () => IItem[],
        require: true,
        default(): IItem[] {
            return []
        }
    },
    targetOption: {
        type: Array as () => IItem[],
        require: true,
        default(): IItem[] {
            return []
        }
    },
    titles: {
        type: Array as PropType<ITitles>,
        default: () => (): ITitles[] => ['Source', 'Target']
    },
    modelValue: {
        type: Array as PropType<string | number[]>,
        default: () => (): IModel[] => [],
    },
    height: {
        type: String,
        default: '320px'
    },
    isSearch: {
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


