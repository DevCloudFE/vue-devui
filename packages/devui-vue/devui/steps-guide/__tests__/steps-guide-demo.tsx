import { ref, defineComponent, reactive } from 'vue'
import DStepsGuide from '../src/steps-guide'
export default defineComponent({
  name: 'StepsGuideDemo',
  components: {
    'd-steps-guide': DStepsGuide,
  },
  setup() {
    const steps = reactive([
      { title: '基础用法1', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', position: { top:0, left:0, type:'top' } },
      { title: '基础用法2', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', position: { top:0, left:0, type:'bottom' } },
      { title: '基础用法3', content: '业务推出新特性，或复杂的业务逻辑需要指引用户时使用。', position: { top:0, left:0, type:'top-left' } }
    ])
    const stepRef = ref(null), stepIndex = ref(1)
    const handleClick = (index) => {
      stepRef.value.setCurrentIndex(index)
    }
    const handleClose = () => {
      stepRef.value.closeGuide()
    }
    return {
      steps,
      stepRef,
      stepIndex,
      handleClick,
      handleClose
    }
  },
  render(props){
    return (<d-steps-guide ref="stepRef" steps={ props.steps } v-model:step-index={ props.stepIndex }></d-steps-guide>)
  }
})