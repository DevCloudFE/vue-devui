import { defineComponent, ref } from 'vue';
import DTagInput from '../src/tags-input';

export default defineComponent({
  name: 'DemoDisabled',
  setup () {
    const tags = ref([
      { name: '红双喜' },
      { name: '银河' },
      { name: '729' }
    ]);
    const suggestionList = ref([
      { name: '斯蒂卡' },
      { name: '蝴蝶' },
      { name: '多尼克' }
    ]);

    return () => {
      return (
        <DTagInput
          v-models={[[tags.value, 'tags'], [suggestionList.value, 'suggestionList']]}
          disabled={true}
          disabledText="拉丝~"
        ></DTagInput>
      );
    };
  }
});
