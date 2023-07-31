import { cloneDeep } from "lodash";
import { CommitInfo, GitGraphData } from "./git-graph-types";

export class GitGraph {
	element?: HTMLElement;
	options?: GitGraphData;
	mtime = 0;
	mspace = 0;
	parents: any = {};
	offsetX = 70;
	offsetY = 60;
	unitTime = 50;
	unitSpace = 15;
	prev_start = -1;
	preparedCommits: any = {};
	preStart = 1;
	isDark: boolean = false;
	daysBefore = '天前';
	hoursAgo = '小时前';
	minutesAgo = '分钟前';
	aMinutesAgo = '1分钟前';
	maxNameLength = 25;
	commits: CommitInfo[] = [];
	graphHeight = 0;
	graphWidth = 0;
	svg!: any;
	barHeight = 0;
	messageBoxWidth = 0;
	colors = [
		'#5C8DFF',
		'#BC94FF',
		'#54D2EB',
		'#A6DD82',
		'#FCDA6B',
		'#CA7ED6',
		'#7298F1',
		'#73CEA6',
		'#EDD249',
		'#CAABFF',
		'#85CAFF',
		'#93D99A',
		'#96ADFA',
		'#F4AF8F',
		'#A282E9',
		'#FFBB6B',
		'#69DBB9',
		'#76DBEF',
		'#B1CE4F',
		'#5DA4DC'
	]

	constructor() {
	}

	load(element: HTMLElement, options: GitGraphData, isDark: boolean) {
		this.element = element;
		this.options = options;
		this.isDark = !!isDark;
		this.daysBefore = options.params.daysBefore || this.daysBefore;
		this.hoursAgo = options.params.hoursAgo || this.hoursAgo;
		this.minutesAgo = options.params.minutesAgo || this.minutesAgo;
		this.aMinutesAgo = options.params.aMinutesAgo || this.aMinutesAgo;
		this.maxNameLength = options.params.maxNameLength || 25;

		const commits = cloneDeep(this.options.data.commits);
		this.prepareData(commits);
		return this.buildGraph('refName')；
	}

	prepareData(commits: CommitInfo[]) {
		this.commits = commits;
		this.collectParent()
		this.graphHeight = this.element!.getBoundingClientRect().height;
		this.graphWidth = this.element!.getBoundingClientRect().width;

		// 按提交数据计算画布高度，并留出下方150，右边300空白，保证悬浮框不超出画布
		const ch = Math.max(this.graphHeight, this.offsetY + this.unitTime * this.mtime + 150);
		const cw = Math.max(this.graphWidth, this.offsetX + this.unitSpace * this.mspace + 300);
		this.svg = document.createElementNS('http://www.w3.org/200/svg', 'svg');
		this.svg.setAttribute('height', ch + '');
		this.svg.setAttribute('width', '100%')
		this.element?.appendChild(this.svg);
		this.barHeight = Math.max(this.graphHeight, this.unitTime * this.commits.length + 320);
	}

