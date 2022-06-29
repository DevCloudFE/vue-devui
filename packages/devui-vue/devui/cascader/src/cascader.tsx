import { cloneDeep } from 'lodash';
import { defineComponent, Transition, SetupContext } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import DCascaderList from '../components/cascader-list';
import DMultipleBox from '../components/cascader-multiple/index';
import { cascaderProps, CascaderProps } from './cascader-types';
import { useCascader } from '../hooks/use-cascader';
import './cascader.scss';
import { FlexibleOverlay } from '../../overlay';
import DInput from '../../input/src/input';
export default defineComponent({
  name: 'DCascader',
  components: { DInput },
  props: cascaderProps,
  emits: ['update:modelValue', 'change'],
  setup(props: CascaderProps, ctx: SetupContext) {
    const ns = useNamespace('cascader');
    const {
      origin,
      overlay,
      menuShow,
      cascaderItemNeedProps,
      devuiCascader,
      rootClasses,
      menuOpenClass,
      inputValue,
      openPopup,
      rootStyle,
      showClearable,
      position,
      cascaderOptions,
      tagList,
      showClear,
      hideClear,
      clearData,
      handleInput,
      multiple,
      suggestionsList,
      isSearching,
      chooseSuggestion,
    } = useCascader(props, ctx);

    return () => (
      <div ref={devuiCascader} style={rootStyle.inputWidth}>
        <div class={rootClasses.value} ref={origin} onClick={openPopup} {...ctx.attrs} onMouseenter={showClear} onMouseleave={hideClear}>
          {multiple.value ? (
            <DMultipleBox placeholder={props.placeholder} activeOptions={tagList.value}></DMultipleBox>
          ) : (
            <DInput
              disabled={props.disabled}
              placeholder={props.placeholder}
              modelValue={inputValue.value}
              readonly={!props.filterable}
              size={props.size}
              onInput={handleInput}></DInput>
          )}
          {!showClearable.value && (
            <div class={`${ns.e('icon')} ${ns.m('drop-icon-animation')}`}>
              <d-icon name="select-arrow" size="12px"></d-icon>
            </div>
          )}
          {showClearable.value && props.clearable && (
            <div class={`${ns.e('icon')} ${ns.e('close')}`} onClick={clearData}>
              <d-icon name="close" size="12px"></d-icon>
            </div>
          )}
        </div>
        <Transition name="fade">
          <FlexibleOverlay
            origin={origin.value}
            backgroundStyle={'background: transparent'}
            ref={overlay}
            v-model={menuShow.value}
            position={position.value}
            align="start">
            <div class={ns.e('drop-menu-animation')}>
              {!isSearching.value && (
                <div class={`${menuOpenClass.value} ${ns.e('dropdown-menu')}`}>
                  {cascaderOptions.map((item, index) => {
                    return (
                      <DCascaderList
                        cascaderItems={item}
                        ul-index={index}
                        cascaderItemNeedProps={cascaderItemNeedProps}
                        cascaderOptions={cascaderOptions}
                        {...props}></DCascaderList>
                    );
                  })}
                </div>
              )}
              {props.filterable && isSearching.value && (
                <div class={ns.e('panel')}>
                  {suggestionsList.value.map((item) => {
                    return (
                      <div class={ns.e('suggest-list')} onClick={() => chooseSuggestion(cloneDeep(item))}>
                        {item.labelsString}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </FlexibleOverlay>
        </Transition>
      </div>
    );
  },
});
