import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DAnchor',
  props: {
  },
  setup() {
    return () => {
      return (
        <div v-d-anchor-box className="scrollTarget">
          <ul>
            <li v-d-anchor-link="anchorlink-one">anchorlink-one</li>
            <li v-d-anchor-link="anchorlink-two">anchorlink-two</li>
            <li v-d-anchor-link="anchorlink-three">anchorlink-three</li>
            <li v-d-anchor-link="anchorlink-four">anchorlink-four</li>
          </ul>
          <div>
            <div v-d-anchor="anchorlink-one">
                anchorlink-one
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
      );
    };
  }
});
