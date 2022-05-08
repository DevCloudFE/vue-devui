import { defineComponent, inject, computed } from 'vue';
import { checkboxGroupInjectionKey, checkboxProps, CheckboxProps } from './checkbox-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './checkbox.scss';

export default defineComponent({
  name: 'DCheckbox',
  props: checkboxProps,
  emits: ['change', 'update:checked', 'update:modelValue'],
  setup(props: CheckboxProps, ctx) {
    const checkboxGroupConf = inject(checkboxGroupInjectionKey, null);
    const ns = useNamespace('checkbox');

    const isChecked = computed(() => props.checked || props.modelValue);
    const mergedDisabled = computed(() => {
      return checkboxGroupConf?.disabled.value || props.disabled;
    });
    const mergedChecked = computed(() => {
      return checkboxGroupConf?.isItemChecked?.(props.value) ?? isChecked.value;
    });
    const mergedIsShowTitle = computed(() => {
      return checkboxGroupConf?.isShowTitle.value ?? props.isShowTitle;
    });
    const mergedShowAnimation = computed(() => {
      return checkboxGroupConf?.showAnimation.value ?? props.showAnimation;
    });
    const mergedColor = computed(() => {
      return checkboxGroupConf?.color.value ?? props.color;
    });
    const itemWidth = checkboxGroupConf?.itemWidth.value;
    const direction = checkboxGroupConf?.direction.value;

    const canChange = (checked: boolean, val: string) => {
      if (mergedDisabled.value) {
        return Promise.resolve(false);
      }

      const beforeChange = props.beforeChange ?? checkboxGroupConf?.beforeChange;
      if (beforeChange) {
        const res = beforeChange(checked, val);
        if (typeof res === 'boolean') {
          return Promise.resolve(res);
        }
        return res;
      }
      return Promise.resolve(true);
    };
    const toggle = () => {
      const current = !isChecked.value;
      checkboxGroupConf?.toggleGroupVal(props.value);
      ctx.emit('update:checked', current);
      ctx.emit('update:modelValue', current);
      ctx.emit('change', current);
    };
    const handleClick = () => {
      canChange(!isChecked.value, props.label).then((res) => res && toggle());
    };

    return {
      itemWidth,
      direction,
      mergedColor,
      mergedDisabled,
      mergedIsShowTitle,
      mergedChecked,
      mergedShowAnimation,
      handleClick,
      ns,
    };
  },
  render() {
    const {
      itemWidth,
      direction,
      mergedChecked,
      mergedDisabled,
      mergedIsShowTitle,
      mergedShowAnimation,
      halfchecked,
      title,
      label,
      handleClick,
      name,
      value,
      mergedColor,
      ns,
      $slots,
    } = this;

    const wrapperCls = {
      [ns.e('column-margin')]: direction === 'column',
      [ns.e('wrap')]: typeof itemWidth !== 'undefined',
    };
    const wrapperStyle = itemWidth ? [`width: ${itemWidth}px`] : [];
    const checkboxCls = {
      [ns.b()]: true,
      active: mergedChecked,
      halfchecked,
      disabled: mergedDisabled,
      unchecked: !mergedChecked,
    };
    const labelTitle = mergedIsShowTitle ? title || label : '';
    const bgImgStyle = (mergedColor && halfchecked) || mergedColor ? `linear-gradient(${mergedColor}, ${mergedColor})` : '';
    const spanStyle = [
      `border-color:${(mergedChecked || halfchecked) && mergedColor ? mergedColor : ''}`,
      `background-image:${bgImgStyle}`,
      `background-color:${mergedColor && halfchecked ? mergedColor : ''}`,
    ];
    const spanCls = {
      [ns.e('material')]: true,
      'custom-color': mergedColor,
      [ns.m('no-label')]: !label && !$slots.default,
      [ns.m('no-animation')]: !mergedShowAnimation,
      [ns.e('default-background')]: !halfchecked,
    };
    const polygonCls = {
      [ns.e('tick')]: true,
      [ns.m('no-animation')]: !mergedShowAnimation,
    };
    const stopPropagation = ($event: Event) => $event.stopPropagation();

    const inputProps = {
      indeterminate: halfchecked,
    };

    return (
      <div class={wrapperCls} style={wrapperStyle}>
        <div class={checkboxCls}>
          <label title={labelTitle} onClick={handleClick}>
            <input
              name={name || value}
              class={ns.e('input')}
              type="checkbox"
              {...inputProps}
              checked={mergedChecked}
              disabled={mergedDisabled}
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
            {label || $slots.default?.()}
          </label>
        </div>
      </div>
    );
  },
});
