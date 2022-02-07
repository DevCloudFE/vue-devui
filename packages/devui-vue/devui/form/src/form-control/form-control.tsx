import { defineComponent, inject, ref, computed, reactive, onMounted, Teleport, watch } from 'vue';
import { uniqueId } from 'lodash-es';
import { IForm, IFormItem, formControlProps, formInjectionKey, formItemInjectionKey } from '../form-types';
import clickoutsideDirective from '../../../shared/devui-directive/clickoutside'
import { EventBus, getElOffset, transformCamelToDash } from '../util';
import Icon from '../../../icon/src/icon';
import Popover from '../../../popover/src/popover';
import './form-control.scss';

// type positionType = 'top' | 'right' | 'bottom' | 'left';

export default defineComponent({
  name: 'DFormControl',
  directives: {
    clickoutside: clickoutsideDirective
  },
  props: formControlProps,
  setup(props, ctx) {
    const formControl = ref();
    const dForm = reactive(inject(formInjectionKey, {} as IForm));
    const dFormItem = reactive(inject(formItemInjectionKey, {} as IFormItem));
    const labelData = reactive(dForm.labelData);
    const isHorizontal = labelData.layout === 'horizontal';
    const uid = uniqueId("dfc-");
    const showPopover = ref(false);
    const updateOn = ref('change');
    const tipMessage = ref("");
    const popPosition = ref<any>(props.popPosition);
    const messageShowTypeData = ref(props.messageShowType);
    const showMessage = ref(dFormItem.showMessage);
    if(!messageShowTypeData.value) {
      messageShowTypeData.value = dForm.messageShowType as any;
    }
    let rectInfo: Partial<DOMRect> = {
      width: 0,
      height: 0
    };
    let elOffset = {
      left: 0,
      top: 0
    }
    let popoverLeftPosition = 0 ;
    let popoverTopPosition = 0 ;

    const objToStyleString = (obj: any = {}) => {
      let style = '';
      for (const key in obj) {
        style += `${transformCamelToDash(key)}: ${obj[key]};`
      }
      return style;
    }

    let popoverWrapperStyle = () => '';
    const popoverPosition = () => {
      return Array.isArray(props.popPosition) ? props.popPosition.join('-') : props.popPosition;
    }
    onMounted(() => {
      const el = document.getElementById(uid);
      // elOffset = getElOffset(el);

      if(messageShowTypeData.value === "popover") {
        popoverWrapperStyle = () => {
          let rect = el.getBoundingClientRect();
          let style: any = {
            position: 'absolute',
            height: 0,
            top: (rect.height / 2) + 'px',
            right: 0,
          }
          let p = popoverPosition();
          if(popPosition.value === 'bottom' || popPosition.value === 'top') {
            style.left = '50%';
          }
          if(popPosition.value === 'left' || popPosition.value === 'right') {
            style.top = 0;
          }
          if(p.includes('top')) {
            style.top = -(rect.height / 2) + 'px';
          }
          if(p.endsWith('-bottom')) {
            style.top = (rect.height / 2) + 'px';
          }
          if(p.includes('left')) {
            style.left = 0;
          }
          if(p.includes('right')) {
            delete style.left;
            style.right = 0;
          }
    
          if(p.startsWith('bottom')) {
            delete style.top;
            style.bottom = -(rect.height / 2) + 'px';
          }
          if(p.startsWith('top')) {
            delete style.bottom;
          }
          
          return objToStyleString(style);
        };
      }

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

    const handleClickOutside = () => {
      if(updateOn.value !== 'change') {
        showPopover.value = false;
      }
    }

    watch(() => dFormItem.showMessage, (newVal) => {
      showMessage.value = newVal;
    }, {
      deep: true,
    })

    return () => {
      const {
        feedbackStatus,
        extraInfo
      } = props;
      return <div class="devui-form-control" ref={formControl} data-uid={uid} v-clickoutside={handleClickOutside}>
        <div class={`devui-form-control-container${isHorizontal ? ' devui-form-control-container-horizontal' : ''}${feedbackStatus ? ' devui-has-feedback' : ''}${feedbackStatus === 'error' ? ' devui-feedback-error' : ''}`}>
          <div class={`devui-control-content-wrapper${showMessage.value ? ' devui-error-form-control' : ''}`} id={uid}>
            { messageShowTypeData.value === "popover" &&
              <div style="position: relative; height: 0; width: 100%;">
                <div style={popoverWrapperStyle()}>
                  <Popover controlled={updateOn.value !== 'change'} visible={showMessage.value} content={dFormItem.tipMessage} popType={"error"} position={popPosition.value} />
                </div>
              </div>
            }
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
        {showMessage.value && messageShowTypeData.value === 'text' && <div class="devui-validate-tip">{dFormItem.tipMessage}</div>}
      </div>
    }
  }
})