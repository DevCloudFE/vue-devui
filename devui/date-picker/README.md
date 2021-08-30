# DatePicker设计思路与实现

# 1. 需求梳理

## 1.1 主要结构

直观上分析，组件主要包括两部分：

- 日期面板
    - 日期显示面板
    - 跳转到`今天`按钮
- 顶部操作栏

## 1.2 交互分析

交互上分析，大致包括：

- 日期面板操作
    - 单日选择
    - 区域选择
        - 开始日期(select start)
        - 区间日期(start + hover)
        - 结束日期(select end)
    - 跳转到`今天`
- 顶栏操作
    - 显示当前日期
    - 年/月翻页功能

## 1.3 事件响应

消息传递（事件接口）上分析，应该具备以下几种能力：

- 日期面板
    - `onSelected` 单板日期值被选中
    - `onSelectStart` 区域日期开始选择
    - `onSelecting` 区域中间值发生变化
    - `onSelectEnd` 区域日期值选择结束
    - `onToday` 跳转当天
    - `onChange` 日期值输出变化
    - `onReset` 需要重置状态
- 顶部操作
    - `onNextYear` 跳到下一年
    - `onNextMonth` 跳到下一月
    - `onPreviousYear` 跳上一年
    - `onPreviousMonth` 跳上一月

## 1.4 状态管理

- 日期面板
    - 当月/非当月日期的显示和响应
    - 限制区域外日期的显示和响应
- 顶部操作
    - 区域双板翻页的互作用
    - 区域限制的显示和响应

## 1.5 样式实现

- 使用`flex`布局


# 2. 实现思路

整体上，`容器组件 + 子组件`的设计思路，将视觉、交互按组件拆分，化整为零，简化问题。

## 2.1 子组件拆解

根据`1.1`的结构，将`DatePicker`拆解为4个子组件：

- `calendar`
    - `panel`
    - `today`
- `toolbar`

其中`panel`和`today`都是孙级子组件。考虑到代码的可维护性，所有组件在文件存储路径上平级。

## 2.2 子组件开发

每个子孙组件都是纯展示组件（单项数据流组件），无内部状态；`DatePicker`作为容器组件，统一管理状态。

每个子组件，按`1.3`创建事件接口，向容器组件发送控制信息。

### 2.2.1 单项数据流的函数式组件

函数式组件，是最佳的单向数据流模式，没有之一。来看一下`today`组件代码：

```tsx
type TProps = {
    onSelected?: (date: Date) => void
    disabled?: boolean
}

export default (props: TProps) => {
    const { onSelected = () => 0, disabled = false } = props
    return (
        <div class={`today-container ${disabled ? 'disabled' : ''}`}>
            <button
                class="today-button"
                disabled={disabled}
                onClick={disabled ? undefined : () => onSelected(new Date())}
            >今天</button>
        </div>
    )
}
```

该组件当中，没有任何的内置状态管理，所有属性都来自`props`，也就是父组件的传递值。

- `disabled`属性，考虑到在配置日期区域限制后，`today`有可能不在区域内，此时`today`按钮应当不可用，通过该属性控制；
- `onSelected`事件，用于容器组件订阅`button`的点击事件，来实现约定的`onToday`事件接口。

### 2.2.2 在VUE3中使用TSX函数式组件

由于`VSCode`对`t.ds`的良好支持——即便是受益于`React`，以及由此带来的开发侧良好体验，`DatePicker`的子孙组件（单向数据流组件）的开发全部使用`纯函数+TSX`。

实现详情和`webpack`支持，详见我的另外两篇文章：

