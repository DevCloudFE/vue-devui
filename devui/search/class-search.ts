import { computed, ComputedRef } from 'vue';
import { SearchProps } from './use-search'
const SIZE_CLASS = {
  lg: 'lg',
  sm: 'sm',
} as const
const ICON_POSITION = {
  right: 'right',
  left: 'left',
}
export const getRootClass = (props: SearchProps): ComputedRef => {
  return computed(() => ({
    'd-search': true,
    [`d-search__${props.size}`]: SIZE_CLASS[props.size],
    [`d-search__${props.iconPosition}`]: ICON_POSITION[props.iconPosition],
  }))
}
