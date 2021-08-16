import { defineComponent, computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { ComponentProps, componentProps } from './use-pagination'
import { handlePages, liteSelectOptions } from './utils'

import './pagination.scss'

export default defineComponent({
  name: 'DPagination',
  props: componentProps,
  emits: ['pageIndexChange', 'pageSizeChange', 'update:pageSize', 'update:pageIndex'],
  setup(props: ComponentProps, { emit }) {

    const isShowConfig = ref(false)
    const paginationConfig = ref(null)
    const changeConfigDispaly = () => {
      isShowConfig.value = !isShowConfig.value
    }

    const clickCallback = (e: Event) => {
      if (isShowConfig.value && paginationConfig.value && paginationConfig.value !== e.target) {
        isShowConfig.value = false
      }
    }
    onMounted(() => {
      if (props.lite && props.haveConfigMenu) {
        document.addEventListener('click', clickCallback)
      }
    })
    onUnmounted(() => {
      if (props.lite && props.haveConfigMenu) {
        document.removeEventListener('click', clickCallback)
      }
    })

    // 页码较多时，计算中间的显示页码的起始页码数
    const showPageNum = computed(() => handlePages(cursor.value, props.maxItems, totalPages.value))
    
    // 极简模式下，可选的下拉选择页码
    const litePageOptions = computed(() => {
      return liteSelectOptions(totalPages.value)
    })

    // 当前页码
    const cursor = computed({
      get() {
        if (!props.showTruePageIndex && props.pageIndex > totalPages.value) {
          return totalPages.value || 1
        }
        return props.pageIndex || 1
      },
      set(val: number) {
        emit('update:pageIndex', val)
      }
    })
    const changePageNo = ref(props.pageSize)
    // 输入框显示的页码
    const inputPageNum = computed({
      get() {
        return props.pageIndex
      },
      set(val: number) {
        changePageNo.value = val
      }
    })
    // 每页显示最大条目数量
    const currentPageSize = computed({
      get() {
        return props.pageSize
      },
      set(val: number) {
        emit('update:pageSize', val)
      }
    })
    // 总页数
    const totalPages = computed(() => {
      return Math.ceil(props.total / props.pageSize)
    })

    const changeCursorEmit = (val: number) => {
      cursor.value = val
      emit('pageIndexChange', val)
    }
    // 输入跳转页码
    const jumpPageChange = (currentPage: string) => {
      const curPage = +currentPage
      if (isNaN(curPage) || curPage < 1 || curPage > totalPages.value) {
        inputPageNum.value = props.pageIndex
        return
      }
      inputPageNum.value = curPage
    }
    const jump = (e: KeyboardEvent | 'btn') => {
      if (e === 'btn' || e.key === 'Enter') {
        cursor.value = changePageNo.value
      }
    }
    // 点击页码
    const changeCursor = (pageSize: number) => {
      if (isNaN(pageSize)) return
      const page = pageSize < 1 ? 1 : pageSize > totalPages.value ? totalPages.value : pageSize | 0

      changeCursorEmit(page)
    }
    // 上一页
    const prevChange = (page: number) => {
      if (cursor.value > 1) {
        const toPage = page === -1 ? cursor.value - 1 : page
        changeCursorEmit(toPage)
      }
    }
    // 下一页
    const nextChange = (page: number) => {
      if (cursor.value < totalPages.value) {
        const toPage = page === -1 ? cursor.value + 1 : page
        changeCursorEmit(toPage)
      }
    }
    // 每页条数改变
    const pageSizeChange = (value: number) => {
      currentPageSize.value = value
      // 页数改变后，如果当前页码超出最大页码时修正
      if (props.autoFixPageIndex) {
        nextTick(() => {
          if (cursor.value > totalPages.value) {
            changeCursorEmit(totalPages.value)
          }
        })
      }
      emit('pageSizeChange', value)
    }
    // 极简模式下的跳转页码
    const litePageIndexChange = (page: {name: string; value: number;}) => {
      cursor.value = page.value
      emit('pageIndexChange', page.value)
    }
    
    return {
      cursor,
      totalPages,
      prevChange,
      nextChange,
      jump,
      inputPageNum,
      jumpPageChange,
      currentPageSize,
      pageSizeChange,
      changeCursor,
      showPageNum,
      litePageOptions,
      litePageIndexChange,
      isShowConfig,
      paginationConfig,
      changeConfigDispaly
    }
  },
  render() {

    const {
      total,
      pageSizeOptions,
      // pageSizeDirection,
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
      autoHide,
      $slots,

      cursor,
      totalPages,
      prevChange,
      nextChange,
      jump,
      inputPageNum,
      jumpPageChange,
      currentPageSize,
      pageSizeChange,
      changeCursor,
      showPageNum,
      litePageOptions,
      litePageIndexChange,
      isShowConfig,
      changeConfigDispaly
    } = this

    return (
      // autoHide为 true 并且 pageSizeOptions最小值 > total 不展示分页
      autoHide && Math.min(...pageSizeOptions) > total
      ? null
      : <div class="devui-pagination">
        {
          canChangePageSize && !lite &&
          <div class="devui-page-size">
            <d-select
              options={pageSizeOptions}
              modelValue={currentPageSize}
              onValueChange={pageSizeChange}
            />
          </div>
        }
        {
          ((!lite || (lite && showPageSelector)) && canViewTotal) &&
          <div class="devui-total-size">{totalItemText}: {total}</div>
        }
        {
          // 极简模式下的选择页码下拉框
          lite && showPageSelector &&
          <div class="devui-page-size">
            <d-select
              options={litePageOptions}
              disabled={total === 0}
              modelValue={cursor}
              onValueChange={litePageIndexChange}
            />
          </div>
        }

        <ul class={'devui-pagination-list'}>
          {/* 左侧上一页按钮 */}
          <li onClick={prevChange.bind(null, -1)} class={{'devui-pagination-item': true, disabled: cursor <= 1}}>
            <a v-html={preLink} class="devui-pagination-link"></a>
          </li>
          {
            !lite &&
            <>
              {/* 页码展示 */}
              {/* 单独展示第一页 */}
              <li onClick={changeCursor.bind(null, 1)} class={{'devui-pagination-item': true, active: cursor === 1}}>
                <a class="devui-pagination-link">{1}</a>
              </li>
              {
                // 是否展示第一个 ...
                showPageNum[0] > 2 && (
                  <li onClick={prevChange.bind(null, showPageNum[0] - 1)} class={{'devui-pagination-item': true}}>
                    <a class="devui-pagination-link">...</a>
                  </li>
                )
              }
              {
                // 中间显示页码
                (() => {
                  const list = []
                  for(let i = showPageNum[0]; i <= showPageNum[1]; i++) {
                    list.push(
                      <li onClick={changeCursor.bind(null, i)} class={{'devui-pagination-item': true, active: cursor === i}}>
                        <a class="devui-pagination-link">{i}</a>
                      </li>
                    )
                  }
                  return list
                })()
              }
              {
                // 是否展示第二个 ...
                showPageNum[1] < totalPages - 1 && (
                  <li onClick={nextChange.bind(null, showPageNum[1] + 1)} class="devui-pagination-item">
                    <a class="devui-pagination-link">...</a>
                  </li>
                )
              }
              {
                // 是否单独展示最后一页
                showPageNum[1] < totalPages && (
                  <li onClick={changeCursor.bind(null, totalPages)} class={{'devui-pagination-item': true, active: cursor === totalPages}}>
                    <a class="devui-pagination-link">{totalPages}</a>
                  </li>
                ) 
              }
              {
                // 在默认页码超出总页码的时候
                showTruePageIndex && cursor > totalPages && totalPages > 0 &&
                <>
                  {
                    cursor > totalPages + 1 &&
                    <li class="devui-pagination-item disabled">
                      <a class="devui-pagination-link">...</a>
                    </li>
                  }
                  <li class="devui-pagination-item disabled active">
                    <a class="devui-pagination-link">{ cursor }</a>
                  </li>
                </>
              }
            </>
          }
          {/* 右侧下一页按钮 */}
          <li onClick={nextChange.bind(null, -1)} class={{'devui-pagination-item': true, disabled: cursor >= totalPages}}>
            <a v-html={nextLink} class="devui-pagination-link"></a>
          </li>
        </ul>
        {
          canJumpPage && !lite &&
          <div class="devui-jump-container">
            {goToText}

            <d-text-input
              class={['devui-input', size ? 'devui-input-' + size : '']}
              value={String(inputPageNum)}
              onUpdate:value={jumpPageChange}
              onKeydown={jump}
            />

            {/* TODO 加入国际化后，替换为当前语言为中文的时候加上 '页' */}
            {goToText === '跳至' && '页'}
            {
              showJumpButton &&
              <div class="devui-jump-button" onClick={jump.bind(null, 'btn')} title="跳至">
                <div class="devui-pagination-go"></div>
              </div>
            }
          </div>
        }
        {
          // 极简模式下是否显示配置
          lite && haveConfigMenu &&
          <div class="devui-pagination-config">
            <div class="devui-setup-icon" onClick={changeConfigDispaly}>
              <i class="icon-setting" style="font-weight: bold;" ref="paginationConfig"></i>
            </div>
            {
              isShowConfig &&
              <div class="devui-config-container">
                {$slots.default?.()}
                
                <div class="pagination-config-item">
                  <div class="config-item-title">每页条数</div>
                  <div class="devui-page-number">
                    {
                      pageSizeOptions.map((v: number) => {
                        return <div class={{choosed: v === currentPageSize}} onClick={pageSizeChange.bind(null, v)}>{v}</div>
                      })
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    )
  }
})