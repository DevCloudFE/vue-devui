import { ref, computed, watch, SetupContext } from 'vue';
import type { Ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { UseFilterRender, UseFilterMultiple, UseFilterSingle } from './filter-types';
import { FilterConfig } from '../column/column-types';

export function useFilterRender(ctx: SetupContext): UseFilterRender {
  const showMenu: Ref<boolean> = ref(false);
  const filterMenuRef: Ref<HTMLElement | null> = ref(null);
  const filterIconRef: Ref<HTMLElement | null> = ref(null);
  const singleVal: Ref<FilterConfig | null> = ref(null);
  const multipleVal: Ref<FilterConfig[] | null> = ref(null);
  const handleIconClick = () => {
    showMenu.value = !showMenu.value;
  };
  const handleConfirm = (val: FilterConfig[]) => {
    showMenu.value = false;
    multipleVal.value = val;
    ctx.emit('filter', val);
  };
  const handleSelect = (val: FilterConfig) => {
    showMenu.value = false;
    singleVal.value = val;
    ctx.emit('filter', val);
  };
  const iconClasses = computed(() => ({
    'filter-icon': true,
    'filter-icon-active': Boolean(singleVal.value || multipleVal.value?.length),
  }));
  onClickOutside(
    filterMenuRef,
    () => {
      showMenu.value = false;
    },
    {
      ignore: [filterIconRef],
    }
  );

  return { showMenu, filterMenuRef, filterIconRef, iconClasses, handleIconClick, handleConfirm, handleSelect };
}

export function useFilterMultiple(filterList: FilterConfig[], ctx: SetupContext): UseFilterMultiple {
  const _checkList: Ref<FilterConfig[]> = ref([]);
  const _checkAllRecord: Ref<boolean> = ref(false);
  const _checkAll: Ref<boolean> = computed({
    get: () => _checkAllRecord.value,
    set: (val: boolean) => {
      _checkAllRecord.value = val;
      for (let i = 0; i < _checkList.value.length; i++) {
        _checkList.value[i].checked = val;
      }
    },
  });
  const _halfChecked: Ref<boolean> = ref(false);

  filterList?.forEach((item) => {
    _checkList.value.push({ checked: false, ...item });
  });

  watch(
    _checkList,
    (list) => {
      if (!list.length) {
        return;
      }

      let allTrue = true;
      let allFalse = true;

      for (let i = 0; i < list.length; i++) {
        allTrue &&= Boolean(list[i].checked);
        allFalse &&= Boolean(!list[i].checked);
      }

      _checkAllRecord.value = allTrue;
      _halfChecked.value = !(allFalse || allTrue);
    },
    { immediate: true, deep: true }
  );

  const getCheckedItems = () => {
    return _checkList.value.filter((item) => item.checked);
  };

  const handleConfirm = () => {
    ctx.emit('confirm', getCheckedItems());
  };

  return { _checkList, _checkAll, _halfChecked, handleConfirm };
}

export function useFilterSingle(ctx: SetupContext): UseFilterSingle {
  const selectedItem: Ref<FilterConfig | null> = ref(null);
  const handleSelect = (val: FilterConfig) => {
    selectedItem.value = val;
    ctx.emit('select', val);
  };

  return { selectedItem, handleSelect };
}
