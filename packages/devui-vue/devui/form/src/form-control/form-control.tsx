import { defineComponent, inject, ref, computed, reactive, onMounted, Teleport } from 'vue';
import { uniqueId } from 'lodash';
import { IForm, formControlProps, formInjectionKey } from '../form-types';
import { ShowPopoverErrorMessageEventData } from '../directive/d-validate-rules';
import clickoutsideDirective from '../../../shared/devui-directive/clickoutside';
import { EventBus, getElOffset } from '../util';
import Icon from '../../../icon/src/icon';
import Popover from '../../../popover/src/popover';
import './form-control.scss';

type positionType = 'top' | 'right' | 'bottom' | 'left';

export default defineComponent({
  name: 'DFormControl',
  directives: {
    clickoutside: clickoutsideDirective
  },
  props: formControlProps,
  setup(props, ctx) {
    const formControl = ref();
    const dForm = reactive(inject(formInjectionKey, {} as IForm));
    const labelData = reactive(dForm.labelData);
    const isHorizontal = labelData.layout === 'horizontal';
    const uid = uniqueId('dfc-');
    const showPopover = ref(false);
    const updateOn = ref('change');
    const tipMessage = ref('');
    const popPosition = ref<positionType>('bottom');
    let rectInfo: Partial<DOMRect> = {
      width: 0,
      height: 0
    };
    let elOffset = {
      left: 0,
      top: 0
    };
    let popoverLeftPosition = 0 ;
    let popoverTopPosition = 0 ;

    onMounted(() => {
      const el = document.getElementById(uid);
      elOffset = getElOffset(el);
      EventBus.on('showPopoverErrorMessage', (data: ShowPopoverErrorMessageEventData) => {
        if (uid === data.uid) {
          rectInfo = el.getBoundingClientRect();
          showPopover.value = data.showPopover;
          tipMessage.value = data.message;
          popPosition.value = data.popPosition as any; // todo: 待popover组件positionType完善类型之后再替换类型
          popoverLeftPosition = popPosition.value === 'top' || popPosition.value === 'bottom' ? rectInfo.right - (rectInfo.width / 2) : rectInfo.right;
          popoverTopPosition = popPosition.value === 'top' ? elOffset.top + (rectInfo.height / 2) - rectInfo.height : elOffset.top + (rectInfo.height / 2);
          updateOn.value = data.updateOn ?? 'change';
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
    });

    const handleClickOutside = () => {
      if(updateOn.value !== 'change') {
        showPopover.value = false;
      }
    };

    return () => {
      const {
        feedbackStatus,
        extraInfo,
      } = props;
      return <div class="devui-form-control" ref={formControl} data-uid={uid} v-clickoutside={handleClickOutside}>
        { showPopover.value &&
          <Teleport to="body">
            <div style={{
              position: 'absolute',
              left: popoverLeftPosition + 'px',
              top: popoverTopPosition + 'px',
              width: rectInfo.width + 'px',
              height: rectInfo.height + 'px',
            }}>
              <Popover controlled={updateOn.value !== 'change'} visible={showPopover.value} content={tipMessage.value} popType={'error'} position={popPosition.value} />
            </div>
          </Teleport>
        }
        <div class={`devui-form-control-container${isHorizontal ? ' devui-form-control-container-horizontal' : ''}${feedbackStatus ? ' devui-has-feedback' : ''}${feedbackStatus === 'error' ? ' devui-feedback-error' : ''}`}>
          <div class="devui-control-content-wrapper" id={uid}>
            {ctx.slots.default?.()}
          </div>
          {
            (feedbackStatus || ctx.slots.suffixTemplate?.()) &&
            <span class="devui-feedback-status">
              {ctx.slots.suffixTemplate?.() ? ctx.slots.suffixTemplate?.() : <Icon name={iconData.value.name} color={iconData.value.color}></Icon>}
            </span>
          }
        </div>
        {extraInfo && <div class="devui-form-control-extra-info">{extraInfo}</div>}
      </div>;
    };
  }
});
