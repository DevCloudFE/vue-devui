import { ref, onMounted, inject } from 'vue';
import type { Ref } from 'vue';
import { debounce, } from 'lodash';
import { DataGridInjectionKey } from '../data-grid-types';
import type { InnerColumnConfig, InnerRowData, DataGridContext, ScrollYParams, ScrollXParams } from '../data-grid-types';
import { getXStartOrEndIndex, getYStartIndex } from '../utils';

// 虚拟滚动
export function useDataGridScroll() {
	const virtualRowData = ref<InnerRowData[]>([]);
	const virtualColumnData = ref<InnerColumnConfig[]>([]);
	const translateX = ref<number>(0);
	const translateY = ref(0);

	const calcVirtualColumnData = (scrollXParams: ScrollXParams, scrolling = true) => {
		if (scrolling && scrollXParams.distance > scrollXParams.scrollScaleX[0] && scrollXParams.distance < scrollXParams.scrollScaleX[1]) {
			return;
		}
		const startIndex = getXStartOrEndIndex(scrollXParams.originColumnData, scrollXParams.distance);
		const endIndex = getXStartOrEndIndex(scrollXParams.originColumnData, scrollXParams.distance + scrollXParams.scrollViewWidth);
		let upperStartIndex = Math.ceil(startIndex - scrollXParams.bufferSize);
		upperStartIndex = upperStartIndex < 0 ? 0 : upperStartIndex;
		translateX.value = scrollXParams.originColumnData[upperStartIndex].offsetLeft;
		const upperList = scrollXParams.originColumnData.slice(upperStartIndex, startIndex);
		const midList = scrollXParams.originColumnData.slice(startIndex, endIndex);
		let downStartIndex = endIndex;
		downStartIndex = downStartIndex > scrollXParams.totalColumn - 1 ? scrollXParams.totalColumn : downStartIndex;
		scrollXParams.scrollScaleX = [
			scrollXParams.originColumnData[Math.floor(upperStartIndex + scrollXParams.bufferSize / 2)]?.offsetLeft || 0,
			scrollXParams.originColumnData[Math.ceil(startIndex + scrollXParams.bufferSize / 2)]?.offsetLeft || 0
		];
		const downList = scrollXParams.originColumnData.slice(downStartIndex, downStartIndex + scrollXParams.bufferSize);
		virtualColumnData.value = [...upperList, ...midList, ...downList];
		let trTotalWidth = 0;
		virtualColumnData.value.forEach((item) => {
			trTotalWidth += item.width as number;
		})
	};

	const calcVirtualRowData = (scrollYParams: ScrollYParams) => {
		if (scrollYParams.distance > scrollYParams.scrollScaleY[0] && scrollYParams.distance < scrollYParams.scrollScaleY[1]) {
			return;
		}
		const startIndex = getYStartIndex(scrollYParams.originRowData, scrollYParams.distance);
		let upperStartIndex = Math.ceil(startIndex - scrollYParams.renderCountPerScreen);
		upperStartIndex = upperStartIndex < 0 ? 0 : upperStartIndex;
		translateY.value = scrollYParams.originRowData[upperStartIndex].offsetTop!;
		const upperList = scrollYParams.originRowData.slice(upperStartIndex, startIndex);
		const midList = scrollYParams.originRowData.slice(startIndex, startIndex + scrollYParams.renderCountPerScreen);
		let downStartIndex = Math.floor(startIndex + scrollYParams.renderCountPerScreen);
		downStartIndex = downStartIndex > scrollYParams.originRowData.length - 1 ? scrollYParams.originRowData.length : downStartIndex;
		scrollYParams.scrollScaleY = [
			scrollYParams.originRowData[Math.floor(upperStartIndex + scrollYParams.renderCountPerScreen / 2)]?.offsetTop! ?? 0,
			scrollYParams.originRowData[Math.ceil(startIndex + scrollYParams.renderCountPerScreen / 2)]?.offsetTop! ?? 0
		];
		const downList = scrollYParams.originRowData.slice(downStartIndex, downStartIndex + scrollYParams.renderCountPerScreen);
		virtualRowData.value = [...upperList, ...midList, ...downList];
	}

	const resetVirtualRowData = () => {
		virtualRowData.value = []
	}

	return {
		translateX,
		translateY,
		virtualColumnData,
		virtualRowData,
		calcVirtualRowData,
		calcVirtualColumnData,
		resetVirtualRowData
	}
}