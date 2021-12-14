import { computed, defineComponent, inject, renderSlot, Transition } from 'vue'
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
      searchList,
      searchStatus,
      showNoResultItemTemplate
    } = propsData
    const {
      disabled,
      maxHeight,
      appendToBody,
      formatter,
      disabledKey,
      isSearching
    } = propsData.props
    
    const onSelect =(item:any)=>{
      if(item[disabledKey]){return}
      selectOptionClick(item)
    }
    return () => {
      return (
        <div 
          class={["devui-dropdown-menu",appendToBody&&'devui-dropdown-menu-cdk',disabled &&"disabled"]}
          v-show={(visible.value&&searchList.value.length>0)||(ctx.slots.noResultItemTemplate&&showNoResultItemTemplate.value)||(isSearching&&ctx.slots.searchingTemplate&&searchStatus.value)}
        >
        <ul 
          class="devui-list-unstyled scroll-height"
          style={{maxHeight:`${maxHeight}px`}}
        >
          {/* 搜索中展示 */}
          {
            isSearching&&ctx.slots.searchingTemplate&&searchStatus.value
            &&<li class="devui-is-searching-template">
                <div class='devui-no-data-tip'>
                  {
                    ctx.slots.searchingTemplate()
                  }
                </div>
                  
              </li>
          }
          {/*  展示 */}
          {
            !showNoResultItemTemplate.value&&!searchStatus.value&&searchList!=null&&searchList.value.length>0&&searchList.value.map((item,index)=>{
              return (
                <li 
                  onClick={()=>onSelect(item)}
                  class={[
                    "devui-dropdown-item",selectedIndex.value==index&&"selected",
                    {"disabled": disabledKey && item[disabledKey]}
                  ]}
                  title={formatter(item)}
                  key={formatter(item)}
                >
                  {
                    ctx.slots.itemTemplate?ctx.slots.itemTemplate(item,index):formatter(item)
                  }
                </li>
              )
            })
          }

          {/* 没有匹配结果传入了noResultItemTemplate*/}
          {
            !searchStatus.value&&searchList.value.length==0&&ctx.slots.noResultItemTemplate&&showNoResultItemTemplate.value&&
            <li class='devui-no-result-template'>
                <div class='devui-no-data-tip'>
                  {ctx.slots.noResultItemTemplate()}
                </div>
            </li>
          }
        </ul>
      </div>
      )
    }

  }
})
