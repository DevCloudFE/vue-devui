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
	];
	toolTipList: any;

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
		return this.buildGraph('refName');
	}

	prepareData(commits: CommitInfo[]) {
		let c;
		this.commits = commits;
		this.collectParent()
		this.graphHeight = (this.element as HTMLElement).getBoundingClientRect().height;
		this.graphWidth = (this.element as HTMLElement).getBoundingClientRect().width;

		// 按提交数据计算画布高度，并留出下方150，右边300空白，保证悬浮框不超出画布
		const ch = Math.max(this.graphHeight, this.offsetY + this.unitTime * this.mtime + 150);
		const cw = Math.max(this.graphWidth, this.offsetX + this.unitSpace * this.mspace + 300);
		this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		this.svg.setAttribute('height', ch + '');
		this.svg.setAttribute('width', '100%')
		this.element?.appendChild(this.svg);
		this.barHeight = Math.max(this.graphHeight, this.unitTime * this.commits.length + 320);

		const _ref = this.commits;
		for (let _i = 0; _i < _ref.length; _i ++) {
			c = _ref[_i];
			this.preparedCommits[c.id] = c;
		}
	}

	collectParent() {
		let c: CommitInfo;
		let p;
		let _i;
		let _len;
		let _this = this;
		const _ref = this.commits;
		const _results = [];
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			c = _ref[_i];
			this.mtime = Math.max(this.mtime, c.time);
			this.mspace = Math.max(this.mspace, c.space);
			_results.push(
				function () {
					let _j;
					let _len2;
					const _ref2 = c.parents;
					const _result2 = [];
					for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
						p = _ref2[_j];
						_this.parents[p[0]] = true;
						_result2.push((_this.mspace = Math.max(_this.mspace, p[1])));
					}
					return _result2
				}.call(_this)
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
				const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
				const date = new Date(day);
				const attrs = {
					x: this.offsetX + this.unitSpace * this.mspace + 56,
					y: this.offsetY + this.unitTime * mm - 22,
					'font-size': '12px',
					fill: '#999',
					'text-anchor': 'start'
				}
				this.setNodeAttr(text, attrs);
				const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
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

	__transform(time: any) {
		let timeTip = '';
		const now = new Date().getTime();
		const commitTime = new Date(time).getTime();
		const day = (now - commitTime) / (60 * 60 * 24 * 1000);
		const hour = (now - commitTime) / (60 * 60 * 1000);
		const minutes = (now - commitTime) / (60 * 1000);
		if (day >= 1) {
			timeTip = Math.floor(day) + this.daysBefore;
		} else {
			if (hour >= 1) {
				timeTip = Math.floor(hour) + this.hoursAgo;
			} else {
				if (minutes >= 1) {
					timeTip = Math.floor(minutes) + this.minutesAgo;
				} else {
					timeTip = this.aMinutesAgo;
				}
			}
		}
		return timeTip;
	}

	renderPartialGraph(refName: string) {
		let commit ;
		let end;
		let i;
		let isGraphEdge;
		let start: number;
		let x;
		let y;
		start = Math.floor(((this.element as HTMLElement).scrollTop - this.offsetY) / this.unitTime) - 10;
		if (start < 0) {
			isGraphEdge = true;
			start = 0;
		}
		end = (this.element as HTMLElement).scrollHeight > (this.element as HTMLElement).clientHeight ? start + 40 : Infinity;

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
					commit['hasDrawn'] = true;
				}
			}
		}
	}

	drawDot(x: number, y:number, commit: CommitInfo) {
		const options = this.options;
		const isdark = this.isDark;
		const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
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

		const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
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
		const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		const lineAttrs1 = {
			d: route.join(' '),
			stroke: '#ccc',
			fill: 'none',
			'stroke-width': 2
		};
		this.setNodeAttr(line1, lineAttrs1);
		this.svg.appendChild(line1);
		route = ['M', avatar_box_x + 15, avatar_box_y + 30, 'L', avatar_box_x + 15, avatar_box_y + 50];
		const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		const lineAttrs2 = {
			d: route.join(' '),
			stroke: '#ccc',
			'stroke-width': 2
		};
		this.setNodeAttr(line2, lineAttrs2);
		this.svg.appendChild(line2);

		if (commit.author.name.length > this.maxNameLength) {
			commit.author.name = commit.author.name.substr(0, this.maxNameLength) + '...';
		}

		const commitText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		const commitAttrs = {
			x: avatar_box_x + 40,
			y: y + 4,
			'text-anchor': 'start',
			style: 'cursor: pointer;text-anchor: start;',
			fill: isdark ? '#e8e8e8' : '#2e2e2e',
			'font-size': 14,
		};
		this.setNodeAttr(commitText, commitAttrs);

		const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
		tspan.appendChild(document.createTextNode(commit.message.replace(/\n/g, ' ')));
		commitText.appendChild(tspan);

		const titleText = document.createElementNS('http://www.w3.org/2000/svg', 'title');
		titleText.appendChild(document.createTextNode(commit.message));
		commitText.appendChild(titleText);
		this.svg.appendChild(commitText);

		(commitText as any).onclick = function() {
			const url = commit.customUrl || options?.commit_url.replace('{commitId}', commit.id);
			return window.open(url, '_blank');
		};
	};

	drawLines(x: number, y: number, commit: CommitInfo) {
		let arrow;
		let color;
		let offset;
		let parent;
		let parentCommit;
		let parentX1;
		let parentX2;
		let parentY;
		let route;
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
				arrow = 'l-2,5,4,0,-2,-5,0,5'.split(',');
			} else if (parent[1] < commit.space) {
				offset = [3, 3];
				arrow = 'l5,0,-2,4,-3,-4,4,2'.split(',');
			} else {
				offset = [-3, 3];
				arrow = 'l-5,0,2,4,3,-4,-4,2'.split(',');
			}
			route = ['M', x + offset[0], y + offset[1]];
			if (i > 0) {
				route.push(...arrow);
			}
			if (commit.space !== parentCommit.space || commit.space !== parent[1]) {
				route.push('L', parentX2, y + 10, 'L', parentX2, parentY - 5);
			}
			route.push('L', parentX1, parentY);
			const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			const lineAttrs = {
				d: route.join(' '),
				stroke: color,
				'stroke-width': 1,
				fill: 'none',
			};
			this.setNodeAttr(line, lineAttrs);
			this.svg.appendChild(line);
		}
	};

	appendLabel(x: number, y:number, commit: CommitInfo) {
		let shortrefs;
		if (!commit.refs) {
			return;
		}
		shortrefs = commit.refs;
		if (shortrefs.length > 7) {
			if (escape(shortrefs).indexOf('%u') < 0) {
				// 标签不含中文
				shortrefs = shortrefs.substr(0, 5) + '...';
			} else {
				// 标签中含中文
				shortrefs = shortrefs.substr(0, 3) + '...';
			}
		}
		const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		const textAttrs = {
			x: x + 4,
			y: y + 4,
			'text-anchor': 'start',
			fill: 'none',
			style: 'font-size: 10px;'
		};

		this.setNodeAttr(text, textAttrs);
		const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
		const rect = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		tspan.appendChild(document.createTextNode(shortrefs));
		text.appendChild(tspan);

		const titleText = document.createElementNS('http://www.w3.org/2000/svg', 'title');
		titleText.appendChild(document.createTextNode(commit.refs));
		text.appendChild(titleText);
		this.svg.appendChild(rect);
		this.svg.appendChild(text);

		setTimeout(() => {
			const textbox = text.getBBox();
			const path = [
				'M',
				x,
				y - 7,
				'L',
				x,
				y - 7 + textbox.height + 4,
				'L',
				x + textbox.width + 8,
				y - 7 + textbox.height + 4,
				'L',
				x + textbox.width + 8,
				y + 4,
				'L',
				x + textbox.width + 18,
				y,
				'L',
				x + textbox.width + 8,
				y - 4,
				'L',
				x + textbox.width + 8,
				y - 7,
				'Z',
			];

			const rectAttrs = {
				fill: this.isDark ? '#4C4C4C' : '#fff',
				stroke: this.colors[commit.space],
				'stroke-width': '1px',
				d: path.join(' '),
				transform: `matrix(1,0,0,1,-${textbox.width + 26},0)`,
			};

			const newAttrs = {
				transform: `matrix(1,0,0,1,-${textbox.width + 26},0)`,
				fill: this.colors[commit.space],
			};

			this.setNodeAttr(text, newAttrs);
			this.setNodeAttr(rect, rectAttrs);
		});
	};

	appendAnchor(x: number, y:number, commit: CommitInfo, refName: any) {
		const options = this.options;
		const isDark = this.isDark;
		const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		const attrs = {
			cx: x,
			cy: y,
			r: 10,
			fill: '#000',
			opacity: 0,
			style: 'cursor:pointer;',
		};
		this.setNodeAttr(circle, attrs);
		circle.onclick = function () {
			localStorage.setItem('refName', refName);
			const url = commit.customUrl || options?.commit_url.replace('{commitId}', commit.id);
			return window.open(url, '_blank');
		};
		circle.onmouseover = () => {
			this.commitTooltip(x + 20, y + 20, commit, isDark);
		};
		circle.onmouseleave = () => {
			this.toolTipList.forEach((element: any) => {
				this.svg.removeChild(element);
			});
		};
		this.svg.appendChild(circle);
	};

	getText(x: number, y: number, text: any, attrs: any = {}) {
		const resText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		this.setNodeAttr(resText, {
			x,
			y,
			...attrs
		});
		const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
		tspan.appendChild(document.createTextNode(text));
		resText.appendChild(tspan);

		return resText;
	}

	commitTooltip(x: number, y:number, commit: CommitInfo, isDark: boolean) {
		let boxHeight;
		let boxWidth;
		let messageText;
		boxWidth = 300;
		boxHeight = 200;

		const nameText = this.getText(x, y + 10, commit.author.name, {
			font: '14px Arial',
			'font-weight': 'bold',
			'text-anchor': 'start',
		});

		const idText = this.getText(x, y + 55, commit.id, {
			fill: isDark ? '#73788a' : '#71757f',
			'text-anchor': 'start',
		});

		const timeText = this.getText(x, y + 35, this.__transform(commit.date), {
			font: '12px Arial',
			fill: isDark ? '#73788a' : '#71757f',
			'text-anchor': 'start',
		});

		const branchText = commit.branch ? this.getText(x + 70, y + 35, commit.branch, {
			font: '12px Arial',
			fill: isDark ? '#73788a' : '#71757f',
		}) : null;

		const strList = commit.message.split('\n');
		if (strList.length > 10) {
			messageText = this.getText(x, y + 70, strList.slice(0, 10).join('\n') + '...', {
				fill: isDark ? '#E8E8E8' : '#2e2e2e',
				'text-anchor': 'start',
				font: '12px Monaco, monospace',
			});
		} else if (commit.message.length > 1500) {
			messageText = this.getText(x, y + 70, commit.message.slice(0, 1500) + '...', {
				fill: isDark ? '#E8E8E8' : '#2e2e2e',
				'text-anchor': 'start',
				font: '12px Monaco, monospace',
			});
		} else {
			messageText = this.getText(x, y + 70, commit.message, {
				fill: isDark ? '#E8E8E8' : '#2e2e2e',
				'text-anchor': 'start',
				font: '12px Monaco, monospace',
			});
		}
		const textArr = commit.branch ? [nameText, idText, messageText, timeText, branchText] : [nameText, idText, messageText, timeText];

		this.textWrap(messageText, boxWidth - 50, x);

		const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.setNodeAttr(rect, {
			x: x - 10,
			y: y - 10,
			width: boxWidth,
			height: 100,
			fill: isDark ? '#4c4c4c' : '#fff',
			stroke: isDark ? '#4c4c4c' : '#fff',
			'stroke-linecap': 'round',
			'stroke-width': '1px', 
		});
		textArr.unshift(rect);

		const rectShadow = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.setNodeAttr(rectShadow, {
			x: x - 11,
			y: y - 10,
			width: boxWidth + 2,
			height: 100,
			fill: isDark ? '#4c4c4c' : '#eee',
			stroke: isDark ? '#4c4c4c' : '#eee',
			'stroke-linecap': 'round',
			'stroke-width': '1px', 
		});
		textArr.unshift(rectShadow);

		textArr.forEach(t => {
			this.svg.appendChild(t);
		});
		boxWidth = messageText.getBBox().width + 20 > boxWidth ? messageText.getBBox().width + 20 : boxWidth;
		boxHeight = 80 + messageText.getBBox().height;
		this.toolTipList = textArr;
		this.setNodeAttr(rect, {
			height: boxHeight + 10,
			width: boxWidth,
		});

		this.setNodeAttr(rectShadow, {
			height: boxHeight + 13,
			width: boxWidth + 2,
		});
	}

	textWrap (t: any, width: any, x: any) {
		const content = t.children[0].innerHTML;
		let words = content.split('\n').filter((item: any) => item !== '');
		words = words.map((str: any) => {
			str = str.trim();
			let len = str.length;
			const strList = [];
			while (len > 70) {
				strList.push(str.slice(0, 70));
				str = str.slice(70);
				len = str.length;
			}
			strList.push(str);

			return strList.join('\n');
		});
		t.removeChild(t.children[0]);
		words.forEach((str: any) => {
			const list = str.split('\n');
			list.forEach((item: any) => {
				const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
				tspan.appendChild(document.createTextNode(item));
				this.setNodeAttr(tspan, {
					dy: 14.4,
					x: x,
				});
				t.appendChild(tspan);
			});

			const space = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
			space.appendChild(document.createTextNode(' '));
				this.setNodeAttr(space, {
					dy: 14.4,
					x: x,
				});
				t.appendChild(space);
		})
	}
}