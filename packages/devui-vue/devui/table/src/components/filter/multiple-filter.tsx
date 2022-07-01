import { defineComponent, getCurrentInstance } from 'vue';
import type { PropType, SetupContext } from 'vue';
import { FilterConfig } from '../column/column-types';
import { Button } from '../../../../button';
import { Checkbox } from '../../../../checkbox';
import { useFilterMultiple } from './use-filter';
import { createI18nTranslate } from '../../../../locale/create';

export default defineComponent({
  props: {
    filterList: {
      type: Array as PropType<FilterConfig[]>,
      default: () => [],
    },
  },
  emits: ['confirm'],
  setup(props, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DTable', app);

    const { _checkList, _checkAll, _halfChecked, handleConfirm } = useFilterMultiple(props.filterList, ctx);

    return () => (
      <>
        <div class="filter-all-check">
          <div class="filter-item">
            <Checkbox v-model={_checkAll.value} halfChecked={_halfChecked.value} label={t('selectAll')}></Checkbox>
          </div>
        </div>
        <div class="filter-multiple-menu">
          {_checkList.value.map((item) => (
            <div class="filter-item">
              <Checkbox v-model={item.checked} label={item.name}></Checkbox>
            </div>
          ))}
        </div>
        <div class="filter-operation">
          <Button variant="text" onClick={handleConfirm}>
            {t('ok')}
          </Button>
        </div>
      </>
    );
  },
});
