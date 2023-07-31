import { defineComponent, onMounted, onUnmounted, ref, SetupContext } from "vue";
import { GitGraphProps, gitGraphProps } from "./git-graph-types";


export default defineComponent({
	name: 'DGitGraph',
	props: gitGraphProps,
	emits: ['scrollToBottom'],
	setup(props: GitGraphProps, ctx: SetupContext) {
		const isDark = ref(false);
		onMounted(() => {
			
		})

		return () => (
			<div class="d-graph-wrapper"></div>
		);
	}
})