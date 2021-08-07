import { defineComponent, ref } from 'vue';

import Button from '../../../button/button'
import Carousel from '../../carousel';
import Item from '../../item';

import './index.scss'

const items = ["page 1", 'page 2', 'page 3', 'page 4']
export default defineComponent({
  name: 'd-button-primary',
  setup() {
    const carousel = ref()

    const onPrev = () => {
      carousel.value?.prev?.()
    }
    const onNext = () => {
      carousel.value?.next?.()
    }
    const onGoFirst = () => {
      carousel.value?.goto?.(0)
    }
    const onChange = (index: number) => {
      console.log(index)
    }

    return {
      carousel,
      onPrev,
      onNext,
      onGoFirst,
      onChange,
    }
  },
  render() {
    return (
      <div>
        <Carousel ref="carousel" height="200px" arrowTrigger="never" activeIndexChange={ this.onChange }>
          {
            items.map(item => <Item key={ item }>{ item }</Item>)
          }
        </Carousel>
        <div class="carousel-demo-operate">
          <Button bsStyle="common" btnClick={ this.onPrev }>上一张</Button>
          <Button bsStyle="primary" btnClick={ this.onNext }>下一张</Button>
          <Button bsStyle="common" btnClick={ this.onGoFirst }>第一张</Button>
        </div>
      </div>
    )
  }
});