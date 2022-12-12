import { defineComponent, SetupContext } from 'vue';
import { checkboxProps, CheckboxProps } from './checkbox-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
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
      const wrapperCls = {
        [ns.e('column-margin')]: direction === 'column',
        [ns.e('wrap')]: typeof itemWidth !== 'undefined',
      };
      const wrapperStyle = itemWidth ? [`width: ${itemWidth}px`] : [];
      const checkboxCls = {
        [ns.b()]: true,
        active: mergedChecked.value,
        'half-checked': props.halfChecked,
        disabled: mergedDisabled.value,
        unchecked: !mergedChecked.value,
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
        [ns.m(size.value)]: size.value,
        [ns.m('bordered')]: border.value,
      };
      const stopPropagation = ($event: Event) => $event.stopPropagation();

      const inputProps = {
        indeterminate: props.halfChecked,
      };

      return (
        <div class={wrapperCls} style={wrapperStyle}>
          <div class={checkboxCls}>
            <label title={labelTitle} onClick={handleClick} class={labelCls} style={{ width: itemWidth ? '100%' : 'auto' }}>
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
                <svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" class={ns.e('tick-wrap')}>
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <polygon
                      fill-rule="nonzero"
                      points="5.17391304 6.56521739 7.7173913 9.10869565 11.826087 5 13 6.17391304 7.7173913 11.4565217 4 7.73913043"
                      class={polygonCls}></polygon>
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