	collectParent() {
		let c: CommitInfo;
		let p;
		let _i;
		let _len;
		const _ref = this.commits;
		const _results = [];
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			c = _ref[_i];
			this.mtime = Math.max(this.mtime, c.time);
			this.mspace = Math.max(this.mspace, c.space);
			_results.push(
				() => {
					let _j;
					let _len2;
					const _ref2 = c.parents;
					const _result2 = [];
					for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
						p = _ref2[_j];
						this.parents[p[0]] = true;
						_result2.push((this.mspace = Math.max(this.mspace, p[1])));
					}
					return _result2
				}
			)
		}

		return _results;
	}

	buildGraph(refName: string) {
		let curDay = new Date(0);
		let day;
		let mm;
		let _len;

		const _ref = this.commits;
		for (mm = 0, _len = _ref.length; mm < _len; mm++) {
			day = _ref[mm].date;
			if (
				curDay.getDate() !== new Date(day).getDate() ||
				curDay.getMonth() !== new Date(day).getMonth() ||
				curDay.getFullYear() !== new Date(day).getFullYear()
			) {
				const text = document.createElementNS('http://www.w3.org/200/svg', 'text');
				const date = new Date(day);
				const attrs = {
					x: this.offsetX + this.unitSpace * this.mspace + 56,
					y: this.offsetY + this.unitTime * mm - 22,
					'font-size': '12px',
					fill: '#999',
					'text-anchor': 'start'
				}
				this.setNodeAttr(text, attrs);
				const tspan = document.createElementNS('http://www.w3.org/200/svg', 'tspan');
				tspan.appendChild(document.createTextNode(date.getFullYear() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getDate()));
				text.appendChild(tspan);
				this.svg.appendChild(text);
				curDay = date;
			}
		}
		this.renderPartialGraph(refName);
	}

	setNodeAttr(node: Element, attrs: any) {
		Object.keys(attrs).forEach(key => {
			node.setAttribute(key, attrs[key]);
		})
	}

	renderPartialGraph(refName: string) {
		let commit ;
		let end;
		let i;
		let isGraphEdge;
		let start: number;
		let x;
		let y;
		start = Math.floor((this.element!.scrollTop - this.offsetY) / this.unitTime) - 10;
		if (start < 0) {
			isGraphEdge = true;
			start = 0;
		}
		end = this.element!.scrollHeight > this.element!.clientHeight ? start + 40 : Infinity;

		if (this.preStart <= end) {
			isGraphEdge = true;
			start = this.preStart - 1;
			this.preStart = end;
		}

		if (this.commits.length < end) {
			isGraphEdge = true;
			end = this.commits.length;
		}

		if (this.prev_start === -1 || Math.abs(this.prev_start - start) > 10 || isGraphEdge) {
			i = start;
			this.prev_start = start;
			while (i < end) {
				commit = this.commits[i];
				i += 1;
				if (commit['hasDrawn'] !== true) {
					x = this.offsetX + this.unitSpace * (this.mspace - commit.space);
					y = this.offsetY + this.unitTime * commit.time;
					this.drawDot(x, y, commit);
					this.drawLines(x, y, commit);
					this.appendLabel(x, y, commit);
					this.appendAnchor(x, y, commit, refName);
					commit['hasDrawn'] = true
				}
			}
		}
	}

	drawDot(x: number, y:number, commit: CommitInfo) {
		const options = this.options;
		const isdark = this.isDark;
		const circle = document.createElementNS('http://www.w3.org/200/svg', 'circle');
		const attrs = {
			cx: x,
			cy: y,
			r: 4,
			fill: '#fff',
			strokeWidth: 1,
			stroke: this.colors[commit.space],
			style: 'cursor: pointer;'
		};
		this.setNodeAttr(circle, attrs);
		this.svg.appendChild(circle);

		const avatar_box_x = this.offsetX + this.unitSpace * this.mspace + 16;
		const avatar_box_y = y - 13;

		const img = document.createElementNS('http://www.w3.org/200/svg', 'image');
		const imgAttrs = {
			width: 30,
			height: 30,
			preserveAspectRatio: 'none',
			href: commit.author.avatar_url,
			x: avatar_box_x,
			y: avatar_box_y,
			style: 'clip-path: circle(50%)'
		};
		this.setNodeAttr(img, imgAttrs);
		this.svg.appendChild(img);

		if (!this.messageBoxWidth) {
			this.messageBoxWidth = this.svg.getBoundingClientRect.width - (avatar_box_x + 40);
		}
		// 画竖线
	  let route = ['M', avatar_box_x + 15, avatar_box_y - 20, 'L', avatar_box_x + 15, avatar_box_y];
		const line1 = document.createElementNS('http://www.w3.org/200/svg', 'path');
		const lineAttrs1 = {
			d: route.join(' '),
			stroke: '#ccc',
			fill: 'none',
			'stroke-width': 2
		};
		this.setNodeAttr(line1, lineAttrs1);
		this.svg.appendChild(line1);
		route = ['M', avatar_box_x + 15, avatar_box_y + 30, 'L', avatar_box_x + 15, avatar_box_y + 50];
		const line2 = document.createElementNS('http://www.w3.org/200/svg', 'path');
		const lineAttrs2 = {
			d: route.join(' '),
			stroke: '#ccc',
			'stroke-width': 2
		}
		this.setNodeAttr(line2, lineAttrs2);
		this.svg.appendChild(line2);

		if (commit.author.name.length > this.maxNameLength) {
			commit.author.name = commit.author.name.substr(0, this.maxNameLength) + '...';
		}

		const commitText = document.createElementNS('http://www.w3.org/200/svg', 'foreignObject');
		const commitAttrs = {
			x: avatar_box_x + 40,
			y: y - 8,
			'text-anchor': 'start',
			style: 'cursor: pointer;text-anchor: start;',
			width: this.messageBoxWidth,
			height: 18
		};
		this.setNodeAttr(commitText, commitAttrs);

		const textAttr = {
			style: "width:100%;height:18px;overflow:hidden;white-space:noerap;text-overflow:ellipsis;",
			title: commit.message
		}
		const text = document.createElement('div');
		this.setNodeAttr(text, textAttr);

		text.innerText = commit.message.replace(/\n/g, ' ');
		commitText.appendChild(text);
		this.svg.appendChild(commitText);

		(commitText as any).onclick = function() {
			const url = commit.customUrl || options?.commit_url.replace('{commitId}', commit.id);
			return window.open(url, '_blank');
		};
	};

	drawerLines(x: number, y: number, commit: CommitInfo) {
		let arrow;
		let color;
		let i;
		let offset;
		let parent;
		let parentCommit;
		let parentX1;
		let parentX2;
		let parentY;
		let route;
		let _len;
		const _ref = commit.parents;
		for (let i = 0; i < _ref.length; i++) {
			parent = _ref[i];
			parentCommit = this.preparedCommits[parent[0]];
			if (!parentCommit) {
				break;
			}
			parentY = this.offsetY + this.unitTime * parentCommit.time;
			parentX1 = this.offsetX + this.unitSpace * (this.mspace - parentCommit.space);
			parentX2 = this.offsetX + this.unitSpace * (this.mspace - parent[1]);
			if (parentCommit.space <= commit.space) {
				color =  this.colors[commit.space];
			} else {
				color = this.colors[parentCommit.space];
			}
			if (parent[1] === commit.space) {
				offset = [0, 5];
				arrow
			}
		}
	}

}