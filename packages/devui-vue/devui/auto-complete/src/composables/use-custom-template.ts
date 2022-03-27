import { Ref, SetupContext } from 'vue';
type CustomRenderSoltsType = {
  itemTemplate?: (item: any, index: number) => any;
  noResultItemTemplate?: () => any;
  searchingTemplate?: () => any;
};
export default function useCustomTemplate(ctx: SetupContext,modelValue: Ref<string>): any {
  const itemTemplate = (item: any, index: number) => {
    const arr = { item, index };
    if (ctx.slots.item) {
      return ctx.slots.item(arr);
    }
    return null;
  };
  const noResultItemTemplate = () => {
    if (ctx.slots.nothing) {
      return ctx.slots.nothing(modelValue.value);
    }
    return null;
  };
  const searchingTemplate = () => {
    if (ctx.slots.searching) {
      return ctx.slots.searching(modelValue.value);
    }
    return null;
  };
  const customRenderSolts = () => {
    const slots: CustomRenderSoltsType = {};
    if (ctx.slots.item) {
      slots['itemTemplate'] = itemTemplate;
    }
    if (ctx.slots.nothing) {
      slots['noResultItemTemplate'] = noResultItemTemplate;
    }
    if (ctx.slots.searching) {
      slots['searchingTemplate'] = searchingTemplate;
    }
    return slots;
  };
  return {customRenderSolts};
}
