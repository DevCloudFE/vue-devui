import { SetupContext } from "vue";

export default function useCustomTemplate(ctx:SetupContext,modelValue:string): any {
    const itemTemplate = (item, index) => {
        let arr = { item, index }
        console.log(arr);
        if (ctx.slots.itemTemplate) {
            return ctx.slots.itemTemplate(arr)
        }
        return null
    }
    const noResultItemTemplate = () => {
        if (ctx.slots.noResultItemTemplate) {
            return ctx.slots.noResultItemTemplate(modelValue)
        }
        return null
    }
    const searchingTemplate = () => {
        if (ctx.slots.searchingTemplate) {
            return ctx.slots.searchingTemplate(modelValue)
        }
        return null
    }
    const customRenderSolts = () => {
        let slots = {}
        if (ctx.slots.itemTemplate) {
            slots["itemTemplate"] = itemTemplate
        }
        if (ctx.slots.noResultItemTemplate) {
            slots["noResultItemTemplate"] = noResultItemTemplate
        }
        if (ctx.slots.searchingTemplate) {
            slots["searchingTemplate"] = searchingTemplate
        }
        return slots
    }
    return {customRenderSolts}
}