import { defineComponent, ref } from 'vue'
import { backTopProps, BackTopProps } from './back-top-types'
import { usePosition } from './hooks'
import './back-top.scss'
import IconTop from './assets/top.svg'

export default defineComponent({
  name: 'DBackTop',
  props: backTopProps,
  emits: [],
  setup(props: BackTopProps, ctx) {
    const position = usePosition(props)
    const scrollToTop = () => {
      // 运行在浏览器则调用该方法
      window &&
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth' //平滑滚动
        })
    }

    return () => (
      <div class="devui-back-top" style={{ ...position }} onClick={scrollToTop}>
        <div class="devui-back-top-content">{<IconTop />}</div>
      </div>
    )
  }
})
