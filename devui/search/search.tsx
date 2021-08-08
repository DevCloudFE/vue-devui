import { defineComponent } from 'vue'
import { SearchProps, searchProps } from './use-search'
import { getRootClass } from './hooks/class-search'
import { keywordsHandles } from './hooks/keywords-search'
import { keydownHandles } from './hooks/keydown-search'
import DTextInput from '../text-input/src/text-input';
import './search.scss'

export default defineComponent({
  name: 'DSearch',
  props: searchProps,
  setup(props: SearchProps, ctx) {
    const rootClasses = getRootClass(props)

    // 输入框内容定义、删改
    const {keywords, clearIconShow, onClearHandle} = keywordsHandles(props)

    // 键盘回车事件
    const { onInputKeydown } = keydownHandles(ctx)
    
    // 双向绑定
    const onInputUpdate = (event: string) => {
      keywords.value = event
      if (props.modelValue) { // 仅进行了双向绑定的才有返回值
        console.log(event)
        ctx.emit('update:modelValue', event)
      }
    }

    return () => {
      return (
        <div class={rootClasses.value}>
          {props.iconPosition === 'left' &&
            <div class="d-search__icon">
              <svg class="svg-icon-search" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2182">
                <path d="M 490.352 162.153 c 182.98 0 331.847 148.866 331.847 331.848 c 0 182.98 -148.866 331.847 -331.847 331.847 c -182.982 0 -331.848 -148.866 -331.848 -331.847 c 0 -182.982 148.865 -331.848 331.848 -331.848 m 0 -90.504 C 257.095 71.649 68 260.744 68 494.001 c 0 233.255 189.095 422.35 422.352 422.35 c 233.256 0 422.35 -189.095 422.35 -422.35 c -0.001 -233.257 -189.095 -422.352 -422.35 -422.352 Z" p-id="2183"></path><path d="M 922.748 916.336 c -11.578 0 -23.155 -4.418 -31.995 -13.257 L 770.081 782.407 c -17.676 -17.661 -17.676 -46.327 0 -63.988 c 17.677 -17.677 46.314 -17.677 63.99 0 l 120.672 120.672 c 17.676 17.661 17.676 46.327 0 63.988 c -8.839 8.839 -20.416 13.257 -31.995 13.257 Z" p-id="2184"></path>
              </svg>
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
                class="d-search__clear"
                onClick={onClearHandle}
              >
                <svg class="svg-icon-clear" width="10px" height="10px" viewBox="0 0 10 10" version="1.1" xmlns="http://www.w3.org/2000/svg"
                >
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-3.000000, -3.000000)" fill-rule="nonzero">
                      <path
                        d="M11.6426,3.19816936 C11.9239974,2.91574512 12.4131626,2.93784891 12.7352108,3.24751057 C13.0571998,3.5572302 13.0901298,4.03723416 12.8087324,4.31965839 L9.14064666,7.99900183 L12.8087324,11.6803416 C13.0645482,11.9370909 13.0605893,12.3571292 12.8158402,12.6640749 L12.7352108,12.7524894 C12.4131626,13.0621511 11.9239974,13.0842548 11.6426,12.8018306 L8,9.14489021 L4.35740003,12.8018306 C4.10158422,13.05858 3.6740594,13.0636532 3.35648225,12.8298003 L3.26478919,12.7524894 C2.94280021,12.4427698 2.90987023,11.9627658 3.19126762,11.6803416 L6.8583349,7.99900183 L3.19126762,4.31965839 C2.93545181,4.06290908 2.93941068,3.64287076 3.18415975,3.3359251 L3.26478919,3.24751057 C3.58683735,2.93784891 4.07600264,2.91574512 4.35740003,3.19816936 L8,6.85411161 L11.6426,3.19816936 Z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            }
            {props.iconPosition === 'right' &&
              <div class="d-search__icon">
                <svg class="svg-icon-search" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2182">
                  <path d="M 490.352 162.153 c 182.98 0 331.847 148.866 331.847 331.848 c 0 182.98 -148.866 331.847 -331.847 331.847 c -182.982 0 -331.848 -148.866 -331.848 -331.847 c 0 -182.982 148.865 -331.848 331.848 -331.848 m 0 -90.504 C 257.095 71.649 68 260.744 68 494.001 c 0 233.255 189.095 422.35 422.352 422.35 c 233.256 0 422.35 -189.095 422.35 -422.35 c -0.001 -233.257 -189.095 -422.352 -422.35 -422.352 Z" p-id="2183"></path><path d="M 922.748 916.336 c -11.578 0 -23.155 -4.418 -31.995 -13.257 L 770.081 782.407 c -17.676 -17.661 -17.676 -46.327 0 -63.988 c 17.677 -17.677 46.314 -17.677 63.99 0 l 120.672 120.672 c 17.676 17.661 17.676 46.327 0 63.988 c -8.839 8.839 -20.416 13.257 -31.995 13.257 Z" p-id="2184"></path>
                </svg>
              </div>
            }
        </div>
      )
    }
  }
})