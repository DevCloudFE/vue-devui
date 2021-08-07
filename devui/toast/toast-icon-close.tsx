import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'DToastIconClose',
  props: {
    prefixCls: String,
    onClick: Function as PropType<(e: MouseEvent) => void>
  },
  emits: ['click'],
  render() {
    const { prefixCls, $emit } = this

    const wrapperCls = `${prefixCls}-icon-close`

    return (
      <div class={wrapperCls} onClick={(e) => $emit('click', e)}>
        <svg
          width='16px'
          height='16px'
          viewBox='0 0 14 14'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          xmlns-xlink='http://www.w3.org/1999/xlink'
        >
          <defs>
            <polygon
              id='path-1'
              points='8.07106781 6.65685425 10.8994949 3.82842712 12.3137085 5.24264069 9.48528137 8.07106781 12.3137085 10.8994949 10.8994949 12.3137085 8.07106781 9.48528137 5.24264069 12.3137085 3.82842712 10.8994949 6.65685425 8.07106781 3.82842712 5.24264069 5.24264069 3.82842712'
            ></polygon>
          </defs>
          <g id='error' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
            <mask id='mask-2' fill='white'>
              <use xlinkHref='#path-1'></use>
            </mask>
            <use id='Mask' class='devui-toast-close-icon' xlinkHref='#path-1'></use>
          </g>
        </svg>
      </div>
    )
  }
})
