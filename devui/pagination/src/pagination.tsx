import { defineComponent, ref } from 'vue'
import { ComponentProps, componentProps } from './types'

import './pagination.scss'

export default defineComponent({
  name: 'd-pagination',
  props: componentProps,
  emits: ['pageIndexChange', 'pageSizeChange'],
  setup(props: ComponentProps, { emit }) {

    console.log(props, 'props')

    let jumpPage = '1'
    const jumpPageChange = (val: string) => {
      console.log('jumpPageChange跳转' + val)
    }
    
    return {
      jumpPage,
      jumpPageChange
    }

  },
  render() {

    const {
      pageSize,
      total,
      pageSizeOptions,
      pageSizeDirection,
      pageIndex,
      maxItems,
      preLink,
      nextLink,
      size,
      canJumpPage,
      canChangePageSize,
      canViewTotal,
      totalItemText,
      goToText,
      showJumpButton,
      showTruePageIndex,
      lite,
      showPageSelector,
      haveConfigMenu,
      autoFixPageIndex,
      autoHide,

      jumpPage,
      jumpPageChange
    } = this

    return (
      <div class="devui-pagination">
        <select name="pageSize">
          {
            pageSizeOptions.map((val: number) => {
              return <option value={val}>{val}</option>
            })
          }
        </select>
        <span>{totalItemText}: {total}</span>
        <ul class={'devui-pagination-list'}>
          <li>
            {
              preLink
                ? <a v-html={preLink} class="devui-pagination-link"></a>
                : <a class="devui-pagination-link">&lt;</a>
            }
          </li>
          <li class="active">
            <a class="devui-pagination-link">1</a>
          </li>
          <li>
            <a class="devui-pagination-link">2</a>
          </li>
          <li>
            <a class="devui-pagination-link">3</a>
          </li>
          <li>
            <a class="devui-pagination-link">4</a>
          </li>

          <li>
            {
              nextLink
                ? <a v-html={nextLink} class="devui-pagination-link"></a>
                : <a class="devui-pagination-link">&gt;</a>
            }
          </li>
        </ul>
        <div class="devui-jump-container">
          <span>{goToText}</span>
          <d-text-input class="devui-input" value={jumpPage} onChange={jumpPageChange} />
          <span>页</span>
        </div>
      </div>
    )
  }
})