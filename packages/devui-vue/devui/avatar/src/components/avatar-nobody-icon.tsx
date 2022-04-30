import { defineComponent } from 'vue';
import { IconNobody } from './icon-nobody';

export default defineComponent({
  name: 'AvatarNobodyIcon',
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
    return <IconNobody width={width} height={height} />;
  },
});
