import { defineComponent } from 'vue';
import { navSpriteProps } from './nav-sprite-types';

export default defineComponent({
  name: 'DNavSprite',
  props: navSpriteProps,
  emits: ['afterNavInit'],
  setup() {
    return {};
  }
});
