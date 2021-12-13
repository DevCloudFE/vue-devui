import { computed, defineComponent, inject, renderSlot } from 'vue'
import { DropdownPropsKey } from '../auto-complete-types'
// 后续会对接自带下拉组件，相关功能将全部抽离
export default defineComponent({
  name: 'DAutoCompleteDropdown',
  setup(props,ctx) {
    const propsData = inject(DropdownPropsKey)
    const {
      visible,
      selectedIndex,
      selectOptionClick,
      searchList
    } = propsData
    const {
      disabled,
      noResultItemTemplate,
      maxHeight,
      appendToBody,
      formatter,
      disabledKey,
      isSearching
    } = propsData.props
    
    // 空状态 ！todo
    const emptyText = computed(() => {
      if (searchList.value.length === 0) {
        return '没有数据'
      }
      // 如果有自定义传入！todo
      return '没有数据'
    })
    const renderEmptySlots = () => {
      return ctx.slots.empty ? renderSlot(ctx.slots, 'empty') : emptyText
    }
    const onSelect =(index:Number)=>{
      let data = {
        index,
      }
      selectOptionClick(data)
    }
    return () => {
      return (
        <div 
          class={["devui-dropdown-menu",appendToBody&&'devui-dropdown-menu-cdk',disabled &&"disabled"]}
          v-show={visible.value&&searchList.value.length>0}
        >
        <ul 
          class="devui-list-unstyled scroll-height"
          style={{maxHeight:`${maxHeight}px`}}
        >
          {/* 搜索中展示 */}
          {
            isSearching&&
            <li 
                class="devui-is-searching-template"
            >
                {/* todu */}
                {
                  // searchingTemplate?searchingTemplate:"默认搜索显式内容"
                }
            </li>
          }
          {/*  展示 */}
          {
            !isSearching&&searchList!=null&&searchList.value.length>0&&searchList.value.map((item,index)=>{
              return (
                <li 
                  onClick={()=>onSelect(index)}
                  class={[
                    "devui-dropdown-item",selectedIndex.value==index&&"selected",
                    {"disabled": disabledKey && item[disabledKey]}
                  ]}
                  title={formatter(item)}
                >
                  {
                    item
                  }
                </li>
              )
            })
          }

          {/* 没有匹配结果传入了noResultItemTemplate*/}
          {
            noResultItemTemplate&&
            <li class='devui-no-result-template'>
                <div class='devui-no-data-tip'>
                  {noResultItemTemplate}
                </div>
            </li>
          }
        </ul>
      </div>
      )
    }

  }
})
