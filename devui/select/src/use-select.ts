import { PropType, ExtractPropTypes } from 'vue'

export interface OptionObjectItem {
    name: string
    value: string | number
    [key: string]: any
}
export type OptionItem = number | string | OptionObjectItem
export type Options = Array<OptionItem>

export const selectProps = {
    value: {
        type: [String, Number] as PropType<string | number>,
        default: ''
    },
    'onUpdate:value': {
        type: Function as PropType<(val: string | number) => void>,
        default: undefined
    },
    options: {
        type: Array as PropType<Options>,
        default: () => []
    },
    onToggleChange: {
        type: Function as PropType<(bool: boolean) => void>,
        default: undefined
    }
} as const

export type SelectProps = ExtractPropTypes<typeof selectProps>
