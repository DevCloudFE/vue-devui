# Echarts

devui主题风格的Echarts图表, 封装了devui主题和基础的相应事件

### 用法示例 -- 折线图

:::demo

```vue
<template>
  <d-chart :option="option" style="width: 100%;height: 400px"></d-chart>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const option = reactive({
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'line',
					snap: true
				}
			},
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					data: [150, 230, 224, 218, 135, 147, 260],
					type: 'line'
				}
			]
		});

    return {
      option,
    };
  },
});
</script>
```

:::

### 用法示例 -- 代码活跃度图

:::demo

```vue
<template>
	<div style="width: 100%;overflow: auto">
  	<d-chart :option="option" style="width: 820px;height: 200px"></d-chart>
	</div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const getVirtualData = (year) => {
			const date = +new Date(year + '-01-01').getTime();
			const end = +new Date(year + '-12-31').getTime();
			const dayTime = 3600 * 24 * 1000;
			const data = [];
			for (let time = date; time <= end; time += dayTime) {
				data.push([
					new Date(time).toISOString().split('T')[0],
					Math.floor(Math.random() * 20)
				]);
			}
			console.log(data)
			return data;
		}

		const option = ref({
			tooltip: {
				trigger: 'item',
				formatter: (param) => {
					console.log(param)
					return`<b>${param.value[0]}</b> <br/> ${param.value[1]}次提交`
				}
			},
			visualMap: {
				show: false,
				min: 0,
				max: 30,
				inRange: {
					color: ['#f5f5f5', '#beccfa', '#7693f5', '#526ecc', '#344899']
				}
			},
			calendar: {
				top: 'top',
				right: 20,
				left: 40,
				range: ['2022-01-01', '2022-12-31'],
				cellSize: 15,
				splitLine: {
					show: false
				},
				yearLabel: {
					show: false,
				},
				monthLabel: {
					nameMap: ['1月', '2月', '3月', '4月','5月','6月','7月','8月','9月','10月','11月','12月'],
					position: 'end'
				},
				dayLabel: {
					firstDay: 1,
					fontSize: 10,
					nameMap: ['日', '一', ' ', ' ', '四', ' ', ' ']
				},
				itemStyle: {
					borderWidth: 4,
					borderRadius: 4,
					borderColor: '#fff'
				}
			},
			series: [
				{
					type: 'heatmap',
					coordinateSystem: 'calendar',
					data: getVirtualData('2022'),
					itemStyle: {
						borderRadius: 4
					}
				}
			]
		})

    return {
      option,
    };
  },
});
</script>
```

:::

### DChart 参数

| 参数名     | 类型              | 默认值     | 说明                                       | 跳转 Demo                 |
| :------------- | :-------- | :--------- | :------------------------- | :------------------------ |
| option     | `echarts原生option`        | {}      | 传入echarts原生option                  |   |

### DChart 事件

| 事件名 | 回调参数                    | 说明                                                          | 跳转 Demo             |
| :----- | :-------------------------- | :------------------------------------------------------------ | :-------------------- |
| chartReady | `Function(echarts: any)` | 组件实例化完成后抛出，参数为echarts实例 |  |