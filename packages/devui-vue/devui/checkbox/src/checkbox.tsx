import { defineComponent, computed, SetupContext } from 'vue';
import { checkboxProps, CheckboxProps } from './checkbox-types';
import { useNamespace } from '@devui/shared/utils';
import { useCheckbox } from './use-checkbox';
import './checkbox.scss';

export default defineComponent({
  name: 'DCheckbox',
  props: checkboxProps,
  emits: ['change', 'update:checked', 'update:modelValue'],
  setup(props: CheckboxProps, ctx: SetupContext) {
    const ns = useNamespace('checkbox');
    const {
      mergedChecked,
      mergedDisabled,
      mergedIsShowTitle,
      mergedShowAnimation,
      mergedColor,
      itemWidth,
      direction,
      handleClick,
      size,
      border,
    } = useCheckbox(props, ctx);

    return () => {
      const wrapperCls = computed(() => ({
        [ns.e('column-margin')]: direction?.value === 'column',
        [ns.e('wrap')]: typeof itemWidth?.value !== 'undefined',
      }));
      const wrapperStyle = computed(() => (itemWidth?.value ? [`width: ${itemWidth.value}px`] : []));
      const checkboxCls = {
        [ns.b()]: true,
        active: mergedChecked.value,
        'half-checked': props.halfChecked,
        disabled: mergedDisabled.value,
        unchecked: !mergedChecked.value,
        [ns.m('glow-style')]: props.showGlowStyle,
        [ns.m(`checkbox-${size.value}`)]: border.value,
        [ns.m('checkbox-bordered')]: border.value,
      };
      const labelTitle = mergedIsShowTitle.value ? props.title || props.label : '';
      const bgImgStyle =
        (mergedColor.value && props.halfChecked) || mergedColor.value ? `linear-gradient(${mergedColor.value}, ${mergedColor.value})` : '';
      const spanStyle = [
        `border-color:${(mergedChecked.value || props.halfChecked) && mergedColor.value ? mergedColor.value : ''}`,
        `background-image:${bgImgStyle}`,
        `background-color:${mergedColor.value && props.halfChecked ? mergedColor.value : ''}`,
      ];
      const spanCls = {
        [ns.e('material')]: true,
        'custom-color': mergedColor.value,
        [ns.m('no-label')]: !props.label && !ctx.slots.default,
        [ns.m('no-animation')]: !mergedShowAnimation.value,
        [ns.e('default-background')]: !props.halfChecked,
      };
      const polygonCls = {
        [ns.e('tick')]: true,
        [ns.m('no-animation')]: !mergedShowAnimation.value,
      };
      const labelCls = {
        [ns.m(size.value)]: border.value,
        [ns.m('bordered')]: border.value,
      };
      const stopPropagation = ($event: Event) => $event.stopPropagation();

      const inputProps = {
        indeterminate: props.halfChecked,
      };

      return (
        <div class={wrapperCls.value} style={wrapperStyle.value}>
          <div class={checkboxCls}>
            {props.showGlowStyle && mergedShowAnimation.value && (
              <div class={ns.e('glow-box')}>
                <span class="glow-bg"></span>
              </div>
            )}
            <label title={labelTitle} onClick={handleClick} class={labelCls} style={{ width: itemWidth?.value ? '100%' : 'auto' }}>
              <input
                name={(props.name || props.value) as string}
                class={ns.e('input')}
                type="checkbox"
                {...inputProps}
                checked={mergedChecked.value}
                disabled={mergedDisabled.value}
                onClick={stopPropagation}
                onChange={stopPropagation}
              />
              <span style={spanStyle} class={spanCls}>
                <span class={ns.e('halfchecked-bg')}></span>
                <svg viewBox="0 0 14 14" width="14" height="14" class={ns.e('tick-wrap')}>
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M 2.3 7.0 5.6 9.6 11.4 3.5" stroke="#fff" stroke-width="1.5" fill="none" class={polygonCls}></path>
                  </g>
                </svg>
              </span>
              <span class={ns.e('label-text')}>{props.label || ctx.slots.default?.()}</span>
            </label>
          </div>
        </div>
      );
    };
  },
});
