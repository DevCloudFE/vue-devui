import { Ref, SetupContext } from 'vue';
import { SourceItemObj } from '../auto-complete-types';
type CustomRenderSoltsType = {
  itemTemplate?: (item: string | SourceItemObj, index: number) => unknown;
  noResultItemTemplate?: () => unknown;
  searchingTemplate?: () => unknown;
};
export default function useCustomTemplate(ctx: SetupContext,modelValue: Ref<string>): {
  customRenderSolts: () => CustomRenderSoltsType;
} {
  const itemTemplate = (item: string | SourceItemObj, index: number) =>{
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
