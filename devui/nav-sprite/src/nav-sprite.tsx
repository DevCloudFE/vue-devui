import { defineComponent } from '@vue/runtime-core';
import { navSpriteProps } from './nav-sprite-types';

export default defineComponent({
  name: 'DNavSprite',
  props: navSpriteProps,
  emits: ['afterNavInit'],
  setup(props) {
    return {};
  }
});