[《DevUI中VUE的TSX函数式组件实践》](https://juejin.cn/post/6999260884631552037)

[《再聊Vue的TSX函数式组件》](https://juejin.cn/post/7000688749017317407)

## 2.3 组件样式

- 所有布局使用`flex`
- `scss` + 全局样式复用。


# 3 日历面板组件 `panel`

## 3.1 具体需求：

- 3.1.1 统一使用7x6的面板，共42天。（虽然有些月份35天面板即可完整显示，但会导致高度不一致）
- 3.1.2 面板补齐
    - 3.1.2.1 一周以周日作为起点（国际默认）
    - 3.1.2.2 当月1日非周日的话，向前补齐上月尾巴到周日。
    - 3.1.2.3 使用下月日期向后补齐42天。
- 3.1.3 非当月日期
    - 3.1.3.1 上月、下月用于补齐面板的日期格虚化显示
    - 3.1.3.2 单板选择后，面板跳转到对应月
    - 3.1.3.3 双板选择后
        - 3.1.3.3.1 双面板按日期大小排序，左板为较早时间
        - 3.1.3.3.2 双板分别跳转到对应月
        - 3.1.3.3.3 当选择区域没有跨月，显示于用户操作面板，另一面板保持。
- 3.1.4 非限制区域内日期
    - 3.1.4.1 虚化显示
    - 3.1.4.2 鼠标悬停时cursor更改为禁用
- 3.1.5 交互
    - 3.1.5.1 单板日期选择，触发`onSelected`，通知更新`dateStart`，然后触发`onChange`
    - 3.1.5.2 单板`today`点击，触发`onToday`，通知更新`dateStart`
    - 3.1.5.3 双板第一次点击，触发`onSelectStart`，通知更新区间日期开始时间`dateStart`
    - 3.1.5.4 双板第一次点击后，面板内触发`onSelecting`，通知更新鼠标位置所在日期`dateHover`
    - 3.1.5.5 双板第二次点击，触发`onSelectEnd`，通知更新区间日期结束时间`dateEnd`，然后触发`onChange`
    - 3.1.5.6 如果`dateStart`和`dateEnd`都已在`props`中定义，则触发`onReset`，通知父组件重置状态。
    - 3.1.5.7 限制区域外日期格禁止交互（不绑定交互事件方法）


## 3.2 工具准备

由于需要大量的日期类型操作和比较，为了方便开发，所以需要先准备一些工具。

### 3.2.1 获取月份42天面板（3.1.2）

```ts
const getMonthDays = (year: number, month: number) => {
    // 当月第一天
    const first = new Date(year, month - 1, 1)
    // 当月最后一天
    const last = new Date(year, month, 0)
    // 输出结构
	const dates: TDateCell[] = []

    // 第一天的星期几，0~6，0为周日
    let day = first.getDay()
    // 向左补齐星期日期
	while (day > 0) {
		day -= 1
		dates.push({ date: new Date(year, month - 1, -day), current: -1 })
	}
    // 填充当月日期
	day = last.getDate() - first.getDate()
	for (let i = 0; i <= day; i++) {
		const date = new Date(first)
		date.setDate(i + 1)
		dates.push({ date, current: 0 })
	}

    // 向右补齐星期
	day = last.getDay()
	let tail: Date = last
	for (let i = day; i < 6; i++) {
		tail = new Date(year, month, i - day + 1)
		dates.push({ date: tail, current: 1 })
    }
    // 按42天补齐日期
    // 这里不统一补齐方式，为35天动态面板预留。
	if(dates.length < 42) {
		day = tail.getDate()
		for (let i = 1; i <= 7; i++) {
			tail = new Date(year, month, day + i)
			dates.push({ date: tail, current: 1 })
		}
	}
	return dates
}
```

这里的一个技巧，是获取月末日期。

因为月份涉及`大小月`、`闰年`等变量因素，月末可能是`28/29/30/31`共4种情况，如果直接计算（尤其是闰年的计算）会比较麻烦。这里使用`取下个月第一天的前一天`的方式，来获取当月月末日期：

```ts
const last = new Date(2000, 2, 0) // 获取2000年2月最后一天
// -> Tue Feb 29 2000 00:00:00 GMT+0800 (中国标准时间)
```

这里`Date`的第3个参数为0，相当于：

```ts
let last = new Date(2000, 2, 1) // 获取2000年3月1日
last = last.setDate(-1) // last设置为3月1日前一天，即2月最后一天，具体日期Date会自己算。
```

同样的方法我们也可以获取到年度的最后一天：

```ts
const last = new Date(2000, 12, 0) // 获取2000年12月最后一天，也就是年度最后一天。
// -> Sun Dec 31 2000 00:00:00 GMT+0800 (中国标准时间)
```

计算一年天数的时候，有可能用到。

**注意月份取值是索引值**

### 3.2.2 日期比较和区间判断（3.1.5.7）

```ts
/** 一天毫秒数 */
const ONE_DAY = 1000 * 60 * 60 * 24

/** 按年、月、日三种颗粒度计算一个整数值 */
export const dateCounter = (date: Date, type: 'y' | 'm' | 'd') => {
	switch(type) {
		case 'y': return date.getFullYear()
		case 'm': return date.getFullYear() * 12 + date.getMonth()
	}
	return date.getTime() / ONE_DAY >> 0
}

/** 按年、月、日三种颗粒比较两个日期 */
export const compareDateSort = (d1: Date, d2: Date, type: 'y' | 'm' | 'd') => {
    const t1 = dateCounter(d1, type), t2 = dateCounter(d2, type)
    return t1 < t2 ? -1 : t1 > t2 ? 1 : 0
}

/**
 * d 是否在 [left, right] 区间
 * @param date 日期
 * @param left 最小日期
 * @param right 最大日期
 * @returns boolean
 */
export const betweenDate = (date: Date, left: any, right: any): boolean => {
	if(left instanceof Date && compareDateSort(left, date, 'd') > 0) {
		return false
	}
	if(right instanceof Date && compareDateSort(date, right, 'd') > 0) {
		return false
	}
	return true
}
```

### 3.2.3 日期转换（3.1.5.7）

```ts
/** 字符串转日期 */
export const parseDate = (str?: string) : Date | null => {
	if(!str || typeof str !== 'string') {
		return null
	}

	const [dateStr = '', timeStr = ''] = str.split(/([ ]|T)+/)
	if(!dateStr) {
		return null
	}
	const [y, m, d] = dateStr.split(/[^\d]+/)
	const year = _parseInt(y), month = _parseInt(m), date = _parseInt(d) || 1
	if(!year || !month) {
		return null
	}
	const time = parseTime(timeStr)
	return new Date(year, month - 1, date, ...time)
}
```