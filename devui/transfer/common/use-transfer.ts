import { ExtractPropTypes, PropType, SetupContext } from 'vue'
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

export const headerSlot = (ctx: SetupContext, name: string): unknown => {
    return !ctx.slots[`${name}-header`] ? null : () => ctx.slots[`${name}-header`] && ctx.slots[`${name}-header`]()
}

export const bodySlot = (ctx: SetupContext, name: string): unknown => {
    return !ctx.slots[`${name}-body`] ? null : () => ctx.slots[`${name}-body`] && ctx.slots[`${name}-body`]()
}

export const opeartionSlot = (ctx: SetupContext): unknown => {
    return ctx.slots && ctx.slots.operation && ctx.slots.operation() || null
}



