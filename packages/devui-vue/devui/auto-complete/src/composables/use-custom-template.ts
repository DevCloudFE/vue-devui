import { Ref, SetupContext } from 'vue';
type CustomRenderSoltsType = {
  itemTemplate?: (item: any, index: number) => any;
  noResultItemTemplate?: () => any;
  searchingTemplate?: () => any;
};
export default function useCustomTemplate(ctx: SetupContext,modelValue: Ref<string>): any {
  const itemTemplate = (item: any, index: number) => {
    const arr = { item, index };
    if (ctx.slots.itemTemplate) {
      return ctx.slots.itemTemplate(arr);
    }
    return null;
  };
  const noResultItemTemplate = () => {
    if (ctx.slots.noResultItemTemplate) {
      return ctx.slots.noResultItemTemplate(modelValue.value);
    }
    return null;
  };
  const searchingTemplate = () => {
    if (ctx.slots.searchingTemplate) {
      return ctx.slots.searchingTemplate(modelValue.value);
    }
    return null;
  };
  const customRenderSolts = () => {
    const slots: CustomRenderSoltsType = {};
    if (ctx.slots.itemTemplate) {
      slots['itemTemplate'] = itemTemplate;
    }
    if (ctx.slots.noResultItemTemplate) {
      slots['noResultItemTemplate'] = noResultItemTemplate;
    }
    if (ctx.slots.searchingTemplate) {
      slots['searchingTemplate'] = searchingTemplate;
    }
    return slots;
  };
  return {customRenderSolts};
}
