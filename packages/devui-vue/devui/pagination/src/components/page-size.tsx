import { defineComponent, inject, withModifiers, ref } from 'vue';
import { Icon } from '@devui/shared/components/icon';
import { Dropdown } from '../../../dropdown';
import { useNamespace } from '@devui/shared/utils';
import { paginationInjectionKey, IPagination } from '../pagination-types';

export default defineComponent({
  setup() {
    const ns = useNamespace('pagination');
    const paginationContext = inject(paginationInjectionKey) as IPagination;
    const iconRotate = ref(0);
    const { size, currentPageSize, pageSizeOptions, pageSizeDirection, pageSizeChange, t } = paginationContext;
    const onDropdownToggle = (e: boolean) => {
      iconRotate.value = e ? 180 : 0;
    };

    return () => (
      <>
        <Dropdown position={pageSizeDirection.value} class={ns.e('size-list')} onToggle={onDropdownToggle}>
          {{
            default: () => (
              <div tabindex="0" class={[ns.e('size'), size.value ? ns.em('size', size.value) : '']}>
                <Icon name="select-arrow" size="16px" rotate={iconRotate.value}>
                  {{ prefix: () => <span>{currentPageSize.value}</span> }}
                </Icon>
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
