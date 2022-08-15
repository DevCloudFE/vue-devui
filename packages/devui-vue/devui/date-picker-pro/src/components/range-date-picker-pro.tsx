import { defineComponent, Transition, ref, renderSlot, useSlots, getCurrentInstance, Teleport, withModifiers } from 'vue';
import type { SetupContext } from 'vue';
import { rangeDatePickerProProps, RangeDatePickerProProps } from '../range-date-picker-types';
import { FlexibleOverlay } from '../../../overlay';
import DatePickerProPanel from './date-picker-panel';
import { Input } from '../../../input';
import { IconCalendar } from './icon-calendar';
import { IconClose } from './icon-close';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import useRangePickerPro from '../composables/use-range-date-picker-pro';

import '../date-picker-pro.scss';
import { createI18nTranslate } from '../../../locale/create';

export default defineComponent({
  name: 'DRangeDatePickerPro',
  props: rangeDatePickerProProps,
  emits: ['update:modelValue', 'toggleChange', 'confirmEvent', 'focus', 'blur'],
  setup(props: RangeDatePickerProProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DDatePickerPro', app);

    const ns = useNamespace('range-date-picker-pro');
    const {
      originRef,
      startInputRef,
      endInputRef,
      overlayRef,
      placeholder,
      isPanelShow,
      format,
      dateValue,
      displayDateValue,
      isMouseEnter,
      showCloseIcon,
      onFocus,
      focusHandler,
      focusType,
      pickerDisabled,
      pickerSize,
      isValidateError,
      onSelectedDate,
      handlerClearTime,
      onChangeRangeFocusType,
    } = useRangePickerPro(props, ctx);
    const position = ref(['bottom-start', 'top-start']);

    return () => {
      const vSlots = {
        rightArea: ctx.slots?.rightArea && (() => renderSlot(useSlots(), 'rightArea')),
        footer: ctx.slots?.footer && (() => renderSlot(useSlots(), 'footer')),
      };

      return (
        <div class={[ns.b(), props.showTime ? ns.e('range-time-width') : ns.e('range-width'), isPanelShow.value && ns.m('open')]}>
          <div
            class={[ns.e('range-picker'), pickerDisabled.value && ns.m('disabled'), isValidateError.value && ns.m('error')]}
            ref={originRef}
            onMouseover={() => (isMouseEnter.value = true)}
            onMouseout={() => (isMouseEnter.value = false)}>
            <span
              class={[
                isPanelShow.value && focusType.value === 'start' ? ns.e('active-input') : ns.e('normal-input'),
                ns.e('input'),
                ns.e('start'),
              ]}>
              <Input
                ref={startInputRef}
                modelValue={displayDateValue.value[0]}
                placeholder={placeholder.value[0] || t('startPlaceholder')}
                onFocus={withModifiers(
                  (e: MouseEvent) => {
                    onFocus('start');
                    focusHandler(e);
                  },
                  ['stop']
                )}
                size={pickerSize.value}
                disabled={pickerDisabled.value}
                v-slots={{
                  prefix: () => (
                    <span class={ns.e('range-picker-icon')}>
                      <IconCalendar></IconCalendar>
                    </span>
                  ),
                }}
              />
            </span>

            <span class={ns.e('separator')}>{props.separator}</span>
            <span
              class={[
                isPanelShow.value && focusType.value === 'end' ? ns.e('active-input') : ns.e('normal-input'),
                ns.e('input'),
                ns.e('end'),
              ]}>
              <Input
                ref={endInputRef}
                modelValue={displayDateValue.value[1]}
                placeholder={placeholder.value[1] || t('endPlaceholder')}
                onFocus={withModifiers(
                  (e: MouseEvent) => {
                    onFocus('end');
                    focusHandler(e);
                  },
                  ['stop']
                )}
                size={pickerSize.value}
                disabled={pickerDisabled.value}
                v-slots={{
                  suffix: () => (
                    <span
                      class={[showCloseIcon.value ? ns.m('icon-visible') : ns.m('icon-hidden'), 'close-icon']}
                      onClick={handlerClearTime}>
                      <IconClose></IconClose>
                    </span>
                  ),
                }}
              />
            </span>
          </div>
          <Teleport to="body">
            <Transition name="fade">
              <FlexibleOverlay
                v-model={isPanelShow.value}
                ref={overlayRef}
                origin={originRef.value}
                align="start"
                position={position.value}
                style={{ zIndex: 'var(--devui-z-index-dropdown, 1052)' }}>
                <DatePickerProPanel
                  {...props}
                  dateValue={dateValue.value}
                  visible={isPanelShow.value}
                  format={format.value}
                  isRangeType={true}
                  focusType={focusType.value}
                  onSelectedDate={onSelectedDate}
                  onChangeRangeFocusType={onChangeRangeFocusType}
                  v-slots={vSlots}></DatePickerProPanel>
              </FlexibleOverlay>
            </Transition>
          </Teleport>
        </div>
      );
    };
  },
});
