import { computed, defineComponent, provide, reactive } from 'vue'
import './tabs.scss';
export type Active = string | number | null;
export type TabsType = 'tabs' | 'pills' | 'options' | 'wrapped' | 'slider'
export interface Tabs {
  state: TabsState;
}
interface TabsState {
  data?: any[],
  showContent: boolean,
  active: any
}
export default defineComponent({
  name: 'd-tabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    // TODO:其中 slider 类型还没有实现
    type: {
      type: String as () => TabsType,
      default: 'tabs'
    },
    showContent: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: false
    },
    reactivable: {
      type: Boolean,
      default: true
    },
    customWidth: {
      type: String
    },
    cssClass: {
      type: String
    }
  },
  // TODO: beforeChange没有完成实现
  emits: ['update:modelValue', 'activeTabChange', 'beforeChange'],
  setup(props, { emit, slots }) {
    const active = computed(() => {
      return props.modelValue
    })
    const state: TabsState = reactive({
      data: [],
      active,
      showContent: props.showContent
    });
    provide<Tabs>('tabs', {
      state
    });
    function activateTab(tab: Active) {
      emit('beforeChange');
      emit('update:modelValue', tab);
      if (props.reactivable) {
        emit('activeTabChange', tab)
      }
    }

    const ulClass: string[] = [props.type];
    props.cssClass && ulClass.push(props.cssClass);
    props.vertical && ulClass.push('devui-nav-stacked')
    return () => {
      return <div >
        <ul role="tablist" class={`devui-nav devui-nav-${ulClass.join(' ')}`} id="devuiTabs11">
          {
            state.data.map((item, i) => {
              return <li role="presentation" onClick={(e) => activateTab((item.id || item.tabId))} class={active.value === (item.id || item.tabId) ? 'active' : ''} id={item.id || item.tabId} >
                <a role="tab" data-toggle={item.id} aria-expanded={active.value === (item.id || item.tabId)}>
                  <span >{item.title}</span>
                </a>
              </li>
            })
          }
          <div class={`devui-nav-${props.type}-animation`}></div>
        </ul>
        {slots.default()}
      </div>

    }
  }
})

