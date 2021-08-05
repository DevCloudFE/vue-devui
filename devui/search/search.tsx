import { defineComponent, PropType, computed } from 'vue'
import { SearchProps } from './search.type'
import './search.scss'
const KEYS_MAP = {
  enter: 'Enter'
} as const
const SIZE_CLASS = {
  lg: 'lg',
  sm: 'sm',
} as const

export default defineComponent({
  name: 'DSearch',
  props: {
    size: {
      type: String as PropType<SearchProps['size']>,
      default: 'normal',
      validator: (prop: string) => ['lg', 'sm'].includes(prop),
    },
    // searchFn: Function as unknown as PropType<SearchProps['searchFn']>,
  },
  setup(props) {
    // const { searchFn } = props;
    const rootClasses = computed(() => ({
      'd-search': true,
      [`d-search__${props.size}`]: SIZE_CLASS[props.size!],
    }))
    const onInputKeydown = ($event: KeyboardEvent) => {
      switch ($event.key) {
        case KEYS_MAP.enter:
          handleEnter();
          break;
        default:
          break;
      }
    };
    const handleEnter = () => {
      console.log('键盘keydown事件')
      // ctx.emit('键盘事件')
    }
    return () => {
      return (
        <div class={rootClasses.value}>
          <input
            onKeydown={onInputKeydown}
          ></input>
          <span>
            <svg t="1628175626090" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2182" width="16" height="16"><path d="M 490.352 162.153 c 182.98 0 331.847 148.866 331.847 331.848 c 0 182.98 -148.866 331.847 -331.847 331.847 c -182.982 0 -331.848 -148.866 -331.848 -331.847 c 0 -182.982 148.865 -331.848 331.848 -331.848 m 0 -90.504 C 257.095 71.649 68 260.744 68 494.001 c 0 233.255 189.095 422.35 422.352 422.35 c 233.256 0 422.35 -189.095 422.35 -422.35 c -0.001 -233.257 -189.095 -422.352 -422.35 -422.352 Z" p-id="2183"></path><path d="M 922.748 916.336 c -11.578 0 -23.155 -4.418 -31.995 -13.257 L 770.081 782.407 c -17.676 -17.661 -17.676 -46.327 0 -63.988 c 17.677 -17.677 46.314 -17.677 63.99 0 l 120.672 120.672 c 17.676 17.661 17.676 46.327 0 63.988 c -8.839 8.839 -20.416 13.257 -31.995 13.257 Z" p-id="2184"></path></svg>
          </span>
        </div>
      )
    }
  }
})