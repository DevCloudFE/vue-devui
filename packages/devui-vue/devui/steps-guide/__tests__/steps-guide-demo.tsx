import { ref, defineComponent, reactive } from 'vue';
import DStepsGuide from '../src/steps-guide';
export default defineComponent({
  name: 'StepsGuideDemo',
  components: {
    'd-steps-guide': DStepsGuide,
  },
  setup() {
    const steps = reactive([{ title: '弹出位置 top-left',
      content: 'Steps Guide',
      trigger: '.top-left',
      position: 'top-left'
    },{ title: '弹出位置 top',
      content: 'Steps Guide',
      trigger: '.top',
      position: 'top'
    },{ title: '弹出位置 top-right',
      content: 'Steps Guide',
      trigger: '.top-right',
      position: 'top-right'
    },
    { title: '弹出位置 right',
      content: 'Steps Guide',
      trigger: '.right',
      position: 'right'
    },{ title: '弹出位置 bottom-right',
      content: 'Steps Guide',
      trigger: '.bottom-right',
      position: 'bottom-right'
    },{ title: '弹出位置 bottom',
      content: 'Steps Guide',
      trigger: '.bottom',
      position: 'bottom'
    },{ title: '弹出位置 bottom-left',
      content: 'Steps Guide',
      trigger: '.bottom-left',
      position: 'bottom-left'
    },{ title: '弹出位置 left',
      content: 'Steps Guide',
      trigger: '.left',
      position: 'left'
    }]);
    const stepRef = ref(null), stepIndex = ref(0);
    const handleClick = (index) => {
      stepRef.value.setCurrentIndex(index);
    };
    const handleClose = () => {
      stepRef.value.closeGuide();
    };
    return {
      steps,
      stepRef,
      stepIndex,
      handleClick,
      handleClose
    };
  },
  render(props){
    return (<>
      <button class="top-left" onClick={ () => props.handleClick(0) }>Top-left</button>
      <button class="top" onClick={ () => props.handleClick(1) }>Top</button>
      <button class="top-right" onClick={ () => props.handleClick(2) }>Top-right</button>
      <button class="right" onClick={ () => props.handleClick(3) }>Right</button>
      <button class="bottom-right" onClick={ () => props.handleClick(4) }>Bottom-right</button>
      <button class="bottom" onClick={ () => props.handleClick(5) }>Bottom</button>
      <button class="bottom-left" onClick={ () => props.handleClick(6) }>Bottom-left</button>
      <button class="left" onClick={ () => props.handleClick(7) }>Left</button>
      <button class="close" onClick={ props.handleClose }>Close</button>
      <d-steps-guide ref="stepRef" steps={ props.steps } v-model:step-index={ props.stepIndex }></d-steps-guide></>);
  }
});
