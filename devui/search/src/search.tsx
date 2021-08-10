import { defineComponent } from 'vue'
import { SearchProps, searchProps } from './use-search'
import { getRootClass } from '../hooks/class-search'
import { keywordsHandles } from '../hooks/keywords-search'
import { keydownHandles } from '../hooks/keydown-search'
import DTextInput from '../../text-input/src/text-input';
import './search.scss'

export default defineComponent({
  name: 'DSearch',
  props: searchProps,
  setup(props: SearchProps, ctx) {
    const rootClasses = getRootClass(props)

    // 输入框内容定义、删改
    const { keywords, clearIconShow, onClearHandle } = keywordsHandles(props)

    // 键盘回车、鼠标点击搜索图标事件
    const { onInputKeydown, onClickHandle } = keydownHandles(ctx)
    
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
          <DTextInput
            size={props.size}
            disabled={props.disabled}
            value={keywords.value}
            placeholder={props.placeholder}
            onKeydown={onInputKeydown}
            onUpdate:value={onInputUpdate}
          ></DTextInput>
            {clearIconShow.value &&
              <div
                class="devui-search__clear"
                onClick={onClearHandle}
              >
                <d-icon name="close" size="inherit"></d-icon>
              </div>
            }
            {props.iconPosition === 'right' &&
              <div class="devui-search__icon">
                <d-icon name="search" size="inherit"></d-icon>
              </div>
            }
        </div>
      )
    }
  }
})