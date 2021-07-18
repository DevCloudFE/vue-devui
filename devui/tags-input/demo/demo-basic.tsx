import { defineComponent, reactive } from 'vue';
import DTagsInput from '../src/tags-input';

export default defineComponent({
  name: 'DemoBasic',
  setup () {
    const state = reactive({
      tagList: [
        { name: '马龙' },
        { name: '樊振东' },
        { name: '许昕' },
        { name: '陈梦' },
        { name: '孙颖莎' },
        { name: '刘诗雯' },
        { name: '王楚钦' },
        { name: '王曼昱' },
      ],
      suggestionList: [
        { name: '丁宁' },
        { name: '何卓佳' },
        { name: '方博' },
        { name: '陈幸同' },
        { name: '王艺迪' },
        { name: '朱雨玲' },
        { name: '林高远' },
        { name: '梁靖崑' },
      ]
    });

    return {
      state
    };
  },
  render () {
    const {
      state
    } = this;

    return (
      <div>
        <DTagsInput
          v-models={[[state.tagList, 'tags'], [state.suggestionList, 'suggestionList']]}
          displayProperty="name"
          placeholder="请输入名字"
          maxTags={10}
          maxTagsText="输入的标签数量已经达到最大限制10"
          noData="暂无数据">
        </DTagsInput>
      </div>
    );
  }
});
