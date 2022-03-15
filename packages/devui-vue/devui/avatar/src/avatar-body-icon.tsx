import { defineComponent } from 'vue';
import { IconBody } from './icon-body';
export default defineComponent({
  name: 'AvatarBodyIcon',
  props: {
    width: {
      type: Number,
      default: 16,
    },
    height: {
      type: Number,
      default: 16,
    },
  },
  render() {
    const { width, height } = this;
    return <IconBody width={width} height={height} />;
  },
});
