import { defineComponent, inject, renderSlot, toRefs, useSlots } from 'vue';
import { dropdownProps, DropdownProps } from './dropdown-types';
import { EditableSelectContext, Option as O, SELECT_KEY } from '../../editable-select-types';
import Option from '../option/option';
import Loading from '../../../../loading/src/loading-directive';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { debounce } from 'lodash';

export default defineComponent({
  name: 'DEditableSelectDropdown',
  directives: { Loading },
  props: dropdownProps,
  setup(props: DropdownProps, { slots }) {
    const ns = useNamespace('editable-select');
    const { width, maxHeight } = toRefs(props);
    const select = inject(SELECT_KEY) as EditableSelectContext;
    const { dropdownRef, hoveringIndex, handleOptionSelect, loadMore, emptyText } = select;

    // methods
    const isHovering = (index: number) => {
      return hoveringIndex.value === index;
    };

    const isDisabled = (option: O) => {
      return select.disabledKey ? !!option[select.disabledKey] : false;
    };
    const debounceLoadMore = debounce(loadMore, 300);

    const onScroll = () => {
      debounceLoadMore();
    };

    // 渲染options
    const renderOption = () => {
      if (props.options.length === 0) {
        return <li class={ns.em('item', 'no-data-tip')}>{slots.noResultItem ? slots.noResultItem() : emptyText.value}</li>;
      }

      return props.options.map((option, index) => {
        return (
          <Option
            label={option.label}
            value={option.value}
            hovering={isHovering(index)}
            disabled={isDisabled(option)}
            v-slots={slots.item ? { default: () => renderSlot(useSlots(), 'item', { option, index }) } : {}}
            onSelect={() => {
              handleOptionSelect(option, true);
            }}></Option>
        );
      });
    };

    return () => {
      return (
        <div
          class={ns.e('dropdown')}
          style={{
            width: `${width?.value}px`,
          }}
          v-loading={select.loading.value}>
          <div
            ref={dropdownRef}
            class={ns.e('inner')}
            style={{
              maxHeight: `${maxHeight?.value}px`,
            }}
            onScroll={onScroll}>
            {renderOption()}
          </div>
        </div>
      );
    };
  },
});
