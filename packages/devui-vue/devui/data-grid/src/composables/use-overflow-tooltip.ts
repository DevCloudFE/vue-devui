import { ref } from 'vue';
import { debounce } from 'lodash';
import type { Placement } from '../../../overlay';
import type { InnerColumnConfig } from '../data-grid-types';

export function useOverflowTooltip() {
	let tdElement: HTMLElement;
	const originRef = ref<HTMLElement>();
	const showTooltip = ref(false);
	const tooltipContent = ref('');
	const tooltipPosition = ref<Placement[]>(['top', 'right', 'bottom', 'left']);
	const tooltipClassName = ref('');
	let mouseEnterDelay = 150;
	let mouseLeaveDelay = 100;
	let enterable = true;
	let isEnterOverlay = false;
	let tooltipConfigContent: string | undefined;

	function shouldShowTooltip() {
		const range = document.createRange();
		range.setStart(tdElement, 0);
		range.setEnd(tdElement, tdElement.childNodes.length);
		const rangeWidth = range.getBoundingClientRect().width;
		const padding =
			parseInt(window.getComputedStyle(tdElement)['paddingLeft'], 10) + parseInt(window.getComputedStyle(tdElement)['paddingRight'], 10);
		return Boolean(rangeWidth + padding > tdElement.offsetWidth);
	}

	const enter = debounce((tdElement: HTMLElement) => {
		if (!isEnterOverlay && shouldShowTooltip() && tdElement.classList.contains('mouse-enter')) {
			showTooltip.value = true;
			originRef.value = tdElement;
			tooltipContent.value = tooltipConfigContent ?? (tdElement?.innerText || tdElement?.textContent || '');
		}
	}, mouseEnterDelay);

	const leave = debounce(() => {
		if (!isEnterOverlay) {
			showTooltip.value = false;
			tooltipContent.value = '';
			originRef.value = undefined;
		}
	}, mouseLeaveDelay);

	const onCellMouseenter = (e: Event, tooltipConfig: InnerColumnConfig['showOverflowTooltip']) => {
		tdElement = e.currentTarget as HTMLElement;
		if (tooltipConfig && tdElement) {
			tdElement.classList.add('mouse-enter');
			if (typeof tooltipConfig !== 'boolean') {
				tooltipConfigContent = tooltipConfig.content;
				tooltipConfig.position && (tooltipPosition.value = tooltipConfig.position);
				tooltipConfig.class && (tooltipClassName.value = tooltipConfig.class);
				mouseEnterDelay = tooltipConfig.mouseEnterDelay ?? mouseEnterDelay;
				enterable = tooltipConfig.enterable ?? enterable;
			}
			enter(tdElement);
		}
	};

	const onCellMouseleave = (e: Event, tooltipConfig: InnerColumnConfig['showOverflowTooltip']) => {
		tdElement = e.currentTarget as HTMLElement;
		if (tooltipConfig && tdElement) {
			tdElement.classList.remove('mouse-enter');
			leave();
		}
	};

	const onOverlayMouseenter = () => {
		if (enterable) {
			isEnterOverlay = true;
		}
	};

	const onOverlayMouseleave = () => {
		isEnterOverlay = false;
		leave();
	};

	return {
		showTooltip,
		originRef,
		tooltipContent,
		tooltipPosition,
		tooltipClassName,
		onCellMouseenter,
		onCellMouseleave,
		onOverlayMouseenter,
		onOverlayMouseleave
	};
}