import { defineComponent, Transition, ref, renderSlot, useSlots, getCurrentInstance, Teleport, withModifiers, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { datePickerProProps, DatePickerProProps } from './date-picker-pro-types';
import usePickerPro from './use-picker-pro';
import { Input } from '../../input';
import { FlexibleOverlay } from '../../overlay';
import DatePickerProPanel from './components/date-picker-panel';
import { IconCalendar } from './components/icon-calendar';
import { IconClose } from './components/icon-close';
import { useNamespace } from '@devui/shared/utils';
import './date-picker-pro.scss';
import { createI18nTranslate } from '../../locale/create';

export default defineComponent({
  name: 'DDatePickerPro',
  props: datePickerProProps,
  emits: ['update:modelValue', 'toggleChange', 'confirmEvent', 'focus', 'blur'],
  setup(props: DatePickerProProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DDatePickerPro', app);
    const commonT = createI18nTranslate('DCommon', app)
    const { position } = toRefs(props);

    const ns = useNamespace('date-picker-pro');
    const {
      originRef,
      inputRef,
      overlayRef,
      placeholder,
      isPanelShow,
      format,
      dateValue,
      displayDateValue,
      isMouseEnter,
      showCloseIcon,
      pickerDisabled,
      pickerSize,
      isValidateError,
      onFocus,
      onSelectedDate,
      handlerClearTime,
      onInputChange,
      toggle,
    } = usePickerPro(props, ctx, t, commonT);
    ctx.expose({ toggle })
    const position = ref<Placement[]>(['bottom-start', 'top-start']);
    return () => {
      const vSlots = {
        rightArea: ctx.slots?.rightArea && (() => renderSlot(useSlots(), 'rightArea')),
        footer: ctx.slots?.footer && (() => renderSlot(useSlots(), 'footer')),
      };
      return (
        <div class={ns.b()}>
          <div
            class={ns.e('single-picker')}
            ref={originRef}
            onMouseenter={() => (isMouseEnter.value = true)}
            onMouseleave={() => (isMouseEnter.value = false)}>
            <Input
              ref={inputRef}
              modelValue={displayDateValue.value}
              placeholder={placeholder.value || t('placeholder')}
              onFocus={withModifiers(onFocus, ['stop'])}
              size={pickerSize.value}
              disabled={pickerDisabled.value}
              error={isValidateError.value}
              onUpdate:modelValue={onInputChange}
              v-slots={{
                prefix: () => (
                  <span class={ns.e('single-picker-icon')}>
                    <IconCalendar />
                  </span>
                ),
                suffix: () => (
                  showCloseIcon.value ?
                    <span class={['close-icon', ns.m('icon-visible')]} onClick={handlerClearTime}>
                      <IconClose />
                    </span> : null
                ),
              }}
            />
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
                  onSelectedDate={onSelectedDate}
                  v-slots={vSlots}
                />
              </FlexibleOverlay>
            </Transition>
          </Teleport>
        </div >
      );
    };
  },
});
