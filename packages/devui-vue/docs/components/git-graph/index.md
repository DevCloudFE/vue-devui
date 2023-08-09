# GitGraph 提交网络图

绘制git历史。

### 基本用法

:::demo

```vue
<template>
  <d-git-graph :option=data>
  </d-git-graph>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = {
			params: {},
			data: {
				commits: [
					{
						author: {
							name: 'test1',
							avatar_url: 'https://avatars.githubusercontent.com/u/44854357?v=4'
						},
						date: '2023-07-07T03:27:07.000Z',
						id: 'merge_request_4',
						message: 'fix(button): 修复bug',
						parents: [['merge_request_3', 1]],
						refs: 'develop',
						space: 1,
						time: 0,
						customUrl: 'http://www.google.cn/',
						branch: 'master'
					},
					{
						author: {
							name: 'test2',
							avatar_url: 'https://avatars.githubusercontent.com/u/140487515?v=4'
						},
						date: '2023-07-07T03:27:07.000Z',
						id: 'merge_request_3',
						message: 'fix(button): 修复bug',
						parents: [['merge_request_2', 1], ['merge_request_1', 3]],
						space: 1,
						time: 1
					},
					{
						author: {
							name: 'test3',
							avatar_url: 'https://avatars.githubusercontent.com/u/44854357?v=4'
						},
						date: '2023-06-07T03:27:07.000Z',
						id: 'merge_request_2',
						message: 'fix(button): 修复bug',
						parents: [],
						space: 1,
						time: 2
					},
					{
						author: {
							name: 'test4',
							avatar_url: 'https://avatars.githubusercontent.com/u/140487515?v=4'
						},
						date: '2023-06-07T03:27:07.000Z',
						id: 'merge_request_1',
						message: 'fix(button): 修复bug',
						parents: [],
						refs: 'ceshi',
						space: 3,
						time: 3
					},
				]
			},
			commit_url: 'http://www.google.cn/',
		};
    return {
      data,
    };
  },
})
</script>

<style></style>
```

:::


### GitGraph 参数

| 参数 | 类型 | 默认 | 说明 | 跳转 Demo |
| ---- | ---- | ---- | ---- | --------- |
|options   |   `GitGraphData`   |  --   |  必选，网络图的信息对象    |[基本用法](#基本用法) |

### GitGraph 类型定义

#### GitGraphData

```ts
interface GitGraphData {
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
```

#### CommitInfo

```ts
interface CommitInfo {
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
```