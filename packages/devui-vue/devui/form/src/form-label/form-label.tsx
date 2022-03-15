import { defineComponent, inject, reactive, computed } from 'vue';
import { IForm, formLabelProps, FormLabelProps, formInjectionKey } from '../form-types';
import Icon from '../../../icon/src/icon';
import Popover from '../../../popover/src/popover';
import './form-label.scss';

export default defineComponent({
  name: 'DFormLabel',
  props: formLabelProps,
  setup(props: FormLabelProps, ctx) {
    const dForm = reactive(inject(formInjectionKey, {} as IForm));
    const labelData = reactive(dForm.labelData);

    const isHorizontal = computed(() => labelData.layout === 'horizontal').value;
    const isLg = computed(() => labelData.labelSize === 'lg').value;
    const isSm = computed(() => labelData.labelSize === 'sm').value;
    const isCenter = computed(() => labelData.labelAlign === 'center').value;
    const isEnd = computed(() => labelData.labelAlign === 'end').value;

    const wrapperCls = `devui-form-label${isHorizontal ? (isSm ? ' devui-form-label_sm' : (isLg ? ' devui-form-label_lg' : ' devui-form-label_sd')) : ''}${isCenter ? ' devui-form-label_center' : (isEnd ? ' devui-form-label_end' : '')}`;
    const className = `${props.required ? ' devui-required' : ''}`;
    const style = {display: isHorizontal ? 'inline' : 'inline-block'};

    return () => {
      return <span class={wrapperCls} style={style}>
        <span class={className} >
          {ctx.slots.default?.()}
          {
            props.hasHelp && props.helpTips && (
              <Popover content={props.helpTips} showAnimation={false} position={'top'} trigger={'hover'} v-slots={{
                reference: () => (
                  <span class="devui-form-label-help">
                    <Icon name="helping" color="#252b3a"></Icon>
                  </span>
                )
              }}>
              </Popover>
            )
          }
        </span>
      </span>;
    };
  }
});
