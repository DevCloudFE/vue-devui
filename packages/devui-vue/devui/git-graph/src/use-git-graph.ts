import { Ref, SetupContext } from "vue";
import { GitGraphData, GitGraphProps } from "./git-graph-types";

export default function useGitGraph(
	props: GitGraphProps,
	ctx: SetupContext,
	isDark: Ref<boolean>
) {
	let themeService: any;

	const themeChange = () => {
		isDark.value = !!themeService?.currentTheme?.isDark;
	};

	const initTheme = () => {
		themeService = (window as any)['devuiThemeService']
		isDark.value = !!themeService?.currentTheme?.isDark;

		if(themeService) {
			themeService.eventBus.add('themeChanged', themeChange);
		}
	}

	const initGraph = (element: HTMLElement, options: GitGraphData, isDark: boolean) => {
		
	}

	return {
		initTheme
	}

}