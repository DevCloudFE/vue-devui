import { ref, reactive, computed, SetupContext } from 'vue'
import { EditableSelectProps, SelectStatesReturnType, SelectReturnType } from '../editable-select-types'
export type States = ReturnType<typeof useSelectStates>
export function useSelectStates(): SelectStatesReturnType {
    return reactive<SelectStatesReturnType>({
        visible: false,
        origin: ref(null),
        position: {
            originX: 'left',
            originY: 'bottom',
            overlayX: 'left',
            overlayY: 'top',
        },
    })
}

export function useSelect(props: EditableSelectProps, ctx: SetupContext, states: States,): SelectReturnType {
    const selectDisabled = computed(() => props.disabled)
    
    const toggleMenu = () => {
        if (!selectDisabled.value) {
            states.visible = !states.visible;
        }
    };
    const handleOptionSelect = (optionInstance) => {
        ctx.emit('update:modelValue', optionInstance.proxy.label)
        states.visible = false
    }
    return {
        toggleMenu,
        handleOptionSelect
    }
}