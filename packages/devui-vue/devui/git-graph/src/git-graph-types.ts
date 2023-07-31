import { ExtractPropTypes, PropType } from "vue";

export interface CommitInfo {
	// 提交者信息
	author: {
		name: string;
		email: string;
		/**
		 * 提交者头像地址
		 */
		avatar_url?: string;
	}
	/**
	 * 提交时间
	 */
	date: string;
	id: string;
	/**
	 * commit信息
	 */
	message: string;
	/**
	 * 父级节点信息，包含父级的id和space
	 * @example [['deffajsdfasdasd056215421', 1], ['asdasdasddkfhjksdfhkjegfajszbg', 3]]
	 */
	parents: any[][];
	/**
	 * 分支名称或标签名称
	 */
	refs?: string;
	/**
	 * 横向空间位置，从主分支为1开始，没向外一层+2，第i层为2i - 1
	 * 用于计算绘图尺寸和横向最大宽度
	 */
	space: number;

	/**
	 * 等于commits数组index，用于计算纵向尺寸
	 */
	time: number;

	/**
	 * 可选，自定义点击commit信息的跳转url
	 */
	customUrl?: string;

	/**
	 * 分支名称，展示在hover面板中
	 */
	branch?: string;

	hasDrawn?: boolean;
}

export interface GitGraphData {
	/**
	 * 绘图数据
	 */
	data: {
		/**
		 * 提交日期数据
		 * @example [['7日', '7月'], ['6日', '7月']]
		 */
		days: string[][];
		commits: CommitInfo[];
	};
	/**
	 * 跳转更改页面的url模板，会自动替换其中的‘{commitId}’
	 * @example https://xxxx/{commitId}
	 */
	commit_url: string;
	params: {
		/**
		 * 时间提示，默认为'xx天前'，'xx小时前'，'xx分钟前'，'1分钟前'
		 */
		daysBefore?: string;
		hoursAgo?: string;
		minutesAgo?: string;
		aMinutesAgo?: string;
		/**
		 * 用户名称最大长度
		 */
		maxNameLength?: number;
	}
}

export const gitGraphProps = {
  option: {
    type: Object as PropType<GitGraphData>,
  }
};

export type GitGraphProps = ExtractPropTypes<typeof gitGraphProps>;