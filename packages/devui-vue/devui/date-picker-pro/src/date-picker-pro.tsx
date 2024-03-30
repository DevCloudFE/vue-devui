import { defineComponent, Transition, ref, renderSlot, useSlots, getCurrentInstance, Teleport, withModifiers, computed, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { datePickerProProps, DatePickerProProps } from './date-picker-pro-types';
import usePickerPro from './use-picker-pro';
import { Input } from '../../input';
import { FlexibleOverlay, Placement } from '../../overlay';
import DatePickerProPanel from './components/date-picker-panel';
import { IconCalendar } from './components/icon-calendar';
import { IconClose } from './components/icon-close';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './date-picker-pro.scss';
import { createI18nTranslate } from '../../locale/create';

export default defineComponent({
  name: 'DDatePickerPro',
  props: datePickerProProps,
  emits: ['update:modelValue', 'toggleChange', 'confirmEvent', 'focus', 'blur'],
  setup(props: DatePickerProProps, ctx: SetupContext) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DDatePickerPro', app);
    const { showGlowStyle } = toRefs(props);

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
    } = usePickerPro(props, ctx, t);
    const position = ref<Placement[]>(['bottom-start', 'top-start']);
    const currentPosition = ref('bottom');
    const handlePositionChange = (pos: string) => {
      currentPosition.value = pos.split('-')[0] === 'top' ? 'top' : 'bottom';
    };
    const styles = computed(() => ({
      transformOrigin: currentPosition.value === 'top' ? '0% 100%' : '0% 0%',
      'z-index': 'var(--devui-z-index-dropdown, 1052)',
    }));

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
            onMouseover={() => (isMouseEnter.value = true)}
            onMouseout={() => (isMouseEnter.value = false)}>
            <Input
              ref={inputRef}
              modelValue={displayDateValue.value}
              placeholder={placeholder.value || t('placeholder')}
              onFocus={withModifiers(onFocus, ['stop'])}
              size={pickerSize.value}
              disabled={pickerDisabled.value}
              error={isValidateError.value}
              show-glow-style={showGlowStyle.value}
              v-slots={{
                prefix: () => (
                  <span class={ns.e('single-picker-icon')}>
                    <IconCalendar />
                  </span>
                ),
                suffix: () => (
                  <span class={['close-icon', showCloseIcon.value ? ns.m('icon-visible') : ns.m('icon-hidden')]} onClick={handlerClearTime}>
                    <IconClose />
                  </span>
                ),
              }}
            />
          </div>
          <Teleport to="body">
            <Transition name={ns.m(`fade-${currentPosition.value}`)}>
              <FlexibleOverlay
                v-model={isPanelShow.value}
                ref={overlayRef}
                origin={originRef.value}
                align="start"
                position={position.value}
                style={styles.value}
                onPositionChange={handlePositionChange}>
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
        </div>
      );
    };
  },
});
