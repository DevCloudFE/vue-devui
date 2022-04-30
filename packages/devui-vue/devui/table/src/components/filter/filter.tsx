import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { FilterProps, filterProps } from './filter-types';
import { Dropdown } from '../../../../dropdown';
import MultipleFilter from './multiple-filter';
import SingleFilter from './single-filter';
import { useFilterRender } from './use-filter';
import './filter.scss';

export default defineComponent({
  props: filterProps,
  emits: ['filter'],
  setup(props: FilterProps, ctx: SetupContext) {
    const { showMenu, filterMenuRef, filterIconRef, iconClasses, handleIconClick, handleConfirm, handleSelect } = useFilterRender(ctx);

    return () => (
      <Dropdown visible={showMenu.value} trigger="manually" close-scope="none" destroy-on-hide={false} style="padding-bottom: 4px;">
        {{
          default: () => (
            <i ref={filterIconRef} class={iconClasses.value} onClick={handleIconClick}>
              <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g>
                    <polygon points="10.0085775 7 10.0085775 15 6 13 6 7 2 3 2 1 14 1 14 3"></polygon>
                  </g>
                </g>
              </svg>
            </i>
          ),
          menu: () => (
            <div ref={filterMenuRef} class="filter-wrapper">
              {props.multiple ? (
                <MultipleFilter filterList={props.filterList} onConfirm={handleConfirm} />
              ) : (
                <SingleFilter filterList={props.filterList} onSelect={handleSelect} />
              )}
            </div>
          ),
        }}
      </Dropdown>
    );
  },
});
