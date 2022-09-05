import { defineComponent, Transition, SetupContext, provide, Teleport } from 'vue';
import { cloneDeep } from 'lodash';
import { useNamespace } from '../../shared/hooks/use-namespace';
import DCascaderList from '../components/cascader-list';
import DMultipleBox from '../components/cascader-multiple/index';
import { cascaderProps, CascaderProps } from './cascader-types';
import { useCascader } from '../hooks/use-cascader';
import { FlexibleOverlay, Placement } from '../../overlay';
import { PopperTrigger } from '../../shared/components/popper-trigger';
import { POPPER_TRIGGER_TOKEN } from '../../shared/components/popper-trigger/src/popper-trigger-types';
import DInput from '../../input/src/input';
import './cascader.scss';

export default defineComponent({
  name: 'DCascader',
  components: { DInput },
  props: cascaderProps,
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  setup(props: CascaderProps, ctx: SetupContext) {
    const ns = useNamespace('cascader');
    const {
      origin,
      overlayRef,
      menuShow,
      cascaderItemNeedProps,
      rootClasses,
      menuOpenClass,
      inputValue,
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
      onFocus,
      onBlur,
    } = useCascader(props, ctx);
    provide(POPPER_TRIGGER_TOKEN, origin);

    return () => (
      <div style={rootStyle.inputWidth}>
        <PopperTrigger>
          {ctx.slots.host ? (
            ctx.slots.host()
          ) : (
            <div class={rootClasses.value} {...ctx.attrs} onMouseenter={showClear} onMouseleave={hideClear}>
              {multiple.value ? (
                <DMultipleBox placeholder={props.placeholder} activeOptions={tagList.value}></DMultipleBox>
              ) : (
                <DInput
                  disabled={props.disabled}
                  placeholder={props.placeholder}
                  modelValue={inputValue.value}
                  size={props.size}
                  onInput={handleInput}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
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
          )}
        </PopperTrigger>
        <Teleport to="body">
          <Transition name="fade">
            <FlexibleOverlay
              origin={origin.value}
              ref={overlayRef}
              v-model={menuShow.value}
              position={position.value as Placement[]}
              align="start"
              style={{ zIndex: 'var(--devui-z-index-dropdown, 1052)' }}>
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
                    {suggestionsList.value.length === 0
                      ? <label style="font-weight: bold;">没有数据</label>
                      : suggestionsList.value.map((item) => {
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
        </Teleport>
      </div>
    );
  },
});
