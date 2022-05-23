import { defineComponent } from 'vue';
import { Icon } from '../../../icon';
import { Tag } from '../../../tag';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import useSelectCotent from '../composables/use-select-content';
import { selectContentProps, SelectContentProps, OptionObjectItem } from '../select-types';
export default defineComponent({
  name: 'SelectContent',
  props: selectContentProps,
  setup(props: SelectContentProps) {
    const ns = useNamespace('select');
    const clearCls = ns.e('clear');
    const arrowCls = ns.e('arrow');
    const multipleCls = ns.e('multipe');
    const multipleInputCls = ns.em('multipe', 'input');
    const {
      serchQuery,
      selectedData,
      isSelectDisable,
      selectionCls,
      inputCls,
      placeholder,
      isMultiple,
      handleClear,
      tagDelete
    } = useSelectCotent(props);

    return () => {
      return (
        <div class={selectionCls.value}>
          {isMultiple.value ? <div class={multipleCls}>
            {selectedData.value.map((item: OptionObjectItem) =>
              <Tag deletable onTagDelete={(e: MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                tagDelete(item);
              }} key={item.value}>{item.name}
              </Tag>
            )}
            <div class={multipleInputCls}>
              <input
                value={serchQuery.value}
                type="text"
                class={inputCls.value}
                placeholder={placeholder.value}
                readonly
                disabled={isSelectDisable.value}
              />
            </div>
          </div> :
            <input
              value={props.value}
              type="text"
              class={inputCls.value}
              placeholder={placeholder.value}
              readonly
              disabled={isSelectDisable.value}
            />}
          <span onClick={handleClear} class={clearCls}>
            <Icon name="close" />
          </span>
          <span class={arrowCls}>
            <Icon name="select-arrow" />
          </span>
        </div>
      );
    };
  },
});
