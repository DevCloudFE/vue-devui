import { defineComponent } from 'vue'
import './anchor.scss';
export default defineComponent({
  name: 'DAnchor',
  props: {
  },
  setup() {
    return () => {
      return (
        <div v-d-anchor-box class="scrollTarget1">
          <ul>
            <li v-d-anchor-link="anchorlink-one">anchorlink-one</li>
            <li v-d-anchor-link="anchorlink-two">anchorlink-two</li>
            <li v-d-anchor-link="anchorlink-three">anchorlink-three</li>
            <li v-d-anchor-link="anchorlink-four">anchorlink-four</li>
          </ul>
          <div>
            <div v-d-anchor="anchorlink-one">
              anchorlink-one1
            </div>
            <div v-d-anchor="anchorlink-two">
              anchorlink-two
            </div>
            <div v-d-anchor="anchorlink-three">
              anchorlink-three
            </div>
            <div v-d-anchor="anchorlink-four">
              anchorlink-four
            </div>
          </div>
        </div>
      )
    }
  }
})