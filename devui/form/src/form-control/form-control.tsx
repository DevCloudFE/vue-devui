import { defineComponent, inject, ref, computed, reactive } from 'vue';
import './form-control.scss';
import Icon from '../../../icon/src/icon';
import {IForm, formControlProps, formInjectionKey} from '../form-types';

export default defineComponent({
  name: 'DFormControl',
  props: formControlProps,
  setup(props, ctx) {
    const formControl = ref();
    const dForm = reactive(inject(formInjectionKey, {} as IForm));
    const labelData = reactive(dForm.labelData);
    const isHorizontal = labelData.layout === 'horizontal';

    const iconData = computed(() => {
      switch(props.feedbackStatus) {
        case 'pending':
          return {name: 'priority', color: '#e9edfa'};
        case 'success':
          return {name: 'right-o', color: 'rgb(61, 204, 166)'};
        case 'error':
          return {name: 'error-o', color: 'rgb(249, 95, 91)'};
        default:
          return {name: '', color: ''};
      }
    })
    
    return () => {
      const {
        feedbackStatus,
        extraInfo,
      } = props;
      return <div class="form-control" ref={formControl}>
        <div class={`devui-form-control-container${isHorizontal ? ' devui-form-control-container-horizontal' : ''}${feedbackStatus ? ' has-feedback' : ''}${feedbackStatus === 'error' ? ' feedback-error' : ''}`}>
          {ctx.slots.default?.()}
          {
            (feedbackStatus || ctx.slots.suffixTemplate?.()) &&
            <span class="feedback-status">
              {ctx.slots.suffixTemplate?.() ? ctx.slots.suffixTemplate?.() : <Icon name={iconData.value.name} color={iconData.value.color}></Icon>}
            </span>
          }
        </div>
        {extraInfo && <div class="devui-form-control-extra-info">{extraInfo}</div>}
      </div>
    }
  }
})