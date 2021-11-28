import { defineComponent, inject, ref, computed, reactive, onMounted } from 'vue';
import { uniqueId } from 'lodash-es';
import { IForm, formControlProps, formInjectionKey } from '../form-types';
import { ShowPopoverErrorMessageEventData } from '../directive/d-validate-rules'
import { EventBus } from '../util';
import Icon from '../../../icon/src/icon';
import Popover from '../../../popover/src/popover';
import './form-control.scss';

type positionType = 'top' | 'right' | 'bottom' | 'left';

export default defineComponent({
  name: 'DFormControl',
  props: formControlProps,
  setup(props, ctx) {
    const formControl = ref();
    const dForm = reactive(inject(formInjectionKey, {} as IForm));
    const labelData = reactive(dForm.labelData);
    const isHorizontal = labelData.layout === 'horizontal';
    const uid = uniqueId("dfc-");
    const showPopover = ref(false);
    const tipMessage = ref("");
    const popPosition = ref<positionType>("bottom");

    onMounted(() => {
      EventBus.on("showPopoverErrorMessage", (data: ShowPopoverErrorMessageEventData) => {
        if (uid === data.uid) {
          showPopover.value = data.showPopover;
          tipMessage.value = data.message;
          popPosition.value = data.popPosition as any; // todo: 待popover组件positionType完善类型之后再替换类型
        }
      });
    });

    const iconData = computed(() => {
      switch (props.feedbackStatus) {
        case 'pending':
          return { name: 'priority', color: '#e9edfa' };
        case 'success':
          return { name: 'right-o', color: 'rgb(61, 204, 166)' };
        case 'error':
          return { name: 'error-o', color: 'rgb(249, 95, 91)' };
        default:
          return { name: '', color: '' };
      }
    })

    return () => {
      const {
        feedbackStatus,
        extraInfo,
      } = props;
      return <div class="form-control" ref={formControl} data-uid={uid}>
        <div class={`devui-form-control-container${isHorizontal ? ' devui-form-control-container-horizontal' : ''}${feedbackStatus ? ' has-feedback' : ''}${feedbackStatus === 'error' ? ' feedback-error' : ''}`}>
          <div class={`devui-control-content-wrapper ${showPopover.value ? 'with-popover' : ''}`}>
            {ctx.slots.default?.()}
            { showPopover.value && 
              <div class="devui-popover-wrapper">
                <Popover visible={true} content={tipMessage.value} popType={"error"} position={popPosition.value} />
              </div>
            }
          </div>
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