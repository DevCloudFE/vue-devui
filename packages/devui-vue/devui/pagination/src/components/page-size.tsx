import { defineComponent, inject, computed, ref } from 'vue';
import { SelectArrowIcon } from '../../../svg-icons';
import { Dropdown } from '../../../dropdown';
import { useNamespace } from '@devui/shared/utils';
import { paginationInjectionKey, IPagination } from '../pagination-types';

export default defineComponent({
  setup() {
    const ns = useNamespace('pagination');
    const paginationContext = inject(paginationInjectionKey) as IPagination;
    const isOpen = ref(false);
    const { size, currentPageSize, pageSizeOptions, pageSizeDirection, pageSizeChange, t } = paginationContext;
    const pageSizeClasses = computed(() => ({
      [ns.e('size')]: true,
      [ns.em('size', size.value)]: Boolean(size.value),
      [ns.em('size', 'open')]: isOpen.value,
    }));
    const onDropdownToggle = (e: boolean) => {
      isOpen.value = e;
    };

    return () => (
      <>
        <Dropdown position={pageSizeDirection.value} class={ns.e('size-list')} onToggle={onDropdownToggle}>
          {{
            default: () => (
              <div tabindex="0" class={pageSizeClasses.value}>
                <span>{currentPageSize.value}</span>
                <SelectArrowIcon />
              </div>
            ),
            menu: () => (
              <ul>
                {pageSizeOptions.value.map((item, index) => (
                  <li
                    class={{ active: item === currentPageSize.value }}
                    onClick={() => {
                      pageSizeChange(item);
                    }}
                    key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            ),
          }}
        </Dropdown>
        <span style="margin-right:8px">{t('perPage')},</span>
      </>
    );
  },
});
