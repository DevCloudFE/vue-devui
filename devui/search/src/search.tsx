import { defineComponent } from 'vue'
import { SearchProps, searchProps } from './search-types'
import { getRootClass } from '../hooks/use-search-class'
import { keywordsHandles } from '../hooks/use-search-keywords'
import { keydownHandles } from '../hooks/use-search-keydown'
import DInput from '../../input/src/input';
import './search.scss'

export default defineComponent({
  name: 'DSearch',
  props: searchProps,
  emits: ['update:modelValue', 'searchFn'],
  setup(props: SearchProps, ctx) {
    const rootClasses = getRootClass(props)
    // 输入框内容定义、删改
    const {keywords, clearIconShow, onClearHandle} = keywordsHandles(props)

    // 键盘回车事件
    const { onInputKeydown, onClickHandle } = keydownHandles(ctx, keywords)
    
    // 双向绑定
    const onInputUpdate = (event: string) => {
      keywords.value = event
      ctx.emit('update:modelValue', event)
    }

    return () => {
      return (
        <div class={rootClasses.value}>
          {props.iconPosition === 'left' &&
            <div class="devui-search__icon" onClick={onClickHandle}>
              <d-icon name="search" size="inherit"></d-icon>
            </div>
          }
          <DInput
            size={props.size}
            disabled={props.disabled}
            value={keywords.value}
            placeholder={props.placeholder}
            onKeydown={onInputKeydown}
            onUpdate:value={onInputUpdate}
          ></DInput>
            {clearIconShow.value &&
              <div
                class="devui-search__clear"
                onClick={onClearHandle}
              >
                <d-icon name="close" size="inherit"></d-icon>
              </div>
            }
            {props.iconPosition === 'right' &&
              <div class="devui-search__icon" onClick={onClickHandle}>
                <d-icon name="search" size="inherit"></d-icon>
              </div>
            }
        </div>
      )
    }
  }
})