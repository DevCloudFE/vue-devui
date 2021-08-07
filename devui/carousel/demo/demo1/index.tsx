import { defineComponent, ref, watch } from 'vue';
import Carousel from '../../carousel';
import Item from '../../item';

import './index.scss'

const items = ["item 1", 'item 2', 'item 3', 'item 4']
export default defineComponent({
  name: 'd-button-primary',
  setup() {
    const activeIndex = ref(0)

    return {
      activeIndex
    }
  },
  render() {
    return (
      <div>
        <Carousel height="200px" v-model={ [this.activeIndex, 'activeIndex'] } autoplay>
          {
            items.map(item => <Item key={ item }>{ item }</Item>)
          }
        </Carousel>
      </div>
    )
  }
});